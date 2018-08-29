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
 * 底部菜单按钮
 * @author chenkai 2018/8/10
 */
var FootMenuUI = (function (_super) {
    __extends(FootMenuUI, _super);
    function FootMenuUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "FootMenuUISkin";
        return _this;
    }
    FootMenuUI.prototype.childrenCreated = function () {
    };
    FootMenuUI.prototype.downAllBtn = function () {
        this.levelUpBtn.selected = false;
        this.picBtn.selected = false;
        this.taskBtn.selected = false;
    };
    //设置金币显示
    FootMenuUI.prototype.setGoldLab = function (gold) {
        this.goldLab.text = NumberTool.formatMoney(gold);
    };
    //设置任务提示
    FootMenuUI.prototype.setTaskLab = function (num) {
    };
    return FootMenuUI;
}(eui.Component));
__reflect(FootMenuUI.prototype, "FootMenuUI");
