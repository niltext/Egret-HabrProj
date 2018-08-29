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
 * 工作台基类
 * @author chenkai 2018/8/8
 */
var BaseDesk = (function (_super) {
    __extends(BaseDesk, _super);
    function BaseDesk() {
        var _this = _super.call(this) || this;
        _this.id = 0; //桌子id
        _this.workbenchNo = 0; //桌子编号
        _this.type = 0; //桌子类型 0空的工作台 1运转中工作台
        _this.touchChildren = false;
        return _this;
    }
    BaseDesk.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return BaseDesk;
}(eui.Component));
__reflect(BaseDesk.prototype, "BaseDesk");
