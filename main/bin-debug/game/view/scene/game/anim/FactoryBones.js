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
 * 工厂龙骨
 * @author chenkai 2018/8/18
 */
var FactoryBones = (function (_super) {
    __extends(FactoryBones, _super);
    function FactoryBones() {
        var _this = _super.call(this) || this;
        _this.initBinary("gongchang", "gongchang");
        return _this;
    }
    //显示
    FactoryBones.prototype.show = function (doc) {
        doc.addChild(this);
        this.scaleX = 2; //调整大小和位置
        this.scaleY = 2;
        this.x = 360;
        this.y = 520;
        this.playAction("gongchangyunzuo", -1);
    };
    return FactoryBones;
}(BaseBone));
__reflect(FactoryBones.prototype, "FactoryBones");
