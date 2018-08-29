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
 * 工厂UI
 * @author chenkai 2018/8/9
 */
var TopMenuUI = (function (_super) {
    __extends(TopMenuUI, _super);
    function TopMenuUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "TopMenuUISkin";
        return _this;
    }
    TopMenuUI.prototype.childrenCreated = function () {
        //头像
        this.headImg.mask = this.headMask;
        this.headImg.source = App.DataCenter.userInfo.avatarUrl;
        //工厂等级进度条
        this.factoryBar.mask = this.factoryBarMask;
    };
    /**刷新视图 金币、等级等 */
    TopMenuUI.prototype.updateView = function () {
        var factoryInfo = App.DataCenter.factoryInfo;
        //金币
        this.goldLab.text = NumberTool.formatMoney(factoryInfo.curMoney);
        //名称
        this.factoryNameImg.source = RES.getRes("topmenu_name" + factoryInfo.getFactoryScale() + "_png");
        //工厂等级进度
        this.factoryBarMask.scaleX = factoryInfo.curExp / factoryInfo.nextExp;
        this.factoryLevelLab.text = factoryInfo.curLevel + "";
    };
    /**刷新金币 */
    TopMenuUI.prototype.updateMoney = function () {
        var factoryInfo = App.DataCenter.factoryInfo;
        this.goldLab.text = NumberTool.formatMoney(factoryInfo.curMoney);
    };
    /**播放金币缩放动画 */
    TopMenuUI.prototype.playGoldAnim = function () {
        this.goldImg.scaleX = 1;
        this.goldImg.scaleY = 1;
        egret.Tween.get(this.goldImg).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1, scaleY: 1 }, 200);
    };
    return TopMenuUI;
}(eui.Component));
__reflect(TopMenuUI.prototype, "TopMenuUI");
