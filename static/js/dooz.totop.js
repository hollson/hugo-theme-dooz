/*
回到顶部：在body底部添加a链接，并引入script(须在尾端）
<a id="rocket" href="#top"></a>
<script type="text/javascript" src='{{ "js/dooz.totop.js?v=0.0.0" | absURL }}' async=""></script>

零依赖实现（原 jQuery 版行为不变）
*/
(function () {
    'use strict';

    function init() {
        var rocket = document.getElementById('rocket');
        if (!rocket) return;

        function toggle() {
            rocket.classList.toggle('show', window.pageYOffset > 500);
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
                setTimeout(done, 600);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
