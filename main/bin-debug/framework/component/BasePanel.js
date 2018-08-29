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
 * 弹框基类
 * @description 用于功能模块，例如人物面板、技能面板等
 * @author chenkai 2016/12/18
 */
var BasePanel = (function (_super) {
    __extends(BasePanel, _super);
    function BasePanel() {
        var _this = _super.call(this) || this;
        /**面板名 */
        _this.panelName = "";
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        return _this;
    }
    /**添加到舞台时在PanelManager中调用
     *@param data 传递参数
     */
    BasePanel.prototype.onEnable = function (data) {
        if (data === void 0) { data = null; }
    };
    /**从舞台移除时在PanelManager中调用*/
    BasePanel.prototype.onRemove = function () {
    };
    /**播放弹框入场动画 */
    BasePanel.prototype.playEnterAnim = function () {
        if (this.contentGroup) {
            egret.Tween.get(this.contentGroup).set({ scaleX: 0, scaleY: 0 }).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        }
    };
    /**销毁 */
    BasePanel.prototype.onDestroy = function () {
        egret.Tween.removeTweens(this);
    };
    return BasePanel;
}(eui.Component));
__reflect(BasePanel.prototype, "BasePanel");
