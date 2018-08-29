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
 * 资源加载
 * @description 1.单个或多个资源组加载
 *              2.配置文件加载
 *              3.版本号配置
 * @author chenkai
 *
 * @example
 * //添加配置文件，并加载配置文件
 * App.ResUtils.addConfig("resource/default.res.json", "resource/");
 * App.ResUtils.loadConfig(this.onConfigComplete, this);
 *
 * //加载单个资源组
 * App.ResUtils.loadGroup("preload", this.onComplete,this.onProgress, this);
 *
 * //加载多个资源组
 * App.ResUtils.loadGroups("newGroupName",["preload","home"],this.onComplete,this.onProgress, this);
 */
var ResUtils = (function (_super) {
    __extends(ResUtils, _super);
    /**
     * 构造函数
     */
    function ResUtils() {
        var _this = _super.call(this) || this;
        _this.initVersion();
        _this.groupMap = {};
        _this.configs = new Array();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, _this.onResourceLoadComplete, _this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, _this.onResourceLoadProgress, _this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, _this.onResourceLoadError, _this);
        return _this;
    }
    /**
     * 初始化版本号
     */
    ResUtils.prototype.initVersion = function () {
        // var version = window["version"];
        // if(version == null){
        //     console.warn("version not init");
        //     return;
        // }
        // console.log("版本号:",version);
        // RES.web.Html5VersionController.prototype.getVirtualUrl = function(url) {
        //     if(url.indexOf("?") == -1) {
        //         url += "?v=" + version;
        //     } else {
        //         url += "&v=" + version;
        //     }
        //     return url;
        // }
    };
    /**
     * 添加一个配置文件
     * @param jsonPath resource.json路径
     * @param filePath 访问资源路径
     */
    ResUtils.prototype.addConfig = function (jsonPath, filePath) {
        this.configs.push([jsonPath, filePath]);
    };
    /**
     * 开始加载配置文件
     * @param onConfigComplete 加载完成执行函数
     * @param onConfigCompleteTarget 加载完成执行函数所属对象
     */
    ResUtils.prototype.loadConfig = function (onConfigComplete, onConfigCompleteTarget) {
        this.onConfigComplete = onConfigComplete;
        this.onConfigCompleteTarget = onConfigCompleteTarget;
        this.loadNextConfig();
    };
    /**
     * 加载
     */
    ResUtils.prototype.loadNextConfig = function () {
        //加载完成
        if (this.configs.length == 0) {
            this.onConfigComplete.call(this.onConfigCompleteTarget);
            this.onConfigComplete = null;
            this.onConfigCompleteTarget = null;
            return;
        }
        var arr = this.configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        RES.loadConfig(arr[0], arr[1]);
    };
    /**
     * 加载完成
     * @param event
     */
    ResUtils.prototype.onConfigCompleteHandle = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.loadNextConfig();
    };
    /**
     * 加载资源组
     * @group     支持单个或多个资源组加载。例如单个资源组 group = "Preload"，多个资源组group = ["Preload", "Game"]
     * @onProgress 加载进度回调
     * @onComplete 加载完成回调
     * @thisObject 回调执行对象
     */
    ResUtils.prototype.loadGroup = function (group, onProgress, onComplete, thisObject) {
        if (onProgress === void 0) { onProgress = null; }
        if (onComplete === void 0) { onComplete = null; }
        if (thisObject === void 0) { thisObject = null; }
        var groupName = this.combGroupName(group);
        if (thisObject != null && (onComplete != null || onProgress != null)) {
            this.groupMap[groupName] = [onComplete, onProgress, thisObject];
        }
        RES.loadGroup(groupName);
    };
    /**
     * 资源组是否已加载
     */
    ResUtils.prototype.isGroupLoaded = function (groupName) {
        return RES.isGroupLoaded(groupName);
    };
    /**
     * 资源组加载完成
     */
    ResUtils.prototype.onResourceLoadComplete = function (event) {
        var groupName = event.groupName;
        console.log("ResUtils >> 加载资源组完成:" + groupName);
        if (this.groupMap[groupName]) {
            var loadComplete = this.groupMap[groupName][0];
            var loadCompleteTarget = this.groupMap[groupName][2];
            if (loadComplete != null && loadCompleteTarget != null) {
                loadComplete.call(loadCompleteTarget);
            }
            this.groupMap[groupName] = null;
            delete this.groupMap[groupName];
        }
    };
    /**
     * 资源组加载进度
     */
    ResUtils.prototype.onResourceLoadProgress = function (event) {
        var groupName = event.groupName;
        if (this.groupMap[groupName]) {
            var loadProgress = this.groupMap[groupName][1];
            var loadProgressTarget = this.groupMap[groupName][2];
            if (loadProgress != null && loadProgressTarget != null) {
                loadProgress.call(loadProgressTarget, event);
            }
        }
    };
    /**
     * 资源组加载失败
     */
    ResUtils.prototype.onResourceLoadError = function (event) {
        console.error("ResUtils >> 加载资源组错误:" + event.groupName);
        this.onResourceLoadComplete(event);
    };
    /**
     * 拼接资源组名
     * @group 资源数组
     * @return 资源组名
     */
    ResUtils.prototype.combGroupName = function (group) {
        var groupName = "";
        if (typeof (group) == "string") {
            groupName = group;
        }
        else {
            var len = group.length;
            for (var i = 0; i < len; i++) {
                groupName += group[i];
            }
            RES.createGroup(groupName, group);
        }
        return groupName;
    };
    /**清理加载回调*/
    ResUtils.prototype.clearAllCallBack = function () {
        for (var key in this.groupMap) {
            this.groupMap[key] = null;
            delete this.groupMap[key];
        }
    };
    return ResUtils;
}(SingleClass));
__reflect(ResUtils.prototype, "ResUtils");
