/* 回到顶部：滚动 400px 后淡入的圆形按钮，点击平滑回到顶部 */
(function () {
    'use strict';

    function init() {
        var btn = document.getElementById('totop');
        if (!btn) return;

        var THRESHOLD = 400;

        function toggle() {
            btn.classList.toggle('show', window.pageYOffset > THRESHOLD);
        }

        window.addEventListener('scroll', toggle, { passive: true });
        toggle();

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
