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
 * 产品
 * @author chenkai 2018/8/8
 */
var Product = (function (_super) {
    __extends(Product, _super);
    function Product() {
        var _this = _super.call(this) || this;
        _this.texture = RES.getRes("game_product_png");
        return _this;
    }
    Product.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
        App.ObjectPool.getPool(Product).returnObject(this);
    };
    return Product;
}(eui.Image));
__reflect(Product.prototype, "Product");
