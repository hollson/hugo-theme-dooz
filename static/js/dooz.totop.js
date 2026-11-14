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
