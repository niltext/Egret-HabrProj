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
 * 收集金币龙骨动画   (后修改，不需要龙骨了)
 * @author chenkai 2018/8/21
 */
var GoldBones = (function (_super) {
    __extends(GoldBones, _super);
    function GoldBones() {
        var _this = _super.call(this) || this;
        //收集的金币数
        _this.gold = 0;
        _this.texture = RES.getRes("com_col_gold_png");
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        return _this;
    }
    //回收
    GoldBones.prototype.recyle = function () {
        this.parent && this.parent.removeChild(this);
        App.ObjectPool.getPool(GoldBones).returnObject(this);
    };
    return GoldBones;
}(eui.Image));
__reflect(GoldBones.prototype, "GoldBones");
