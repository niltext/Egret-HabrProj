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
 * 舞台管理类
 * @author chenkai 2016/12/23
 */
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    function StageUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StageUtils.prototype, "stageWidth", {
        /**舞台宽度*/
        get: function () {
            return this.stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageUtils.prototype, "stageHeight", {
        /**舞台高度*/
        get: function () {
            return this.stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    /**改变背景颜色 颜色值:"#FFFFFF" */
    StageUtils.prototype.changeBgColor = function (color) {
        document.body.style.backgroundColor = color;
    };
    //横屏游戏部分无法合适适配的机型，使用showAll
    //全面屏    2:1   2160:1080 
    //主流机型  16:9  1920x1080 
    //ipad     4:3   2048x1536  
    //注：华为虚拟键盘、 h5微信或浏览器有黑边会占一定比例
    //   根据手机截图测试，电量栏72像素  微信黑边142像素  华为虚拟键盘108像素 72+142+108=322
    StageUtils.prototype.someScreenShowAll = function () {
        var rate = egret.Capabilities.boundingClientWidth / egret.Capabilities.boundingClientHeight;
        if (rate < 1520 / 1080 || rate > 1920 / 1080) {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
    };
    return StageUtils;
}(SingleClass));
__reflect(StageUtils.prototype, "StageUtils");
