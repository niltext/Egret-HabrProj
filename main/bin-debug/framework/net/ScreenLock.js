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
 * 屏幕锁定
 * 使用一个全屏的rect遮挡舞台
 * @author chenkai 2018/8/24
 */
var ScreenLock = (function (_super) {
    __extends(ScreenLock, _super);
    function ScreenLock() {
        var _this = _super.call(this) || this;
        _this.rect = new eui.Rect();
        _this.rect.width = App.StageUtils.stage.width;
        _this.rect.height = App.StageUtils.stage.height;
        _this.rect.alpha = 0;
        return _this;
    }
    ScreenLock.prototype.lock = function () {
        App.LayerManager.lockLayer.addChild(this.rect);
    };
    ScreenLock.prototype.unLock = function () {
        this.rect.parent && this.rect.parent.removeChild(this.rect);
    };
    return ScreenLock;
}(SingleClass));
__reflect(ScreenLock.prototype, "ScreenLock");
