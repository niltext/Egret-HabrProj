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
 * 缩放Button
 * 点击会放大，释放会缩回原来大小
 * 问题：双指点击两个按钮时，松开其中一个，另外一个也会触发stageEnd
 * @author chenkai 2018/7/25
 */
var ScaleButton = (function (_super) {
    __extends(ScaleButton, _super);
    function ScaleButton() {
        return _super.call(this) || this;
    }
    ScaleButton.prototype.onTouchBegin = function (event) {
        _super.prototype.onTouchBegin.call(this, event);
        this.initAnchorOffset();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
        this.scaleX = 1.05;
        this.scaleY = 1.05;
    };
    ScaleButton.prototype.buttonReleased = function () {
        _super.prototype.buttonReleased.call(this);
        this.scaleX = 1;
        this.scaleY = 1;
    };
    ScaleButton.prototype.onTouchCancle = function (event) {
        _super.prototype.onTouchCancle.call(this, event);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
        this.scaleX = 1;
        this.scaleY = 1;
    };
    ScaleButton.prototype.onStageEnd = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
        this.scaleX = 1;
        this.scaleY = 1;
    };
    ScaleButton.prototype.initAnchorOffset = function () {
        if (this.anchorOffsetX != this.width / 2 && this.anchorOffsetY != this.height / 2) {
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            this.x = this.x + this.width / 2;
            this.y = this.y + this.height / 2;
        }
    };
    return ScaleButton;
}(eui.Button));
__reflect(ScaleButton.prototype, "ScaleButton");
