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
 * Http请求类 (只能序列发送，不能并列发送多条)
 * @description 序列发送http请求
 * @author chenkai  2016/12/18
 * @example
 * doPost("http://xxxxx", {head:"login",account:"chenkai"}, this.revLogin, this);
 * doGet("http:///xxxxx?a=1", this.reLogin, this);
 */
var Http = (function (_super) {
    __extends(Http, _super);
    function Http() {
        var _this = _super.call(this) || this;
        /**发送缓存*/
        _this.cacheList = [];
        /**请求状态*/
        _this.requesting = false;
        _this.request = new egret.HttpRequest();
        _this.request.responseType = egret.HttpResponseType.TEXT;
        _this.request.addEventListener(egret.Event.COMPLETE, _this.onSendComplete, _this);
        _this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, _this.onSendIOError, _this);
        return _this;
    }
    /**
     * POST请求
     * @url 访问地址
     * @json 消息字符串 (json格式)
     * @cb 回调
     * @thisObj 回调执行对象
     * @bMask 是否遮罩
     */
    Http.prototype.doPost = function (url, json, cb, thisObj, bMask) {
        if (bMask === void 0) { bMask = true; }
        this.send(url, json, cb, thisObj, egret.HttpMethod.POST, bMask);
    };
    /**
     * Get请求
     * @url 访问地址
     * @cb 回调
     * @thisObj 回调执行对象
     * @bMask 是否遮罩
     */
    Http.prototype.doGet = function (url, cb, thisObj, bMask) {
        if (bMask === void 0) { bMask = true; }
        this.send(url, null, cb, thisObj, egret.HttpMethod.GET, bMask);
    };
    /**
     * 发送
     * @url 访问地址
     * @json 消息字符串 (json格式)
     * @callBack 回调
     * @thisObject 回调执行对象
     * @httpMethod 请求方式
     * @bMask 是否遮罩
     */
    Http.prototype.send = function (url, json, cb, thisObj, httpMethod, bMask) {
        if (bMask === void 0) { bMask = true; }
        url = ProtoUrl.preUrl + url;
        //保存请求数据
        this.cacheList.push({ json: json, cb: cb, obj: thisObj, url: url, httpMethod: httpMethod, bMask: bMask });
        //请求数据
        this.next();
    };
    /**发送下一条*/
    Http.prototype.next = function () {
        //当前正在发送时，需要等待
        if (this.requesting) {
            return;
        }
        //全部发送完成，停止发送
        if (this.cacheList.length == 0) {
            this.hideLoadAnim();
            return;
        }
        //获取数组第一条待发送包
        this.curSend = this.cacheList.shift();
        //显示加载动画
        this.curSend.bMask && this.showLoadAnim();
        //发送数据
        this.request.open(this.curSend.url, this.curSend.httpMethod);
        //设置编码 JSON:application/json  application/x-www-form-urlencoded
        this.request.setRequestHeader("Content-type", "application/json");
        //根据POST和GET方式，选择是否发送msg数据
        if (this.curSend.httpMethod == egret.HttpMethod.POST) {
            console.log("Http >> 发送POST请求:", this.curSend.url, JSON.stringify(this.curSend.json));
            this.request.send(JSON.stringify(this.curSend.json));
        }
        else {
            console.log("Http >> 发送GET请求:", this.curSend.url);
            this.request.send();
        }
        //设置发送状态
        this.requesting = true;
    };
    /**发送完成*/
    Http.prototype.onSendComplete = function (e) {
        console.log("Http >> 返回:", JSON.parse(this.request.response));
        //隐藏遮罩
        this.curSend.bMask && this.hideLoadAnim();
        //执行回调
        if (this.curSend.cb && this.curSend.obj) {
            var cb = this.curSend.cb;
            var obj = this.curSend.obj;
            cb.call(obj, JSON.parse(this.request.response));
        }
        //重置数据
        this.curSend = null;
        this.requesting = false;
        //发送下一条
        this.next();
    };
    /**发送失败*/
    Http.prototype.onSendIOError = function (e) {
        console.error("Http send error");
        this.requesting = false;
        this.hideLoadAnim();
        App.EventManager.sendEvent(EventConst.HTTP_ERROR);
        App.Tips.showMsg("网络请求失败");
    };
    /**发送失败时，继续发送失败的请求 */
    Http.prototype.resume = function () {
        this.cacheList.push(this.curSend);
        this.next();
    };
    /**删除所有请求*/
    Http.prototype.clearAllRequest = function () {
        this.request.abort();
        this.curSend = null;
        this.cacheList.length = 0;
        this.hideLoadAnim();
    };
    /**显示加载等待动画 */
    Http.prototype.showLoadAnim = function () {
        App.ScreeLock.lock();
        egret.Tween.get(this).wait(2000).call(function () {
            platform.showLoading("网络请求中", false);
        }, this);
    };
    /**隐藏加载等待动画 */
    Http.prototype.hideLoadAnim = function () {
        App.ScreeLock.unLock();
        platform.hideLoading();
        egret.Tween.removeTweens(this);
    };
    return Http;
}(SingleClass));
__reflect(Http.prototype, "Http");
