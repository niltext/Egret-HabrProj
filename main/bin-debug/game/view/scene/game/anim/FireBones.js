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
 * 人物火动画
 * @author chenkai 2018/8/21
 */
var FireBones = (function (_super) {
    __extends(FireBones, _super);
    function FireBones() {
        var _this = _super.call(this) || this;
        _this.initBinary("fire", "fire");
        return _this;
    }
    FireBones.prototype.play = function () {
        this.playAction("fire", -1);
    };
    FireBones.prototype.hide = function () {
        this.armatureDisplay.animation.stop();
        this.parent && this.parent.removeChild(this);
    };
    return FireBones;
}(BaseBone));
__reflect(FireBones.prototype, "FireBones");
