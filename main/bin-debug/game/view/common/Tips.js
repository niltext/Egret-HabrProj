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
 * 提示信息
 * @author chenkai 2018/7/28
 */
var Tips = (function (_super) {
    __extends(Tips, _super);
    function Tips() {
        var _this = _super.call(this) || this;
        _this.skinName = "TipsSkin";
        return _this;
    }
    Tips.prototype.childrenCreated = function () {
    };
    //显示信息
    Tips.prototype.showMsg = function (msg) {
        var tips = new Tips();
        tips.msgLabel.text = msg;
        tips.x = App.StageUtils.stageWidth / 2 - tips.width / 2;
        tips.y = App.StageUtils.stageHeight / 2 - tips.height / 2;
        App.LayerManager.tipLayer.addChild(tips);
        var yPos = tips.y - 100;
        egret.Tween.get(tips).to({ y: yPos }, 1500).call(function () {
            tips.parent && tips.parent.removeChild(tips);
        }, this);
    };
    Tips.getInstance = function () {
        if (this.instance == null) {
            this.instance = new Tips();
        }
        return this.instance;
    };
    return Tips;
}(eui.Component));
__reflect(Tips.prototype, "Tips");
