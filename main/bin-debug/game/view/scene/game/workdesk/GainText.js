var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 获得金币的飘动字体
 * @author chenkai 2018/8/10
 */
var GainText = (function (_super) {
    __extends(GainText, _super);
    function GainText() {
        var _this = _super.call(this) || this;
        _this.skinName = "GainTextSkin";
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    /**
     * 显示
     * @param num 显示的数字
     * @param doc 显示的容器
     */
    GainText.prototype.show = function (num, x, y, doc) {
        var _this = this;
        this.numLab.text = "+" + NumberTool.formatMoney(num);
        this.x = x;
        this.y = y;
        doc.addChild(this);
        egret.Tween.get(this).to({ y: y - 50 }, 1000).call(function () {
            _this.parent && _this.parent.removeChild(_this);
            App.ObjectPool.getPool(GainText).returnObject(_this);
        });
    };
    return GainText;
}(eui.Component));
__reflect(GainText.prototype, "GainText");
