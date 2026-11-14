// 零依赖实现：外链新窗口打开、微信弹窗开关（原 jQuery 版行为不变）
document.addEventListener('DOMContentLoaded', () => {
    // 正文外链加 target=_blank 与 rel=noopener
    document.querySelectorAll('.content a[href^="http"]').forEach(a => {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
    });

    // 打开微信弹窗
    document.querySelectorAll('.modal-wechat').forEach(el => {
        el.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.classList.add('is-active'));
        });
    });

    // 点击遮罩关闭弹窗
    document.querySelectorAll('.modal-background').forEach(el => {
        el.addEventListener('click', () => {
            const modal = el.closest('.modal');
            if (modal) modal.classList.remove('is-active');
        });
    });
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
