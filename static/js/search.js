/* 站点内搜索：读取 /index.json，纯前端过滤，无第三方依赖 */
(function () {
    'use strict';

    var root = document.querySelector('.search');
    var input = document.getElementById('search-input');
    var box = document.getElementById('search-results');
    if (!root || !input || !box) return;

    var indexUrl = root.getAttribute('data-index') || '/index.json';
    var pages = null;
    var failed = false;

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function load() {
        if (pages || failed) return;
        fetch(indexUrl)
            .then(function (r) { return r.json(); })
            .then(function (data) { pages = data || []; })
            .catch(function () { failed = true; });
    }

    function close() {
        box.classList.remove('is-open');
        box.innerHTML = '';
    }

    function render(q) {
        if (!pages) return;
        var lower = q.toLowerCase();
        var hits = [];
        for (var i = 0; i < pages.length && hits.length < 8; i++) {
            var p = pages[i];
            var t = (p.title || '').toLowerCase();
            var c = (p.content || '').toLowerCase();
            if (t.indexOf(lower) !== -1 || c.indexOf(lower) !== -1) hits.push(p);
        }
        if (!hits.length) {
            box.innerHTML = '<div class="search-empty">没有匹配的文章</div>';
        } else {
            box.innerHTML = hits.map(function (p) {
                return '<a class="search-item" href="' + escapeHtml(p.url) + '">' +
                    '<span class="search-title">' + escapeHtml(p.title) + '</span>' +
                    '<span class="search-date">' + escapeHtml(p.date || '') + '</span>' +
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
        if (!q) { close(); return; }
        timer = setTimeout(function () { load(); render(q); }, 180);
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
