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
 * 空的工作台
 * @author chenkai 2018/8/8
 */
var EmptyDesk = (function (_super) {
    __extends(EmptyDesk, _super);
    function EmptyDesk() {
        var _this = _super.call(this) || this;
        _this.cos = 0; //解锁所需金币
        _this.skinName = "EmptyDeskSkin";
        _this.touchChildren = false;
        _this.touchEnabled = false;
        return _this;
    }
    EmptyDesk.prototype.childrenCreated = function () {
    };
    return EmptyDesk;
}(BaseDesk));
__reflect(EmptyDesk.prototype, "EmptyDesk");
