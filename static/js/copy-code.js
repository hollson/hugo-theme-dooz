/* 代码块复制按钮：为正文中每个 .highlight 包一层 .code-wrap 并注入按钮 */
(function () {
    'use strict';

    var ICON_COPY = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
    var ICON_CHECK = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

    function getCode(block) {
        var pres = block.querySelectorAll('pre');
        var pre = pres.length ? pres[pres.length - 1] : block;
        var code = pre.querySelector('code') || pre;
        return (code.innerText || code.textContent || '').replace(/\s+$/, '');
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

    var MAX_LINES = 20;

    function init() {
        var blocks = document.querySelectorAll('.content .highlight');

        Array.prototype.forEach.call(blocks, function (block) {
            if (!block.parentNode || block.parentNode.classList.contains('code-wrap')) return;

            var wrap = document.createElement('div');
            wrap.className = 'code-wrap';
            block.parentNode.insertBefore(wrap, block);
            wrap.appendChild(block);

            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'copy-code';
            btn.setAttribute('aria-label', '复制代码');
            btn.setAttribute('title', '复制代码');
            btn.innerHTML = ICON_COPY;
            wrap.appendChild(btn);

            /* 超过 20 行的代码：限高 + 展开/收起 */
            var codeText = getCode(block);
            var lines = codeText ? codeText.split('\n').length : 0;
            if (lines > MAX_LINES) {
                wrap.classList.add('is-collapsed');

                var toggle = document.createElement('button');
                toggle.type = 'button';
                toggle.className = 'code-toggle';
                toggle.setAttribute('aria-expanded', 'false');
                toggle.textContent = '展开全部（共 ' + lines + ' 行）';
                wrap.appendChild(toggle);

                toggle.addEventListener('click', function () {
                    var collapsed = wrap.classList.toggle('is-collapsed');
                    toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
                    toggle.textContent = collapsed
                        ? '展开全部（共 ' + lines + ' 行）'
                        : '收起代码';
                });
            }

            btn.addEventListener('click', function () {
                copy(getCode(block)).then(function () {
                    btn.innerHTML = ICON_CHECK;
                    btn.classList.add('is-copied');
                    setTimeout(function () {
                        btn.innerHTML = ICON_COPY;
                        btn.classList.remove('is-copied');
                    }, 1600);
                }).catch(function () {
                    btn.setAttribute('title', '复制失败，请手动选择');
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
