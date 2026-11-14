/*!
 * reward.js — 赞赏弹窗，零依赖实现（原 jQuery 版行为不变）
 */
(function () {
    'use strict';

    function show(el) { if (el) el.style.display = 'block'; }
    function hide(el) { if (el) el.style.display = 'none'; }

    function init() {
        var bg = document.querySelector('.zs-modal-bg');
        var box = document.querySelector('.zs-modal-box');
        if (!bg || !box) return;

        var btnList = box.querySelector('.zs-modal-btns');
        var footer = box.querySelector('.zs-modal-footer');
        var pay = box.querySelector('.zs-modal-pay');
        var payType = document.getElementById('pay-type');
        var payImage = document.getElementById('pay-image');
        var payText = document.getElementById('pay-text');

        function close() {
            hide(bg);
            hide(box);
        }

        function open() {
            show(bg);
            show(box);
            show(btnList);
            show(footer);
            hide(pay);
        }

        function choose(btn) {
            var num = btn.getAttribute('data-num');
            var radio = box.querySelector('.zs-type:checked');
            var type = radio ? radio.value : 'wechat';
            if (payType) payType.textContent = type === 'alipay' ? '支付宝' : '微信';
            if (payImage) payImage.setAttribute('src', '/img/reward/' + type + '-' + num + '.png');
            if (payText) {
                payText.textContent = btn.textContent.trim();
                payText.setAttribute('data-num', num);
            }
            show(pay);
            hide(btnList);
            hide(footer);
        }

        document.addEventListener('click', function (e) {
            if (e.target.closest('.show-zs')) { open(); return; }
            if (e.target.closest('.zs-modal-box .close') || e.target.classList.contains('zs-modal-bg')) { close(); return; }
            var btn = e.target.closest('.zs-modal-btns .btn');
            if (btn) choose(btn);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
