/*
回到顶部：在body底部添加a链接，并引入script(须在尾端）
<a id="rocket" href="#top"></a>
<script type="text/javascript" src='{{ "js/dooz.totop.js?v=0.0.0" | absURL }}' async=""></script>
*/
$(window).scroll(function () {
    $(window).scrollTop() > 500 ? $("#rocket").addClass("show") : $("#rocket").removeClass("show");
});
$("#rocket").click(function () {
    $("#rocket").addClass("launch");
    $("html, body").animate({
        scrollTop: 0
    }, 500, function () {
        $("#rocket").removeClass("show launch");
    });
    return false;
});

function async(u, c) {
    var d = document, t = 'script',
        o = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    o.src = u;
    if (c) { o.addEventListener('load', function (e) { c(null, e); }, false); }
    s.parentNode.insertBefore(o, s);
}

