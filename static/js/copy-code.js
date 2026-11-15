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
        var codeText = getCode(block);
        var lines = codeText ? codeText.split('\n').length : 0;

        if (lines > MAX_LINES && expandBtn) {
            block.classList.add('is-collapsed');
            expandBtn.hidden = false;
            expandBtn.setAttribute('aria-expanded', 'false');
            expandBtn.textContent = '展开';

            expandBtn.addEventListener('click', function () {
                var collapsed = block.classList.toggle('is-collapsed');
                expandBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
                expandBtn.textContent = collapsed ? '展开' : '收起';
            });
        }

        if (!copyBtn) return;

        copyBtn.addEventListener('click', function () {
            copy(getCode(block)).then(function () {
                copyBtn.classList.add('is-copied');
                if (copyLabel) copyLabel.textContent = '已复制';
                if (copyLabelTimer) clearTimeout(copyLabelTimer);
                copyLabelTimer = setTimeout(function () {
                    copyBtn.classList.remove('is-copied');
                    if (copyLabel) copyLabel.textContent = '复制';
                }, 1600);
            }).catch(function () {
                copyBtn.setAttribute('title', '复制失败，请手动选择');
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
