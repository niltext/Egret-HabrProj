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
 * 事件管理类
 * 一个全局的Event类
 * @author chenkai 2016/8/30
 */
var EventMananger = (function (_super) {
    __extends(EventMananger, _super);
    function EventMananger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**事件列表*/
        _this.eventList = {};
        return _this;
    }
    /**
     * 发送事件
     * @type 事件类型
     * @args 携带数据
     */
    EventMananger.prototype.sendEvent = function (type, data) {
        if (data === void 0) { data = null; }
        var arr = this.eventList[type];
        if (arr != null) {
            var len = arr.length;
            var listen;
            var thisObject;
            for (var i = 0; i < len; i++) {
                var msg = arr[i];
                listen = msg[0];
                thisObject = msg[1];
                listen.call(thisObject, data);
            }
        }
    };
    /**
     * 监听事件
     * @type 事件类型
     * @listener 回调函数
     * @thisObject 回调执行对象
     */
    EventMananger.prototype.addEvent = function (type, listener, thisObject) {
        var arr = this.eventList[type];
        if (arr == null) {
            arr = [];
            this.eventList[type] = arr;
        }
        else {
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                if (arr[i][0] == listener && arr[i][1] == thisObject) {
                    return;
                }
            }
        }
        arr.push([listener, thisObject]);
    };
    /**
     * 移除事件
     * @type 事件类型
     * @listener 回调函数
     * @thisObject 回调执行对象
     */
    EventMananger.prototype.removeEvent = function (type, listener, thisObject) {
        var arr = this.eventList[type];
        if (arr != null) {
            var len = arr.length;
            for (var i = len - 1; i >= 0; i--) {
                if (arr[i][0] == listener && arr[i][1] == thisObject) {
                    arr.splice(i, 1);
                }
            }
        }
        if (arr && arr.length == 0) {
            this.eventList[type] = null;
            delete this.eventList[type];
        }
    };
    /**移除所有事件 */
    EventMananger.prototype.removeAllEvent = function () {
        for (var key in this.eventList) {
            var arr = this.eventList[key];
            if (arr != null) {
                var len = arr.length;
                for (var i = 0; i < len; i++) {
                    arr[i].length = 0;
                }
                arr.length = 0;
                this.eventList[key] = null;
                delete this.eventList[key];
            }
        }
    };
    return EventMananger;
}(SingleClass));
__reflect(EventMananger.prototype, "EventMananger");
