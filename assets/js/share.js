/*!
 * share.js — 零依赖分享按钮（替代 jquery.share）
 * 复用 share.min.css 的图标类，渲染结果与原组件一致
 */
(function () {
    'use strict';

    var SITES = [
        { name: 'weibo',    cls: 'icon-weibo',    label: 'Weibo',    url: 'https://service.weibo.com/share/share.php?url={u}&title={t}' },
        { name: 'qq',       cls: 'icon-qq',       label: 'QQ',       url: 'https://connect.qq.com/widget/shareqq/index.html?url={u}&title={t}&summary={d}' },
        { name: 'wechat',   cls: 'icon-wechat',   label: 'WeChat',   url: null },
        { name: 'douban',   cls: 'icon-douban',   label: 'Douban',   url: 'https://www.douban.com/share/service?href={u}&name={t}&text={d}' },
        { name: 'linkedin', cls: 'icon-linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/shareArticle?mini=true&url={u}&title={t}&summary={d}' },
        { name: 'facebook', cls: 'icon-facebook', label: 'Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u={u}' },
        { name: 'twitter',  cls: 'icon-twitter',  label: 'Twitter',  url: 'https://twitter.com/share?url={u}&text={t}' }
    ];

    function meta(name) {
        var el = document.querySelector('meta[name="' + name + '"]');
        return el ? el.getAttribute('content') || '' : '';
    }

    function toast(msg) {
        var tip = document.createElement('div');
        tip.textContent = msg;
        tip.style.cssText = 'position:fixed;left:50%;bottom:2rem;transform:translateX(-50%);' +
            'background:rgba(0,0,0,.75);color:#fff;padding:.4rem .9rem;border-radius:4px;' +
            'font-size:.8rem;z-index:1000;';
        document.body.appendChild(tip);
        setTimeout(function () { tip.remove(); }, 1600);
    }

    function copy(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text).then(function () { return true; }).catch(function () { return false; });
        }
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        ta.remove();
        return Promise.resolve(ok);
    }

    function render(box) {
        function label(key, fallback) {
            return box.getAttribute('data-' + key) || fallback;
        }

        var labels = {
            weibo: label('social-weibo', 'Weibo'),
            wechat: label('social-wechat', 'WeChat'),
            douban: label('social-douban', 'Douban')
        };
        var data = {
            u: encodeURIComponent(location.href),
            t: encodeURIComponent(document.title),
            d: encodeURIComponent(meta('description'))
        };
        var off = (box.getAttribute('data-disabled') || '').split(',');
        var frag = document.createDocumentFragment();

        SITES.forEach(function (site) {
            if (off.indexOf(site.name) !== -1) return;

            var a = document.createElement('a');
            a.className = 'social-share-icon ' + site.cls;
            var siteLabel = labels[site.name] || site.label;
            a.setAttribute('title', label('share-to', 'Share to ') + siteLabel);
            a.setAttribute('aria-label', label('share-to', 'Share to ') + siteLabel);

            if (site.url) {
                a.href = site.url.replace('{u}', data.u).replace('{t}', data.t).replace('{d}', data.d);
                a.target = '_blank';
                a.rel = 'noopener';
            } else {
                a.href = 'javascript:;';
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    copy(location.href).then(function (ok) {
                        toast(ok ? label('share-copied', 'Link copied. Share it on ') + siteLabel : label('share-copy-failed', 'Copy failed. Please copy the URL from the address bar.'));
                    });
                });
            }
            frag.appendChild(a);
        });

        box.innerHTML = '';
        box.appendChild(frag);
    }

    function init() {
        document.querySelectorAll('.share-component, .social-share').forEach(render);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
