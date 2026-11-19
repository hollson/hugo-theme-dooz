/*
 * 主题公告：页面渲染后异步读取，每天最多请求一次。
 * - 优先使用 localStorage 中的上次公告，立即原地渲染
 * - 同一天只检查一次远端；失败时保留本地兜底公告
 * - 远端内容按受限 Markdown 渲染，不执行原始 HTML
 */
(function () {
    'use strict';

    var root = document.getElementById('theme-announcement');
    if (!root) return;

    var messageEl = root.querySelector('.site-announcement-message');
    var url = root.getAttribute('data-announcement-url');
    if (!messageEl || !url) return;

    var DATA_KEY = 'dooz:theme-announcement:data';
    var CHECK_KEY = 'dooz:theme-announcement:last-check';
    var SHOWN_KEY = 'dooz:theme-announcement:shown';
    var CLOSED_KEY = 'dooz:theme-announcement:closed';
    var EXPIRE_KEY = 'dooz:theme-announcement:auto-close-until';
    var AUTO_CLOSE_MS = 5 * 60 * 1000;
    var autoCloseTimer = null;
    var revealTimer = null;
    var hideTimer = null;
    var isShown = false;
    var revealPending = false;
    var closeButton = root.querySelector('.theme-announcement-close');

    function randomRevealDelay() {
        return 5000 + Math.floor(Math.random() * 5001);
    }

    function show() {
        if (isShown) return;
        revealPending = false;
        isShown = true;
        root.hidden = false;
        window.requestAnimationFrame(function () {
            root.classList.add('is-visible');
        });

        var now = Date.now();
        var expiresAt = Number(read(EXPIRE_KEY) || 0);
        if (!expiresAt || expiresAt <= now) {
            expiresAt = now + AUTO_CLOSE_MS;
            write(EXPIRE_KEY, String(expiresAt));
        }
        var remaining = expiresAt - now;
        autoCloseTimer = window.setTimeout(function () {
            hide(true);
        }, remaining);
    }

    function dayKey() {
        var d = new Date();
        var month = String(d.getMonth() + 1).padStart(2, '0');
        var day = String(d.getDate()).padStart(2, '0');
        return d.getFullYear() + '-' + month + '-' + day;
    }

    function read(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    }

    function write(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            // localStorage 不可用时降级为每次请求，不影响页面
        }
    }

    function readCache() {
        var value = read(DATA_KEY);
        if (!value) return null;
        try {
            return JSON.parse(value);
        } catch (e) {
            return null;
        }
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&nbsp;/g, ' ')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function renderMessage(value) {
        var text = escapeHtml(value);
        text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, function (_, label, href) {
            return '<a href="' + href + '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
        });
        text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        return text.replace(/\n/g, '<br>');
    }

    function isActive(data) {
        if (!data || data.enabled !== true || !data.message) return false;

        var now = Date.now();
        var start = data.startAt ? Date.parse(data.startAt) : null;
        var end = data.expireAt ? Date.parse(data.expireAt) : null;

        if (start !== null && (Number.isNaN(start) || now < start)) return false;
        if (end !== null && (Number.isNaN(end) || now >= end)) return false;
        return true;
    }

    function apply(data) {
        if (!isActive(data) || read(CLOSED_KEY) === dayKey()) {
            hide(false);
            return;
        }

        messageEl.innerHTML = renderMessage(data.message);
        if (revealTimer) window.clearTimeout(revealTimer);
        if (hideTimer) window.clearTimeout(hideTimer);

        if (read(SHOWN_KEY) === dayKey()) {
            if (revealPending) return;
            show();
            return;
        }

        write(SHOWN_KEY, dayKey());
        root.classList.remove('is-visible');
        revealPending = true;
        revealTimer = window.setTimeout(show, randomRevealDelay());
    }

    function hide(closeForToday, immediate) {
        if (revealTimer) window.clearTimeout(revealTimer);
        if (autoCloseTimer) window.clearTimeout(autoCloseTimer);
        revealPending = false;
        if (closeForToday) write(CLOSED_KEY, dayKey());
        root.classList.remove('is-visible');
        if (hideTimer) window.clearTimeout(hideTimer);
        if (immediate) {
            root.hidden = true;
            isShown = false;
            return;
        }
        hideTimer = window.setTimeout(function () {
            root.hidden = true;
            isShown = false;
        }, 1250);
    }

    function dismiss() {
        if (autoCloseTimer) window.clearTimeout(autoCloseTimer);
        hide(true, true);
    }

    if (closeButton) {
        closeButton.addEventListener('click', dismiss);
    }

    var cached = readCache();
    if (cached && cached.data) {
        apply(cached.data);
    }

    // 同一自然日只检查一次；检查日期在请求前写入，失败也不重复请求
    if (read(CHECK_KEY) === dayKey()) return;
    write(CHECK_KEY, dayKey());

    var fetchURL = url + (url.indexOf('?') === -1 ? '?' : '&') + 'v=' + encodeURIComponent(dayKey());
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = controller ? window.setTimeout(function () { controller.abort(); }, 6000) : null;

    fetch(fetchURL, controller ? { signal: controller.signal } : {})
        .then(function (response) {
            if (!response.ok) throw new Error('announcement request failed');
            return response.json();
        })
        .then(function (data) {
            write(DATA_KEY, JSON.stringify({ data: data, fetchedAt: Date.now() }));
            apply(data);
        })
        .catch(function () {
            // 主题公告不可用或没有有效公告时不显示，避免展示过期内容
        })
        .then(function () {
            if (timer) window.clearTimeout(timer);
        });
})();
