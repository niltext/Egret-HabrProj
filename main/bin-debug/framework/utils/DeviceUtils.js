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
 * 设备工具类
 * @author chenkai  2016/12/18
 */
var DeviceUtils = (function (_super) {
    __extends(DeviceUtils, _super);
    function DeviceUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DeviceUtils.prototype, "IsNative", {
        /**是否Native*/
        get: function () {
            return (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsWeb", {
        /**是否Web*/
        get: function () {
            return (egret.Capabilities.runtimeType == egret.RuntimeType.WEB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsMobile", {
        /**是否移动端*/
        get: function () {
            return egret.Capabilities.isMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsPC", {
        /**是否PC端*/
        get: function () {
            return !egret.Capabilities.isMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsAndroid", {
        /**是否Android系统*/
        get: function () {
            return egret.Capabilities.os == "Android";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsIos", {
        /**是否ios系统*/
        get: function () {
            return egret.Capabilities.os == "iOS";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsiPad", {
        /**是否iPad */
        get: function () {
            if (navigator.userAgent.indexOf("iPad") > -1) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "isWx", {
        /**是否在微信浏览器中打开*/
        get: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (/micromessenger/.test(ua)) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsiPhoneX", {
        /**判断是否ipx，当高宽比大于2时，都认为是全面屏刘海机 */
        get: function () {
            if (App.StageUtils.stageHeight / App.StageUtils.stageWidth > 2) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return DeviceUtils;
}(SingleClass));
__reflect(DeviceUtils.prototype, "DeviceUtils");
