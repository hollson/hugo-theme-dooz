/*
 * Dooz 主题前端行为：
 * 1. 基础交互（评论位置、外链、微信弹窗、目录联动、导航、打赏）
 * 2. 代码块工具栏（复制 / 展开）
 * 3. 回到顶部火箭
 */
(function () {
    'use strict';

const repo = 'https://github.com/hollson/hugo-theme-dooz';
console.log(
    '%c Dooz %c A clean Hugo theme for programmers & writers',
    'background:#2f9e7e;color:#fff;padding:2px 6px;border-radius:2px;font-weight:bold;',
    'color:#8b9b98;'
);
console.log(
    '%cBuilt with %c' + repo,
    'color:#8b9b98;',
    'color:#e8750a;'
);

// 零依赖实现：外链新窗口打开、微信弹窗开关
document.addEventListener('DOMContentLoaded', () => {
    const comments = document.getElementById('comments');
    const contentColumns = document.querySelector('.content-columns');
    if (comments && contentColumns) {
        const originalPosition = document.createComment('comments-position');
        comments.parentNode.insertBefore(originalPosition, comments);
        const stackedLayout = window.matchMedia('(max-width: 1215px)');
        const placeComments = () => {
            if (stackedLayout.matches) {
                contentColumns.parentNode.insertBefore(comments, contentColumns.nextSibling);
            } else {
                originalPosition.parentNode.insertBefore(comments, originalPosition.nextSibling);
            }
        };

        placeComments();
        if (stackedLayout.addEventListener) {
            stackedLayout.addEventListener('change', placeComments);
        } else {
            stackedLayout.addListener(placeComments);
        }
    }

    // 正文外链加 target=_blank 与 rel=noopener
    document.querySelectorAll('.content a[href^="http"]').forEach(a => {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
    });

    // 打开微信弹窗
    document.querySelectorAll('.modal-wechat').forEach(el => {
        el.addEventListener('click', () => {
            const targetId = el.dataset.target;
            const modal = targetId ? document.getElementById(targetId) : document.querySelector('.modal');
            if (modal) {
                modal.classList.add('is-active');
                document.body.classList.add('is-clipped');
            }
        });
    });

    // 点击遮罩或关闭按钮关闭弹窗
    document.querySelectorAll('.modal-background, .modal-close').forEach(el => {
        el.addEventListener('click', () => {
            const modal = el.closest('.modal');
            if (modal) {
                modal.classList.remove('is-active');
                document.body.classList.remove('is-clipped');
            }
        });
    });

    // Esc 关闭弹窗
    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        document.querySelectorAll('.modal.is-active').forEach(modal => {
            modal.classList.remove('is-active');
        });
        document.body.classList.remove('is-clipped');
    });
});

// 文章目录滚动联动：正文滚动时高亮当前章节
document.addEventListener('DOMContentLoaded', () => {
    const toc = document.querySelector('.toc-tree');
    if (!toc) return;

    const links = Array.from(toc.querySelectorAll('a.toc-link'));
    const headings = links.map(link => {
        let id = link.getAttribute('href') || '';
        try {
            id = decodeURIComponent(id.replace(/^#/, ''));
        } catch (error) {
            id = id.replace(/^#/, '');
        }
        return {
            link,
            element: id ? document.getElementById(id) : null
        };
    }).filter(item => item.element);

    if (!headings.length) return;

    let ticking = false;

    const clearActive = () => {
        links.forEach(link => {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');
            const item = link.closest('.toc-item');
            if (item) item.classList.remove('is-active', 'is-active-parent');
        });
    };

    const setActive = active => {
        clearActive();
        active.link.classList.add('is-active');
        active.link.setAttribute('aria-current', 'location');

        let item = active.link.closest('.toc-item');
        if (item) {
            item.classList.add('is-active');
            item = item.parentElement ? item.parentElement.closest('.toc-item') : null;
        }
        while (item) {
            item.classList.add('is-active-parent');
            item = item.parentElement ? item.parentElement.closest('.toc-item') : null;
        }
    };

    const update = () => {
        ticking = false;
        const offset = 88;
        let current = headings[0];

        headings.forEach(item => {
            if (item.element.getBoundingClientRect().top <= offset) {
                current = item;
            }
        });

        // 滚到页面底部时，高亮最后一个章节
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
            current = headings[headings.length - 1];
        }

        setActive(current);
    };

    const requestUpdate = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('load', requestUpdate);
    update();
});

// Adaptive mobile terminal
// https://bulma.io/documentation/components/navbar/
document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
});

// 打赏弹窗：零依赖实现
document.addEventListener('DOMContentLoaded', () => {
    const dshangBg = document.querySelector('.zs-modal-bg');
    const dshangBox = document.querySelector('.zs-modal-box');
    if (!dshangBg || !dshangBox) return;

    const dshangBtns = dshangBox.querySelector('.zs-modal-btns');
    const dshangFooter = dshangBox.querySelector('.zs-modal-footer');
    const dshangPanel = dshangBox.querySelector('.zs-modal-pay');
    const dshangType = document.getElementById('pay-type');
    const dshangImage = document.getElementById('pay-image');
    const dshangText = document.getElementById('pay-text');
    const dshangImageBase = dshangBox.dataset.imageBase || '/assets';

    const showDshang = el => { if (el) el.style.display = 'block'; };
    const hideDshang = el => { if (el) el.style.display = 'none'; };

    const closeDshang = () => {
        hideDshang(dshangBg);
        hideDshang(dshangBox);
    };

    const openDshang = () => {
        showDshang(dshangBg);
        showDshang(dshangBox);
        showDshang(dshangBtns);
        showDshang(dshangFooter);
        hideDshang(dshangPanel);
    };

    const chooseDshang = btn => {
        const num = btn.getAttribute('data-num');
        const radio = dshangBox.querySelector('.zs-type:checked');
        const type = radio ? radio.value : 'wechat';
        if (dshangType) dshangType.textContent = dshangType.getAttribute('data-' + type) || type;
        if (dshangImage) dshangImage.setAttribute('src', dshangImageBase + '/' + type + '-' + num + '.png');
        if (dshangText) {
            dshangText.textContent = btn.textContent.trim();
            dshangText.setAttribute('data-num', num);
        }
        showDshang(dshangPanel);
        hideDshang(dshangBtns);
        hideDshang(dshangFooter);
    };

    document.addEventListener('click', e => {
        if (e.target.closest('.show-zs')) { openDshang(); return; }
        if (e.target.closest('.zs-modal-box .close') || e.target.classList.contains('zs-modal-bg')) { closeDshang(); return; }
        const btn = e.target.closest('.zs-modal-btns .btn');
        if (btn) chooseDshang(btn);
    });
});

    /* ===== 代码块工具栏：语言、复制、展开 ===== */
/* 代码块工具栏：语言、复制、展开 */
(function () {
    'use strict';

    var MAX_LINES = 20;
    var copyLabelTimer = null;

    function getCode(block) {
        var pres = block.querySelectorAll('pre');
        var pre = pres.length ? pres[pres.length - 1] : block;
        var code = pre.querySelector('code') || pre;

        var text = code.textContent;
        if (!text) text = code.innerText || '';

        return text
            .replace(/\u00a0/g, ' ')
            .replace(/[ \t]+\n/g, '\n')
            .replace(/\s+$/, '');
    }

    function copy(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise(function (resolve, reject) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy') ? resolve() : reject();
            } catch (e) {
                reject(e);
            } finally {
                document.body.removeChild(ta);
            }
        });
    }

    function initBlock(block) {
        var copyBtn = block.querySelector('.code-copy');
        var copyLabel = block.querySelector('.code-copy-label');
        var expandBtn = block.querySelector('.code-expand');
        var copyText = block.getAttribute('data-copy-label') || 'Copy';
        var copiedText = block.getAttribute('data-copy-copied') || 'Copied';
        var copyFailedText = block.getAttribute('data-copy-failed') || 'Copy failed; please select manually';
        var expandText = block.getAttribute('data-expand-label') || 'Expand';
        var collapseText = block.getAttribute('data-collapse-label') || 'Collapse';
        var codeText = getCode(block);
        var lines = codeText ? codeText.split('\n').length : 0;

        if (lines > MAX_LINES && expandBtn) {
            block.classList.add('is-collapsed');
            expandBtn.hidden = false;
            expandBtn.setAttribute('aria-expanded', 'false');
            expandBtn.textContent = expandText;

            expandBtn.addEventListener('click', function () {
                var collapsed = block.classList.toggle('is-collapsed');
                expandBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
                expandBtn.textContent = collapsed ? expandText : collapseText;
            });
        }

        if (!copyBtn) return;

        copyBtn.addEventListener('click', function () {
            copy(getCode(block)).then(function () {
                copyBtn.classList.add('is-copied');
                if (copyLabel) copyLabel.textContent = copiedText;
                if (copyLabelTimer) clearTimeout(copyLabelTimer);
                copyLabelTimer = setTimeout(function () {
                    copyBtn.classList.remove('is-copied');
                    if (copyLabel) copyLabel.textContent = copyText;
                }, 1600);
            }).catch(function () {
                copyBtn.setAttribute('title', copyFailedText);
            });
        });
    }

    function init() {
        var blocks = document.querySelectorAll('.content .code-block');
        Array.prototype.forEach.call(blocks, initBlock);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

    /* ===== 回到顶部：火箭按钮 ===== */
/* 回到顶部：火箭按钮，滚动后淡入，点击点火上飞并平滑回到顶部 */
(function () {
    'use strict';

    function init() {
        var rocket = document.getElementById('rocket');
        if (!rocket) return;

        var THRESHOLD = 500;

        function toggle() {
            rocket.classList.toggle('show', window.pageYOffset > THRESHOLD);
        }

        window.addEventListener('scroll', toggle, { passive: true });
        toggle();

        rocket.addEventListener('click', function (e) {
            e.preventDefault();
            rocket.classList.add('launch');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            var done = function () {
                rocket.classList.remove('show', 'launch');
            };
            if ('onscrollend' in window) {
                window.addEventListener('scrollend', done, { once: true });
            } else {
                setTimeout(done, 700);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
})();

/* ===== 推荐阅读：30 分钟时间桶轮换 ===== */
(function () {
    'use strict';

    var DEFAULT_COUNT = 6;
    var DEFAULT_BUCKET_MINUTES = 30;

    function hashString(value) {
        var hash = 2166136261;
        for (var i = 0; i < value.length; i++) {
            hash ^= value.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
    }

    function mulberry32(seed) {
        return function () {
            seed |= 0;
            seed = seed + 0x6D2B79F5 | 0;
            var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }

    function shuffle(items, random) {
        for (var i = items.length - 1; i > 0; i--) {
            var j = Math.floor(random() * (i + 1));
            var temp = items[i];
            items[i] = items[j];
            items[j] = temp;
        }
    }

    function render(widget, items) {
        var list = widget.querySelector('.recommended-list');
        if (!list) return;

        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        var fragment = document.createDocumentFragment();
        items.forEach(function (item) {
            var heading = document.createElement('h2');

            var link = document.createElement('a');
            link.href = item.u;
            link.title = item.t;
            link.textContent = item.t;
            heading.appendChild(link);

            var time = document.createElement('time');
            time.className = 'has-text-grey-light is-size-7';
            time.dateTime = item.iso;
            time.textContent = item.dt;

            var meta = document.createElement('div');
            meta.className = 'widget-entry-meta';

            if (item.a) {
                var author = document.createElement('span');
                author.className = 'widget-entry-author';
                author.textContent = item.a;
                meta.appendChild(author);
            }

            var date = document.createElement('span');
            date.className = 'widget-entry-date';
            date.innerHTML = '<svg class="icon-svg" width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><line x1="8" y1="3" x2="8" y2="7"></line><line x1="16" y1="3" x2="16" y2="7"></line><line x1="3" y1="11" x2="21" y2="11"></line></svg>';
            date.appendChild(time);
            meta.appendChild(date);

            fragment.appendChild(heading);
            fragment.appendChild(meta);
        });

        list.appendChild(fragment);
    }

    function initWidget(widget) {
        var data = widget.querySelector('.recommended-pool');
        if (!data) return;

        var pool;
        try {
            pool = JSON.parse(data.textContent);
        } catch (error) {
            return;
        }

        if (!Array.isArray(pool) || !pool.length) return;

        var count = parseInt(widget.dataset.recommendedCount, 10) || DEFAULT_COUNT;
        if (pool.length <= count) return;

        var minutes = parseInt(widget.dataset.recommendedBucketMinutes, 10) || DEFAULT_BUCKET_MINUTES;
        var bucket = Math.floor(Date.now() / (minutes * 60 * 1000));
        var seed = hashString(window.location.pathname + '|' + bucket + '|' + count);
        var random = mulberry32(seed);

        var picked = pool.slice();
        shuffle(picked, random);
        picked = picked.slice(0, count).sort(function (a, b) {
            return (Number(b.d) || 0) - (Number(a.d) || 0);
        });

        render(widget, picked);
    }

    function init() {
        var widgets = document.querySelectorAll('.recommended-widget');
        Array.prototype.forEach.call(widgets, initWidget);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 文章列表摘要：超过两行时，按实际字符宽度截断，并在省略号后留出约 5 个汉字空白
    var summarySource = new WeakMap();

    function measureSummaryText(container, text) {
        container.textContent = text;
        var range = document.createRange();
        range.selectNodeContents(container);
        var rects = range.getClientRects();
        if (!rects.length) return { lines: 0, right: 0 };

        var tops = [];
        var lastTop = null;
        var lastRight = 0;
        for (var i = 0; i < rects.length; i++) {
            var rect = rects[i];
            if (!rect.width && !rect.height) continue;
            var top = Math.round(rect.top);
            if (tops.indexOf(top) === -1) tops.push(top);
            if (lastTop === null || top > lastTop) {
                lastTop = top;
                lastRight = rect.right;
            } else if (top === lastTop && rect.right > lastRight) {
                lastRight = rect.right;
            }
        }
        return { lines: tops.length, right: lastRight };
    }

    function updateSummaryClamp() {
        var summaries = document.querySelectorAll('.post-list-item .summary');
        Array.prototype.forEach.call(summaries, function (summary) {
            var fullText = summarySource.get(summary);
            if (fullText === undefined) {
                fullText = summary.textContent.trim();
                summarySource.set(summary, fullText);
            }
            summary.textContent = fullText;
            if (!fullText) return;

            var style = window.getComputedStyle(summary);
            var fontSize = parseFloat(style.fontSize) || 16;
            var width = summary.clientWidth;
            if (!width) return;

            var clone = summary.cloneNode(false);
            clone.style.position = 'fixed';
            clone.style.visibility = 'hidden';
            clone.style.pointerEvents = 'none';
            clone.style.left = '0';
            clone.style.top = '0';
            clone.style.width = width + 'px';
            clone.style.maxHeight = 'none';
            clone.style.height = 'auto';
            clone.style.overflow = 'visible';
            clone.style.display = 'block';
            clone.style.webkitLineClamp = 'unset';
            clone.style.lineClamp = 'unset';
            clone.style.margin = '0';
            summary.parentNode.appendChild(clone);

            var full = measureSummaryText(clone, fullText);
            if (full.lines <= 2) {
                summary.parentNode.removeChild(clone);
                return;
            }

            // 6em = 省略号约 1em + 其后预留的 5em 空白
            var limitRight = clone.getBoundingClientRect().left + width - fontSize * 6;
            var chars = Array.from(fullText);
            var low = 0;
            var high = chars.length;
            var best = 0;
            while (low <= high) {
                var mid = Math.floor((low + high) / 2);
                var metrics = measureSummaryText(clone, chars.slice(0, mid).join(''));
                if (metrics.lines <= 2 && metrics.right <= limitRight) {
                    best = mid;
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }

            while (best > 0 && /\s/.test(chars[best - 1])) best--;
            summary.textContent = chars.slice(0, best).join('') + '…';
            summary.parentNode.removeChild(clone);
        });
    }

    function scheduleSummaryClamp() {
        window.requestAnimationFrame(updateSummaryClamp);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scheduleSummaryClamp);
    } else {
        scheduleSummaryClamp();
    }
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(scheduleSummaryClamp);
    }

    var summaryResizeTimer;
    window.addEventListener('resize', function () {
        window.clearTimeout(summaryResizeTimer);
        summaryResizeTimer = window.setTimeout(scheduleSummaryClamp, 150);
    });
})();
