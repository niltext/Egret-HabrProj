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
 * 升级选项
 * @author chenkai 2018/8/15
 */
var LevelUpItem = (function (_super) {
    __extends(LevelUpItem, _super);
    function LevelUpItem() {
        var _this = _super.call(this) || this;
        _this.id = 0; //id
        _this.workbenchNo = 0; //桌子编号
        _this.level = 0; //等级
        _this.skinName = "LevelUpItemSkin";
        _this.touchChildren = false;
        return _this;
    }
    LevelUpItem.prototype.childrenCreated = function () {
        this.bar.mask = this.barMask;
    };
    //设置显示
    LevelUpItem.prototype.setView = function (id, workbenchNo, level, cos) {
        this.id = id;
        this.workbenchNo = workbenchNo;
        this.level = level;
        if (level == 0) {
            this.levelUpGroup.visible = false;
            this.unlockGroup.visible = true;
            this.cosLab.text = NumberTool.formatMoney(cos);
        }
        else {
            this.levelUpGroup.visible = true;
            this.unlockGroup.visible = false;
            this.starLab.text = App.DataCenter.deskInfo.getStar(workbenchNo, level) + "";
            this.levelLab.text = level + "";
            this.goldLab.text = NumberTool.formatMoney(App.DataCenter.deskInfo.getUpdateCos(workbenchNo, level));
            this.setProgress(App.DataCenter.deskInfo.getLevelUpPro(workbenchNo, level));
        }
    };
    //设置进度 0-1
    LevelUpItem.prototype.setProgress = function (value) {
        this.barMask.scaleX = value;
    };
    return LevelUpItem;
}(eui.Component));
__reflect(LevelUpItem.prototype, "LevelUpItem");
