var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 增益计信息
 * @author chenkai 2018/8/9
 */
var MeterInfo = (function () {
    function MeterInfo() {
        this.clickStep = 0; //每一次点击增益计增加的数值
        this.holdStep = 0; //按住不动得增益增加数值
        this.reduceStep = 0; //每一帧减少的值
        this.maxMeterValue = 0; //增益计的最大值
        this.FastestValue = 0; //最快速度，当max状态时最高速度
        this.curMeterValue = 0; //增益计的值
        this.state = MeterState.Normal; //增益计状态
        this.bHolding = false; //是否长按状态
        this.clickReduceTime = 0; //每一次点击减少的制造时间，单位S
        this.config = {}; //配置文件
    }
    MeterInfo.prototype.saveConfig = function (data) {
        this.clickStep = data.clickStep;
        this.holdStep = data.holdStep;
        this.reduceStep = data.reduceStep;
        this.maxMeterValue = data.maxMeterValue;
        this.FastestValue = data.FastestValue;
        this.clickReduceTime = data.clickReduceTime;
    };
    //改变增益计状态
    MeterInfo.prototype.changeState = function (state) {
        this.state = state;
        App.EventManager.sendEvent(EventConst.METER_STATE, this.state);
    };
    //点击舞台，增加效率
    MeterInfo.prototype.clickAddEffect = function (addStep) {
        //增加效率
        var maxMeterValue = App.DataCenter.meterInfo.maxMeterValue;
        if (this.curMeterValue < maxMeterValue) {
            this.curMeterValue += addStep;
            if (this.curMeterValue > maxMeterValue) {
                this.curMeterValue = maxMeterValue;
                //最大值时，MAX状态
                this.changeState(MeterState.MAX);
            }
        }
    };
    //降低效率
    MeterInfo.prototype.reduceEffect = function () {
        if (this.bHolding) {
            return;
        }
        if (this.curMeterValue > 0) {
            this.curMeterValue -= App.DataCenter.meterInfo.reduceStep;
        }
        else {
            //降低到零时
            this.curMeterValue = 0;
            //如果是强化状态，则进入睡眠
            if (this.state == MeterState.MAX) {
                this.changeState(MeterState.Sleep);
            }
        }
    };
    return MeterInfo;
}());
__reflect(MeterInfo.prototype, "MeterInfo");
/**增益计状态 */
var MeterState;
(function (MeterState) {
    MeterState[MeterState["Normal"] = 0] = "Normal";
    MeterState[MeterState["MAX"] = 1] = "MAX";
    MeterState[MeterState["Sleep"] = 2] = "Sleep"; //休眠
})(MeterState || (MeterState = {}));
