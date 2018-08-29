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
 * 收集的文本
 * @author chenkai 2018/8/9
 */
var CollectionText = (function (_super) {
    __extends(CollectionText, _super);
    function CollectionText() {
        var _this = _super.call(this) || this;
        _this.skinName = "CollectionTextSkin";
        return _this;
    }
    //飞行 
    CollectionText.prototype.fly = function (startX, startY, endX, endY, doc) {
        var _this = this;
        this.x = startX;
        this.y = startY;
        doc.addChild(this);
        egret.Tween.get(this).to({ x: endX, y: endY }, 1000).call(function () {
            _this.parent && _this.parent.removeChild(_this);
            App.ObjectPool.getPool(CollectionText).returnObject(_this);
        });
    };
    CollectionText.prototype.setNumLab = function (gold) {
        this.numLab.text = NumberTool.formatMoney(gold);
    };
    return CollectionText;
}(eui.Component));
__reflect(CollectionText.prototype, "CollectionText");
