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
 * UI基类
 * @description 普通UI基类，主要用于scene或panel内的ui组件
 * @author chenkai 2017/11/16
 */
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onEnable, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        return _this;
    }
    /**添加到场景中*/
    BaseUI.prototype.onEnable = function () {
    };
    /**从场景中移除*/
    BaseUI.prototype.onRemove = function () {
    };
    /**隐藏*/
    BaseUI.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    /**销毁*/
    BaseUI.prototype.onDestory = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onEnable, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return BaseUI;
}(eui.Component));
__reflect(BaseUI.prototype, "BaseUI");
