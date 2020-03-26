function ZanShang() {
  this.popbg = $('.zs-modal-bg');
  this.popcon = $('.zs-modal-box');
  this.closeBtn = $('.zs-modal-box .close');
  this.zsbtn = $('.zs-modal-btns .btn');
  this.zsPay = $('.zs-modal-pay');
  this.zsBtns = $('.zs-modal-btns');
  this.zsFooter = $('.zs-modal-footer');
  var that = this;
  $('.show-zs').on('click', function () {
    //点击赞赏按钮出现弹窗
    that._show();
    that._init();
  })
}
ZanShang.prototype._hide = function () {
  this.popbg.hide();
  this.popcon.hide();
}
ZanShang.prototype._show = function () {
  this.popbg.show();
  this.popcon.show();
  this.zsBtns.show();
  this.zsFooter.show();
  this.zsPay.hide();
}
ZanShang.prototype._init = function () {
  var that = this;
  this.closeBtn.on('click', function () {
    that._hide();
  })
  this.popbg.on('click', function () {
    that._hide();
  })
  this.zsbtn.each(function (el) {
    $(this).on('click', function () {
      var num = $(this).attr('data-num'); //按钮的对应的数字
      var type = $('.zs-type:radio:checked').val();//付款方式
      var src = '/img/reward/' + type + '-' + num + '.png';
      var text = $(this).html();
      var payType = $('#pay-type'), payImage = $('#pay-image'), payText = $('#pay-text');
      if (type == 'alipay') {
        payType.html('支付宝');
      } else {
        payType.html('微信');
      }
      payImage.attr('src', src);
      payText.html(text);
      that.zsPay.show();
      that.zsBtns.hide();
      that.zsFooter.hide();

    })
  })
}
var zs = new ZanShang();
