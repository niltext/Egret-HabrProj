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
 * 工人
 * @author chenkai 2018/8/20
 */
var WorkMan = (function (_super) {
    __extends(WorkMan, _super);
    function WorkMan() {
        var _this = _super.call(this) || this;
        _this.initBinary("gongchangren", "gongchangren");
        return _this;
    }
    //播放工作
    WorkMan.prototype.playWork = function () {
        this.armatureDisplay.animation.gotoAndPlayByTime("work", 0.5, -1);
    };
    //播放工作完成
    WorkMan.prototype.playWorkPush = function () {
        this.playAction("work_push", 1);
    };
    //播放睡眠
    WorkMan.prototype.playSleep = function () {
        this.playAction("sleep", -1);
    };
    //设置播放速率
    WorkMan.prototype.setTimeScale = function (value) {
        this.armatureDisplay.animation.timeScale = value;
    };
    return WorkMan;
}(BaseBone));
__reflect(WorkMan.prototype, "WorkMan");
