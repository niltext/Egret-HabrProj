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
 * 增益计
 * @author chenkai 2018/8/9
 */
var EffectMeterUI = (function (_super) {
    __extends(EffectMeterUI, _super);
    function EffectMeterUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "EffectBufferUISkin";
        return _this;
    }
    EffectMeterUI.prototype.childrenCreated = function () {
        this.proBar.mask = this.proMask;
        this.setMaxIcon(false);
    };
    //设置进度条 0-100
    EffectMeterUI.prototype.setProgress = function (value) {
        this.proMask.scaleY = value;
    };
    //增益计每帧渲染
    EffectMeterUI.prototype.workRender = function () {
        //每帧降低效率
        App.DataCenter.meterInfo.reduceEffect();
        //更新进度条
        this.setProgress(App.DataCenter.meterInfo.curMeterValue / App.DataCenter.meterInfo.maxMeterValue);
    };
    //设置最大值icon显示
    EffectMeterUI.prototype.setMaxIcon = function (value) {
        this.maxIcon.visible = value;
    };
    return EffectMeterUI;
}(eui.Component));
__reflect(EffectMeterUI.prototype, "EffectMeterUI");
