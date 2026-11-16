/* 站点内搜索：读取 /index.json，标题与正文匹配，结果带上下文片段并高亮关键词 */
(function () {
    'use strict';

    var root = document.querySelector('.search');
    var input = document.getElementById('search-input');
    var box = document.getElementById('search-results');
    if (!root || !input || !box) return;

    var indexUrl = root.getAttribute('data-index') || '/index.json';
    var pages = null;
    var loading = false;
    var pendingQuery = '';

    function esc(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    /* 在文本中高亮第一个命中词 */
    function highlight(text, q) {
        var lower = text.toLowerCase();
        var i = lower.indexOf(q.toLowerCase());
        if (i === -1) return esc(text);
        return esc(text.slice(0, i)) +
            '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' +
            esc(text.slice(i + q.length));
    }

    /* 截取关键词附近的上下文，前后各留一段，命中词高亮 */
    function snippet(content, q) {
        if (!content) return '';
        var lower = content.toLowerCase();
        var i = lower.indexOf(q.toLowerCase());
        if (i === -1) {
            return esc(content.slice(0, 110)) + (content.length > 110 ? '…' : '');
        }
        var start = Math.max(0, i - 50);
        var end = Math.min(content.length, i + q.length + 90);
        return (start > 0 ? '…' : '') +
            esc(content.slice(start, i)) +
            '<mark>' + esc(content.slice(i, i + q.length)) + '</mark>' +
            esc(content.slice(i + q.length, end)) +
            (end < content.length ? '…' : '');
    }

    function load() {
        if (pages || loading) return;
        loading = true;
        fetch(indexUrl)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                pages = data || [];
                loading = false;
                if (pendingQuery) {
                    var q = pendingQuery;
                    pendingQuery = '';
                    render(q);
                }
            })
            .catch(function () { loading = false; });
    }

    function close() {
        box.classList.remove('is-open');
        box.innerHTML = '';
    }

    function render(q) {
        if (!pages) return;
        var ql = q.toLowerCase();
        var hits = [];

        for (var i = 0; i < pages.length; i++) {
            var p = pages[i];
            var t = (p.title || '').toLowerCase();
            var c = (p.content || '').toLowerCase();
            var inTitle = t.indexOf(ql) !== -1;
            var inBody = c.indexOf(ql) !== -1;
            if (!inTitle && !inBody) continue;

            var score = inBody ? 20 : 0;
            if (inTitle) {
                if (t === ql) {
                    score = 120;
                } else if (t.indexOf(ql) === 0) {
                    score = 90 - Math.min(25, t.length);
                } else {
                    score = 60 - Math.min(20, t.length);
                }
            }
            hits.push({ page: p, score: score });
        }

        hits.sort(function (a, b) {
            if (b.score !== a.score) return b.score - a.score;
            return a.page.title.length - b.page.title.length;
        });

        if (!hits.length) {
            box.innerHTML = '<div class="search-empty">' + esc(root.getAttribute('data-no-results') || '') + '</div>';
        } else {
            box.innerHTML = hits.map(function (h) {
                var p = h.page;
                return '<a class="search-item" href="' + esc(p.url) + '">' +
                    '<span class="search-title">' + highlight(p.title || '', q) + '</span>' +
                    '<span class="search-snippet">' + snippet(p.content || '', q) + '</span>' +
                    '</a>';
            }).join('');
        }
        box.classList.add('is-open');
    }

    var timer = null;
    input.addEventListener('focus', load);
    input.addEventListener('input', function () {
        var q = input.value.trim();
        clearTimeout(timer);
        if (!q) { pendingQuery = ''; close(); return; }
        if (q.length < 2) {
            pendingQuery = '';
            box.innerHTML = '<div class="search-empty">' + esc(root.getAttribute('data-min-length') || '') + '</div>';
            box.classList.add('is-open');
            return;
        }
        pendingQuery = q;
        load();
        timer = setTimeout(function () {
            if (pages) {
                pendingQuery = '';
                render(q);
            }
        }, 180);
    });
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { close(); input.blur(); }
        if (e.key === 'Enter') {
            var first = box.querySelector('.search-item');
            if (first) window.location.href = first.getAttribute('href');
        }
    });

    /* 结果项点击显式跳转，避免被上层元素拦截默认行为 */
    box.addEventListener('click', function (e) {
        var item = e.target.closest ? e.target.closest('.search-item') : null;
        if (item) {
            e.preventDefault();
            window.location.href = item.getAttribute('href');
        }
    });

    document.addEventListener('click', function (e) {
        if (!root.contains(e.target)) close();
    });
})();
