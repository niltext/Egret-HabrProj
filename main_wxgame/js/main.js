var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 骨骼动画基类
 * @description 封装了factory创建部分，复用节约代码
 * @author chenkai  2017/11/15
 * @example
 * 1. 子类继承 Bone extends BaseBone
 * 2. let bone:Bone = new Bone();
 *    bone.initJson("a_ske_json","a_tex_json","a_tex_png","a");
 *    bone.playAction("stand");
 */
var BaseBone = (function (_super) {
    __extends(BaseBone, _super);
    function BaseBone() {
        return _super.call(this) || this;
    }
    /**
     * 初始化Json骨骼
     */
    BaseBone.prototype.initJson = function (boneName, name) {
        var factory = dragonBones.EgretFactory.factory;
        var dragonbonesData = RES.getRes(boneName + "_ske_json");
        var textureData = RES.getRes(boneName + "_tex_json");
        var texture = RES.getRes(boneName + "_tex_png");
        factory.parseDragonBonesData(dragonbonesData);
        factory.parseTextureAtlasData(textureData, texture);
        this.armatureDisplay = factory.buildArmatureDisplay(name);
        this.addChild(this.armatureDisplay);
    };
    //二进制格式
    BaseBone.prototype.initBinary = function (boneName, name) {
        var factory = dragonBones.EgretFactory.factory;
        factory.parseDragonBonesData(RES.getRes(boneName + "_ske_dbbin"));
        factory.parseTextureAtlasData(RES.getRes(boneName + "_tex_json"), RES.getRes(boneName + "_tex_png"));
        this.armatureDisplay = factory.buildArmatureDisplay(name);
        this.addChild(this.armatureDisplay);
    };
    /**
     * 播放动作
     * @param action  动作名
     * @param playTimes 播放次数
     */
    BaseBone.prototype.playAction = function (action, playTimes) {
        if (playTimes === void 0) { playTimes = 1; }
        if (this.armatureDisplay) {
            this.armatureDisplay.animation.play(action, playTimes);
        }
    };
    /**
     * 替换插槽
     * @param slotName 插槽名称 原材料
     * @param textureName 图片名  xxx_png
     * @param 偏移量
     */
    BaseBone.prototype.setNewSlot = function (slotName, textureName, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var slot = this.armatureDisplay.armature.getSlot(slotName);
        var b = new egret.Bitmap();
        b.texture = RES.getRes(textureName);
        b.x = slot.display.x;
        b.y = slot.display.y;
        b.anchorOffsetX = b.width / 2 + offsetX;
        b.anchorOffsetY = b.height / 2 + offsetY;
        slot.setDisplay(b);
    };
    /**
     * 销毁
     */
    BaseBone.prototype.destoryMe = function () {
        if (this.armatureDisplay) {
            this.armatureDisplay.animation.reset();
            this.armatureDisplay.dispose();
            this.armatureDisplay = null;
        }
    };
    return BaseBone;
}(egret.DisplayObjectContainer));
__reflect(BaseBone.prototype, "BaseBone");
/**
 * 场景
 * @description 用于登录、大厅、游戏等场景界面
 * @author chenkai 2016/12/18
 */
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        var _this = _super.call(this) || this;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        return _this;
    }
    /**显示到舞台
     *@param data 传递参数
     */
    BaseScene.prototype.onEnable = function (data) {
        if (data === void 0) { data = null; }
    };
    /**从舞台移除*/
    BaseScene.prototype.onRemove = function () {
    };
    /**销毁 */
    BaseScene.prototype.dispose = function () {
    };
    /**
     * 监听事件
     * @param type 事件类型
     * @param listener 回调函数
     * @param thisObject 回调执行对象
     */
    BaseScene.prototype.addEvent = function (type, listener, thisObject) {
        App.EventManager.addEvent(type, listener, thisObject);
    };
    /**
     * 移除事件
     * @param type 事件类型
     * @param listener 回调函数
     * @param thisObject 回调执行对象
     */
    BaseScene.prototype.removeEvent = function (type, listener, thisObject) {
        App.EventManager.removeEvent(type, listener, thisObject);
    };
    return BaseScene;
}(eui.Component));
__reflect(BaseScene.prototype, "BaseScene");
/*  复制粘贴用
    protected childrenCreated(){
        super.childrenCreated();
        
    }

    public onEnable(){
        super.onEnable();

    }

    public onRemove(){
        super.onRemove();

    }

    public onDestroy(){
        super.onDestroy();

    }

 */ 
/**
* 单例基类。
* @description 方便的继承单例基类即可实现单例，但是getInstance方法返回的是any，无法直接使用"."访问属性或方法。
* @author chenkai 2017/3/16
*/
var SingleClass = (function () {
    function SingleClass() {
    }
    /**
     * 获取一个单例(支持<=3个参数)
     * @returns 单例
     */
    SingleClass.getInstance = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var Class = this;
        if (!Class._instance) {
            var argsLen = args.length;
            if (argsLen == 0) {
                Class._instance = new Class();
            }
            else if (argsLen == 1) {
                Class._instance = new Class(args[0]);
            }
            else if (argsLen == 2) {
                Class._instance = new Class(args[0], args[1]);
            }
            else if (argsLen == 3) {
                Class._instance = new Class(args[0], args[1], args[2]);
            }
        }
        return Class._instance;
    };
    return SingleClass;
}());
__reflect(SingleClass.prototype, "SingleClass");
/**
 * 工作台基类
 * @author chenkai 2018/8/8
 */
var BaseDesk = (function (_super) {
    __extends(BaseDesk, _super);
    function BaseDesk() {
        var _this = _super.call(this) || this;
        _this.id = 0; //桌子id
        _this.workbenchNo = 0; //桌子编号
        _this.type = 0; //桌子类型 0空的工作台 1运转中工作台
        _this.touchChildren = false;
        return _this;
    }
    BaseDesk.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return BaseDesk;
}(eui.Component));
__reflect(BaseDesk.prototype, "BaseDesk");
/**
 * 声音常量
 * @author chenkai 2017/3/16
 */
var SoundConst = (function () {
    function SoundConst() {
    }
    SoundConst.BGM = "bgm_mp3"; //背景音乐
    return SoundConst;
}());
__reflect(SoundConst.prototype, "SoundConst");
/**
 * 影片剪辑基类
 * @description 将factory工厂代码封装，复用创建代码
 * @author chenkai 2017/10/16
 *
 * @example
 * 1. 子类继承  MC extends BaseMovieClip
 * 2. let mc:MCA = new MC();
 *    mc.play(-1);
 */
var BaseMovieClip = (function (_super) {
    __extends(BaseMovieClip, _super);
    /**
     * 初始化
     * @param dataKey json配置文件
     * @param textureKey png纹理集
     * @param movieClipName 影片剪辑名
     */
    function BaseMovieClip(dataKey, textureKey, movieClipName) {
        var _this = _super.call(this) || this;
        var data = RES.getRes(dataKey);
        var texture = RES.getRes(textureKey);
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        _this.movieClipData = mcDataFactory.generateMovieClipData(movieClipName);
        return _this;
    }
    /**隐藏 */
    BaseMovieClip.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    /**销毁 */
    BaseMovieClip.prototype.destoryMe = function () {
        this.stop();
        this.hide();
    };
    return BaseMovieClip;
}(egret.MovieClip));
__reflect(BaseMovieClip.prototype, "BaseMovieClip");
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
    BasePanel.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
    };
    return BasePanel;
}(eui.Component));
__reflect(BasePanel.prototype, "BasePanel");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                onResGet(data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
/**
 * UI基类
 * @description 普通UI基类，主要用于scene或panel内的ui组件
 * @author chenkai 2017/11/16
 */
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onEnable, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        return _this;
    }
    /**添加到场景中*/
    BaseUI.prototype.onEnable = function () {
    };
    /**从场景中移除*/
    BaseUI.prototype.onRemove = function () {
    };
    /**隐藏*/
    BaseUI.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    /**销毁*/
    BaseUI.prototype.onDestory = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onEnable, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return BaseUI;
}(eui.Component));
__reflect(BaseUI.prototype, "BaseUI");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    //加载预加载资源
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //加载preload资源
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //加载皮肤资源
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    //创建场景界面
    Main.prototype.createGameScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //启动游戏
                App.getInstance().registerCommand(CMDConst.START_UP, StartupCommand);
                App.getInstance().sendNotification(CMDConst.START_UP, this.stage);
                App.getInstance().removeCommand(CMDConst.START_UP);
                return [2 /*return*/];
            });
        });
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
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
/**
 * 屏幕锁定
 * 使用一个全屏的rect遮挡舞台
 * @author chenkai 2018/8/24
 */
var ScreenLock = (function (_super) {
    __extends(ScreenLock, _super);
    function ScreenLock() {
        var _this = _super.call(this) || this;
        _this.rect = new eui.Rect();
        _this.rect.width = App.StageUtils.stage.width;
        _this.rect.height = App.StageUtils.stage.height;
        _this.rect.alpha = 0;
        return _this;
    }
    ScreenLock.prototype.lock = function () {
        App.LayerManager.lockLayer.addChild(this.rect);
    };
    ScreenLock.prototype.unLock = function () {
        this.rect.parent && this.rect.parent.removeChild(this.rect);
    };
    return ScreenLock;
}(SingleClass));
__reflect(ScreenLock.prototype, "ScreenLock");
/**
 * 微信平台
 * @author chenkai 2018/7/25
 */
var WxPlatform = (function () {
    function WxPlatform() {
    }
    //=================================================
    //==================  用户信息    ==================
    //=================================================
    /**登陆 */
    WxPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.login({
                            success: function (res) {
                                console.log("WxPlatform >> login success:", res);
                                resolve(res);
                            },
                            fail: function (res) {
                                console.log("WxPlatform >> login fail:", res);
                                reject();
                            },
                            complete: function (res) {
                            }
                        });
                    })];
            });
        });
    };
    /**获取用户信息 */
    WxPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.getUserInfo({
                            withCredentials: true,
                            success: function (res) {
                                console.log("WxPlatform >> getUserInfo success:", res);
                                resolve(res);
                            },
                            fail: function (res) {
                                console.log("WxPlatform >> getUserInfo fail:", res);
                                reject();
                            },
                            complete: function (res) {
                            }
                        });
                    })];
            });
        });
    };
    //=================================================
    //=====================  广告    ==================
    //=================================================
    /**创建激励视频广告 */
    WxPlatform.prototype.createRewardedVideoAd = function () {
        return new Promise(function (resolve, reject) {
            //创建广告
            var rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: 'xxxx' });
            //播放广告。如果失败，则重新拉取一次
            rewardedVideoAd.show()
                .catch(function (err) {
                rewardedVideoAd.load()
                    .then(function () { return rewardedVideoAd.show(); });
            });
            //广告关闭
            rewardedVideoAd.onClose(function (res) {
                // 用户点击了【关闭广告】按钮，小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    resolve();
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    reject();
                }
            });
        });
    };
    //=================================================
    //================  开放数据域    ==================
    //=================================================
    /**
     * 向开放数据域发送消息
     * @param obj  {cmd:value1, key1:value1, ...}
    */
    WxPlatform.prototype.postMessage = function (obj) {
        var openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage({
            data: obj
        });
    };
    /**保存用户数据 */
    WxPlatform.prototype.setUserCloudStorage = function (KVDataList) {
        return new Promise(function (resolve, reject) {
            wx.setUserCloudStorage({
                KVDataList: KVDataList,
                success: function (res) {
                    console.log("WxPlatform >> setUserCloudStorage success:", res);
                    resolve();
                },
                fail: function (res) {
                },
                complete: function (res) {
                }
            });
        });
    };
    //=================================================
    //======================  分享    ==================
    //=================================================
    /**主动拉起分享  query格式必须是 key1=val1&key2=val2 的格式*/
    WxPlatform.prototype.shareAppMessage = function (title, imgeUrl, query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.shareAppMessage({
                            title: title,
                            imageUrl: imgeUrl,
                            query: query,
                            success: function (res) {
                                console.log("WxPlatform >> shareAppMessage success:", res);
                                resolve(res);
                            },
                            fail: function (res) {
                                console.log("WxPlatform >> shareAppMessage fail");
                            },
                            complete: function (res) {
                                console.log("WxPlatform >> shareAppMessage complete");
                            }
                        });
                    })];
            });
        });
    };
    /**更新转发属性 */
    WxPlatform.prototype.updateShareMenu = function () {
        return new Promise(function (resolve, reject) {
            wx.updateShareMenu({
                withShareTicket: true,
                success: function (res) {
                    console.log("WxPlatform >> 更新转发属性成功", res);
                },
                fail: function (res) {
                },
                complete: function (res) {
                }
            });
        });
    };
    /**预览图片，用于更多游戏 */
    WxPlatform.prototype.previewImage = function (imgUrl) {
        return new Promise(function (resolve, reject) {
            wx.previewImage({
                urls: [imgUrl]
            });
        });
    };
    /**保存图片到相册 */
    WxPlatform.prototype.toTempFilePath = function (x, y, w, h, dw, dh) {
        return __awaiter(this, void 0, void 0, function () {
            var systemInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSystemInfo()];
                    case 1:
                        systemInfo = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var xRate = systemInfo.windowWidth * systemInfo.pixelRatio / App.StageUtils.stageWidth;
                                var yRate = systemInfo.windowHeight * systemInfo.pixelRatio / App.StageUtils.stageHeight;
                                x = x * xRate;
                                y = y * yRate;
                                w = w * xRate;
                                h = h * yRate;
                                canvas.toTempFilePath({
                                    x: x,
                                    y: y,
                                    width: w,
                                    height: h,
                                    destWidth: w,
                                    destHeight: h,
                                    success: function (res) {
                                        console.log("WxPlatform >> toTempFilePath success:", res.tempFilePath);
                                        resolve(res.tempFilePath);
                                    },
                                    faile: function (res) {
                                        console.log("WxPlatform >> toTempFilePath fail:");
                                    }
                                });
                            })];
                }
            });
        });
    };
    /**保存图片到相册 */
    WxPlatform.prototype.saveImageToPhotosAlbum = function (filePath) {
        return new Promise(function (resolve, reject) {
            wx.saveImageToPhotosAlbum({ filePath: filePath,
                success: function (res) {
                    console.log("WxPlatform >> saveImageToPhotosAlbum success");
                },
                fail: function (res) {
                    console.log("WxPlatform >> saveImageToPhotosAlbum fail");
                },
                complete: function (res) {
                }
            });
        });
    };
    //=================================================
    //==================   系统    ====================
    //=================================================
    //获取设备信息
    WxPlatform.prototype.getSystemInfo = function () {
        return new Promise(function (resolve, reject) {
            wx.getSystemInfo({
                success: function (res) {
                    console.log("WxPlatform >> getSystemInfo:", res);
                    resolve(res);
                }
            });
        });
    };
    //设置调试信息
    WxPlatform.prototype.setEnableDebug = function () {
        return new Promise(function (resolve, reject) {
            wx.setEnableDebug({
                enableDebug: true,
                success: function (res) {
                },
                fail: function (res) {
                }, complete: function (res) {
                }
            });
        });
    };
    //检查是否授权
    WxPlatform.prototype.getSetting = function () {
        return new Promise(function (resolve, reject) {
            wx.getSetting({ success: function (res) {
                    console.log("Platform >> getSetting:", res);
                    //未授权
                    if (res.authSetting == null || res.authSetting["scope.userInfo"] == null || res.authSetting["scope.userInfo"] == false) {
                        reject();
                        //已授权
                    }
                    else {
                        resolve();
                    }
                }, fail: function (res) {
                    console.log("Platform >> getSetting fail");
                    reject();
                }, complete: function (res) {
                    console.log("Platform >> getSetting complete");
                } });
        });
    };
    //创建授权按钮  
    WxPlatform.prototype.createUserInfoButton = function (imgUrl, btn) {
        var xRate = window.innerWidth / App.StageUtils.stageWidth;
        var yRate = window.innerHeight / App.StageUtils.stageHeight;
        var button = wx.createUserInfoButton({
            type: 'image',
            image: imgUrl,
            style: {
                left: btn.x * xRate,
                top: btn.y * yRate,
                width: btn.width * xRate,
                height: btn.height * yRate,
            }
        });
        return button;
        /* 显示、点击和销毁示例
        button.show();
        button.onTap((res)=>{
            console.log(res);
            if(res.errMsg == "getUserInfo:ok"){
                button.hide();
                button.destroy();
            }
        });
        */
    };
    //=================================================
    //==================   其他通用    ================
    //=================================================
    /**客服 */
    WxPlatform.prototype.openCustomerServiceConversation = function () {
        return new Promise(function (resolve, reject) {
            wx.openCustomerServiceConversation({
                success: function (res) {
                    console.log("WxPlatform >> customerService success:", res);
                },
                fail: function (res) {
                    console.log("WxPlatform >> customerService fail:", res);
                },
                complete: function (res) {
                    console.log("WxPlatform >> customerService complete:", res);
                }
            });
        });
    };
    /**获取启动参数 */
    WxPlatform.prototype.getLaunchOptionsSync = function () {
        return wx.getLaunchOptionsSync();
    };
    /**创建论坛 */
    WxPlatform.prototype.createGameClubButton = function (x, y, w, h) {
        return wx.createGameClubButton({
            type: "image",
            icon: 'light',
            style: {
                left: x,
                top: y,
                width: w,
                height: h
            }
        });
    };
    /**显示提示 */
    WxPlatform.prototype.showToast = function (title, duration) {
        if (duration === void 0) { duration = 1000; }
        wx.showToast({ title: title, duration: duration });
    };
    /**隐藏提示 */
    WxPlatform.prototype.hideToast = function () {
        wx.hideToast({});
    };
    /**显示loading */
    WxPlatform.prototype.showLoading = function (title, mask) {
        if (mask === void 0) { mask = false; }
        wx.showLoading({ title: title, mask: mask,
            success: function (res) {
            },
            fail: function (res) {
            } });
    };
    /**隐藏loading */
    WxPlatform.prototype.hideLoading = function () {
        wx.hideLoading({});
    };
    /**绘制离屏canvas */
    WxPlatform.prototype.showShareCanvas = function () {
        console.log("绘制离屏Canvas");
        this.bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        this.bitmapdata.$deleteSource = false;
        var texture = new egret.Texture();
        texture._setBitmapData(this.bitmapdata);
        this.bitmap = new egret.Bitmap(texture);
        this.bitmap.width = App.StageUtils.stage.stageWidth;
        this.bitmap.height = App.StageUtils.stage.stageHeight;
        App.LayerManager.topLayer.addChild(this.bitmap);
        egret.startTick(this.webGL, this);
    };
    WxPlatform.prototype.webGL = function (timeStarmp) {
        egret.WebGLUtils.deleteWebGLTexture(this.bitmapdata.webGLTexture);
        this.bitmapdata.webGLTexture = null;
        return false;
    };
    /**隐藏离屏canvas */
    WxPlatform.prototype.hideShareCanvas = function () {
        if (this.bitmap) {
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
            this.bitmap.$bitmapData.$dispose();
            egret.stopTick(this.webGL, this);
        }
    };
    return WxPlatform;
}());
__reflect(WxPlatform.prototype, "WxPlatform", ["Platform"]);
/**
 * 调试
 * @author chenkai 2018/8/2
 */
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    //=================================================
    //==================  用户信息    ==================
    //=================================================
    /**登陆 */
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { code: "test" }];
            });
        });
    };
    /**获取用户信息 */
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {}];
            });
        });
    };
    //=================================================
    //=====================  广告    ==================
    //=================================================
    /**创建激励视频广告 */
    DebugPlatform.prototype.createRewardedVideoAd = function () {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    //=================================================
    //================  开放数据域    ==================
    //=================================================
    /**
     * 向开放数据域发送消息
     * @param obj  {cmd:value1, key1:value1, ...}
    */
    DebugPlatform.prototype.postMessage = function (obj) {
    };
    /**保存用户数据 */
    DebugPlatform.prototype.setUserCloudStorage = function (KVDataList) {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    //=================================================
    //======================  分享    ==================
    //=================================================
    /**主动拉起分享  query格式必须是 key1=val1&key2=val2 的格式*/
    DebugPlatform.prototype.shareAppMessage = function (title, imgeUrl, query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve();
                    })];
            });
        });
    };
    /**更新转发属性 */
    DebugPlatform.prototype.updateShareMenu = function () {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    /**预览图片，用于更多游戏 */
    DebugPlatform.prototype.previewImage = function (imgUrl) {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    /**保存图片到相册 */
    DebugPlatform.prototype.toTempFilePath = function (x, y, w, h, dw, dh) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve();
                    })];
            });
        });
    };
    /**保存图片到相册 */
    DebugPlatform.prototype.saveImageToPhotosAlbum = function (filePath) {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    //=================================================
    //==================   系统    ====================
    //=================================================
    //获取设备信息
    DebugPlatform.prototype.getSystemInfo = function () {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    //设置调试信息
    DebugPlatform.prototype.setEnableDebug = function () {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    //获取设置信息
    DebugPlatform.prototype.getSetting = function () {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    //创建授权按钮
    DebugPlatform.prototype.createUserInfoButton = function (imgUrl, btn) {
        return null;
    };
    //=================================================
    //==================   其他通用    ================
    //=================================================
    /**客服 */
    DebugPlatform.prototype.openCustomerServiceConversation = function () {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    /**获取启动参数 */
    DebugPlatform.prototype.getLaunchOptionsSync = function () {
        return {};
    };
    /**创建论坛 */
    DebugPlatform.prototype.createGameClubButton = function (x, y, w, h) {
        return {};
    };
    /**显示提示 */
    DebugPlatform.prototype.showToast = function (title, duration) {
        if (duration === void 0) { duration = 1000; }
        App.Tips.showMsg(title);
    };
    /**隐藏提示 */
    DebugPlatform.prototype.hideToast = function () {
        wx.hideToast({});
    };
    /**显示loading */
    DebugPlatform.prototype.showLoading = function (title, mask) {
    };
    /**隐藏loading */
    DebugPlatform.prototype.hideLoading = function () {
    };
    //=================================================
    //==================   绘制离屏信息    =============
    //=================================================
    /**绘制离屏canvas */
    DebugPlatform.prototype.showShareCanvas = function () {
    };
    DebugPlatform.prototype.webGL = function (timeStarmp) {
    };
    /**隐藏离屏canvas */
    DebugPlatform.prototype.hideShareCanvas = function () {
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    if (0) {
        window.platform = new DebugPlatform();
    }
    else {
        window.platform = new WxPlatform();
    }
}
/**
 * 圆形进度
 * @author chenkai 2018/8/10
 */
var CircleProgress = (function () {
    /**
     * (anticlockwise, dic)  (false,1)顺时针显示对象  (true,1)顺时针隐藏对象  (true,-1)逆时针显示对象 (false,-1)逆时针隐藏对象
     * @param target 遮罩的对象
     * @param anticlockwise
     * @param dic
     */
    function CircleProgress(target, anticlockwise, dic) {
        this.target = target;
        this.shape = new egret.Shape();
        this.shape.x = this.target.x + this.target.width / 2;
        this.shape.y = this.target.y + this.target.height / 2;
        target.parent && target.parent.addChild(this.shape);
        this.target.mask = this.shape;
        this.anticlockwise = anticlockwise;
        this.dic = dic;
    }
    /**
     * 绘制进度
     * @param value 0-1  进度
     * @param offerAngle 角度偏移值,默认从0度开始画
     */
    CircleProgress.prototype.drawProgress = function (value, offerAngle) {
        if (offerAngle === void 0) { offerAngle = 0; }
        if (value > 1) {
            value = 1;
        }
        var r = Math.max(this.target.width / 2, this.target.height / 2) / 2 * 1.5;
        var startAngle = offerAngle;
        var endAngle = (360 * value + offerAngle) * this.dic;
        this.shape.graphics.clear();
        this.shape.graphics.beginFill(0x00ffff, 1);
        this.shape.graphics.lineTo(r, 0);
        this.shape.graphics.drawArc(0, 0, r, startAngle * Math.PI / 180, endAngle * Math.PI / 180, this.anticlockwise);
        this.shape.graphics.lineTo(0, 0);
        this.shape.graphics.endFill();
    };
    //销毁
    CircleProgress.prototype.destroyMe = function () {
        this.target = null;
    };
    return CircleProgress;
}());
__reflect(CircleProgress.prototype, "CircleProgress");
/**按钮类型 */
var ComBtnType;
(function (ComBtnType) {
    /**普通点击 */
    ComBtnType[ComBtnType["Click"] = 0] = "Click";
    /**关闭、退出*/
    ComBtnType[ComBtnType["Close"] = 1] = "Close";
    /**换页*/
    ComBtnType[ComBtnType["SwitchPage"] = 2] = "SwitchPage";
})(ComBtnType || (ComBtnType = {}));
/**
 * 按钮工具类
 * @description 监听按钮点击事件，统一播放按钮动画和声音
 * @author chenkai  2017/10/14
 * @example
 * CommonBtn.addClick(btn, cb, this, 1);
 * CommonBtn.removeClick(btn, cb, this);
 */
var CommonBtn = (function () {
    function CommonBtn() {
    }
    /**
     * 注册按钮点击事件
     * @param target 按钮
     * @param cb     点击回调
     * @param thisObject 执行对象
     * @param type 声音播放类型
     */
    CommonBtn.addClick = function (target, cb, thisObject, type) {
        if (type === void 0) { type = ComBtnType.Click; }
        var list = this.eventList[target.hashCode + ""];
        if (list == null) {
            list = new Array();
            this.eventList[target.hashCode + ""] = list;
        }
        var len = list.length;
        for (var i = 0; i < len; i++) {
            if (list[i][0] == cb && list[i][1] == thisObject) {
                return;
            }
        }
        var btnClick = new BtnClick(target, cb, thisObject, type);
        list.push([cb, thisObject, btnClick]);
    };
    /**
     * 移除按钮点击事件
     * @param target 按钮
     * @param cb 点击回调
     * @param thisObject 执行对象
     */
    CommonBtn.removeClick = function (target, cb, thisObject) {
        var list = this.eventList[target.hashCode + ""];
        if (list != null) {
            var len = list.length;
            for (var i = len - 1; i >= 0; i--) {
                if (list[i][0] == cb && list[i][1] == thisObject) {
                    var btnClick = list[i][2];
                    btnClick.destoryMe();
                    list[i].length = 0;
                    list.splice(i, 1);
                }
            }
        }
    };
    /**移除所有事件 */
    CommonBtn.removeAllListeners = function () {
        for (var key in this.eventList) {
            var list = this.eventList[key];
            if (list != null) {
                var len = list.length;
                for (var i = 0; i < len; i++) {
                    var btnClick = list[i][2];
                    btnClick.destoryMe();
                    list[i].length = 0;
                }
                list.length = 0;
            }
            delete this.eventList[key];
        }
    };
    //事件列表
    CommonBtn.eventList = {};
    return CommonBtn;
}());
__reflect(CommonBtn.prototype, "CommonBtn");
/**
 * 单个按钮监听类
 */
var BtnClick = (function () {
    /**
     * 初始化
     * @param target 按钮
     * @param cb 回调
     * @param thisObject 回调执行对象
     * @param type 声音类型
     */
    function BtnClick(target, cb, thisObject, type) {
        if (type === void 0) { type = ComBtnType.Click; }
        this.target = target;
        this.cb = cb;
        this.thisObject = thisObject;
        this.type = type;
        this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }
    /**触摸开始，播放声音和扩展动画 */
    BtnClick.prototype.onTouchBegin = function () {
        if (this.target.touchEnabled == false) {
            return;
        }
        App.StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.initAnchorOffset();
        this.playSound();
        this.playOutAnim();
    };
    /**点击，执行回调 */
    BtnClick.prototype.onTouchTap = function () {
        if (this.target.touchEnabled == false) {
            return;
        }
        this.cb.apply(this.thisObject);
    };
    /**触摸释放，播放收缩动画 */
    BtnClick.prototype.onTouchEnd = function () {
        if (this.target.touchEnabled == false) {
            return;
        }
        this.playBackAnim();
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    /**播放声音 */
    BtnClick.prototype.playSound = function () {
        // switch (this.type) {
        //     case ComBtnType.Click:
        //         App.SoundManager.playEffect(SoundConst.btnClick);
        //         break;
        //     case ComBtnType.Close:
        //         App.SoundManager.playEffect(SoundConst.btnBack);
        //         break;
        //     case ComBtnType.SwitchPage:
        //         App.SoundManager.playEffect(SoundConst.switchPage);
        //         break;
        // }
    };
    /**播放扩展动画 */
    BtnClick.prototype.playOutAnim = function () {
        egret.Tween.get(this.target).set({ scaleX: 1, scaleY: 1 }).to({ scaleX: 1.05, scaleY: 1.05 }, 30);
    };
    /**播放收缩动画 */
    BtnClick.prototype.playBackAnim = function () {
        egret.Tween.get(this.target).to({ scaleX: 1, scaleY: 1 }, 30);
    };
    /**设置锚点为中心 */
    BtnClick.prototype.initAnchorOffset = function () {
        if (this.target.anchorOffsetX != this.target.width / 2 && this.target.anchorOffsetY != this.target.height / 2) {
            this.target.anchorOffsetX = this.target.width / 2;
            this.target.anchorOffsetY = this.target.height / 2;
            this.target.x = this.target.x + this.target.width / 2;
            this.target.y = this.target.y + this.target.height / 2;
        }
    };
    /**销毁 */
    BtnClick.prototype.destoryMe = function () {
        //还原按钮大小
        this.target.scaleX = 1;
        this.target.scaleY = 1;
        //移除监听
        egret.Tween.removeTweens(this.target);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        //删除引用
        this.target = null;
        this.cb = null;
        this.thisObject = null;
    };
    return BtnClick;
}());
__reflect(BtnClick.prototype, "BtnClick");
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
/**
 * 图层管理类
 * @author chenkai 2016/12/23
 */
var LayerManager = (function (_super) {
    __extends(LayerManager, _super);
    function LayerManager() {
        var _this = _super.call(this) || this;
        var stage = App.StageUtils.stage;
        _this.sceneLayer = new eui.UILayer();
        _this.sceneLayer.percentWidth = 100;
        _this.sceneLayer.percentHeight = 100;
        _this.sceneLayer.touchEnabled = false;
        stage.addChild(_this.sceneLayer);
        _this.panelLayer = new eui.UILayer();
        _this.panelLayer.percentWidth = 100;
        _this.panelLayer.percentHeight = 100;
        _this.panelLayer.touchEnabled = false;
        stage.addChild(_this.panelLayer);
        _this.dialogLayer = new eui.UILayer();
        _this.dialogLayer.percentWidth = 100;
        _this.dialogLayer.percentHeight = 100;
        _this.dialogLayer.touchEnabled = false;
        stage.addChild(_this.dialogLayer);
        _this.lockLayer = new eui.UILayer();
        _this.lockLayer.percentWidth = 100;
        _this.lockLayer.percentHeight = 100;
        _this.lockLayer.touchEnabled = false;
        stage.addChild(_this.lockLayer);
        _this.tipLayer = new eui.UILayer();
        _this.tipLayer.percentWidth = 100;
        _this.tipLayer.percentHeight = 100;
        _this.tipLayer.touchEnabled = false;
        stage.addChild(_this.tipLayer);
        _this.topLayer = new eui.UILayer();
        _this.topLayer.percentWidth = 100;
        _this.topLayer.percentHeight = 100;
        _this.topLayer.touchEnabled = false;
        stage.addChild(_this.topLayer);
        return _this;
    }
    return LayerManager;
}(SingleClass));
__reflect(LayerManager.prototype, "LayerManager");
/**
 * 本地数据保存
 */
var LocalStorage = (function () {
    function LocalStorage() {
        //临时用户数据   调试阶段在点击收集和升级、解锁时保存一次
        this.userInfo = {
            factoryLvl: 1,
            factoryExp: 0,
            factoryMoney: 0,
            workDeskList: [
                { id: 0, type: 1, level: 1, product: 0 },
                { id: 1, type: 0, level: 1, product: 0 },
                { id: 2, type: 0, level: 1, product: 0 },
                { id: 3, type: 0, level: 1, product: 0 },
                { id: 4, type: 0, level: 1, product: 0 },
                { id: 5, type: 0, level: 1, product: 0 },
                { id: 6, type: 0, level: 1, product: 0 },
                { id: 7, type: 0, level: 1, product: 0 },
                { id: 8, type: 0, level: 1, product: 0 }
            ]
        };
    }
    LocalStorage.getInstance = function () {
        if (this.instance == null) {
            this.instance = new LocalStorage();
        }
        return this.instance;
    };
    //保存用户数据
    LocalStorage.prototype.saveUserInfo = function (userInfo) {
        console.log("LocalStorage >> 保存用户数据:", userInfo);
        egret.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    };
    //获取用户数据
    LocalStorage.prototype.getUserInfo = function () {
        var userInfo = egret.localStorage.getItem("userInfo");
        if (userInfo == null || userInfo == "") {
            console.log("LocalStorage >> 获取用户数据:", null);
            return this.userInfo;
        }
        else {
            console.log("LocalStorage >> 获取用户数据:", JSON.parse(userInfo));
            return JSON.parse(egret.localStorage.getItem("userInfo"));
        }
    };
    //清理本地数据
    LocalStorage.prototype.clearUserInfo = function () {
        console.log("LocalStorage >> 清理用户数据");
        egret.localStorage.setItem("userInfo", "");
    };
    return LocalStorage;
}());
__reflect(LocalStorage.prototype, "LocalStorage");
/**
 * 数字工具类
 * @author chenkai 2016/12/18
 */
var NumberTool = (function (_super) {
    __extends(NumberTool, _super);
    function NumberTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取范围内随机整数 getRandInt(1,3)随机获取1,2,3
     * @start 起始整数
     * @end 终止整数
     */
    NumberTool.getRandInt = function (start, end) {
        return start + Math.round(Math.random() * (end - start));
    };
    /**
     * 将数字格式化为时间数字, 例 5 -> "05"
     * @param num 待格式化数字
     * @returns 格式化后的数字字符串
     */
    NumberTool.formatTime = function (num) {
        if (num >= 0 && num < 10) {
            return "0" + num;
        }
        else {
            return num + "";
        }
    };
    /**
     * 获取数字1~9对应的"一"~"九"
     * @num 阿拉伯数字
     * @return 大写数字
     */
    NumberTool.formatCapital = function (num) {
        if (num <= 0 || num >= 10) {
            return "";
        }
        return (["一", "二", "三", "四", "五", "六", "七", "八", "九"])[num - 1];
    };
    /**
     * 格式化金币  保留两位小数，例如1004，就显示为：1.00K
     * 单位	换算1	换算2
        K	x1000	x10^3
        M	x1000K	x10^6
        B	x1000M	x10^9
        T	x1000B	x10^12
        aa	x1000T	x10^15
        bb	x1000aa	x10^18
        cc	x1000bb	x10^21
        dd	x1000cc	x10^24
        ee	x1000dd	x10^27
        ff	x1000ee	x10^30
        gg	x1000ff	x10^33
        hh	x1000gg	x10^36
        ii	x1000hh	x10^39
        jj	x1000ii	x10^42
        kk	x1000jj	x10^45
     */
    NumberTool.formatMoney = function (value, fixed) {
        if (fixed === void 0) { fixed = 2; }
        var moneyUnit = NumberTool.moneyUnit;
        var len = moneyUnit.length;
        var result;
        for (var i = len - 1; i >= 0; i--) {
            if (value >= Math.pow(10, (i + 1) * 3)) {
                result = (value / Math.pow(10, (i + 1) * 3)).toFixed(fixed) + moneyUnit[i];
                return result;
            }
        }
        return value + "";
    };
    NumberTool.moneyUnit = ["K", "M", "B", "T", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk"];
    return NumberTool;
}(SingleClass));
__reflect(NumberTool.prototype, "NumberTool");
/**
 * 对象池
 * @author chenkai 2016/12/23
 *
 * @example
 * //获取对象池
 * var pool:Pool = App.ObjectPool.getPool("Ball",10);
 * //获取一个Ball
 * var ball:Ball = pool.getObject();
 * //回收一个Ball
 * pool.returnObject(ball);
*/
var ObjectPool = (function (_super) {
    __extends(ObjectPool, _super);
    function ObjectPool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**存储对象池的Object*/
        _this.poolList = {};
        return _this;
    }
    /**
     * 获取对象池，如果不存在则新建一个
     * @param clz 对象类定义
     * @param initNum 初始化对象池数量
     */
    ObjectPool.prototype.getPool = function (clz, initNum) {
        if (initNum === void 0) { initNum = 0; }
        if (!this.poolList[clz]) {
            this.poolList[clz] = new Pool(clz);
            if (initNum != 0) {
                var pool = this.poolList[clz];
                for (var i = 0; i < initNum; i++) {
                    pool.returnObject(new clz());
                }
            }
        }
        return this.poolList[clz];
    };
    return ObjectPool;
}(SingleClass));
__reflect(ObjectPool.prototype, "ObjectPool");
/**对象池*/
var Pool = (function () {
    function Pool(clz) {
        this.clz = clz;
        this.list = [];
    }
    /**获取对象*/
    Pool.prototype.getObject = function () {
        if (this.list.length > 0) {
            return this.list.pop();
        }
        var clz = this.clz;
        return new clz();
    };
    /**回收对象*/
    Pool.prototype.returnObject = function (obj) {
        this.list.push(obj);
    };
    Object.defineProperty(Pool.prototype, "length", {
        /**获取对象池长度*/
        get: function () {
            var count = 0;
            for (var key in this.list) {
                count++;
            }
            return count;
        },
        enumerable: true,
        configurable: true
    });
    return Pool;
}());
__reflect(Pool.prototype, "Pool");
/**
 * 弹框面板加载类
 * @author chenkai 2016/12/23
 */
var PanelManager = (function (_super) {
    __extends(PanelManager, _super);
    function PanelManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**面板实例*/
        _this.panelMap = {};
        /**面板所需资源组*/
        _this.groupMap = {};
        return _this;
    }
    /**
     * @注册
     * @panelClass 弹框类定义
     * @panel      弹框实例
     * @groupName  弹框资源组
     */
    PanelManager.prototype.register = function (panelClass, panel) {
        this.panelMap[panelClass] = panel;
    };
    /**
     * 注销弹框
     * @panelClass 弹框类定义
     */
    PanelManager.prototype.unRegister = function (panelClass) {
        var panel = this.panelMap[panelClass];
        if (panel) {
            delete this.panelMap[panelClass];
        }
        return panel;
    };
    /**
     * 打开弹框面板。若不存在，则尝试创建一个；若需要实时加载资源，则加载完成后打开。
     * @panelClass 弹框类定义
     * @data 传入数据
     * @reutrn 返回打开的面板
     */
    PanelManager.prototype.open = function (panelClass, data) {
        var _this = this;
        if (data === void 0) { data = null; }
        var panel = this.panelMap[panelClass];
        //如果panel不存在，则尝试新建一个
        if (panel == null) {
            panel = new panelClass();
            this.register(panelClass, panel);
        }
        //如果panel存在，则打开
        if (panel) {
            //如果panel已经显示到舞台，则不再重复显示
            if (panel.parent == null) {
                //监听舞台事件
                panel.once(egret.Event.ADDED_TO_STAGE, function () {
                    panel.onEnable(data);
                }, this);
                panel.once(egret.Event.REMOVED_FROM_STAGE, function () {
                    panel.onRemove();
                }, this);
                //未加载资源组，则加载资源后打开
                var groupName = this.groupMap[panelClass];
                if (groupName != null && App.ResUtils.isGroupLoaded(groupName) == false) {
                    this.showLoadAnim();
                    App.ResUtils.loadGroup(groupName, null, function () {
                        _this.hideLoadAnim();
                        App.LayerManager.panelLayer.addChild(panel);
                    }, this);
                    //已加载资源组，直接打开
                }
                else {
                    App.LayerManager.panelLayer.addChild(panel);
                }
            }
            else {
                console.log("PanelManager >> 弹框已打开:", panelClass);
            }
            //设置当前面板
            this.curPanel = panel;
        }
        else {
            console.log("PanelManager >> 弹框不存在:", panelClass);
        }
        return panel;
    };
    /**
     * 关闭弹框
     * @panelClass 弹框类定义
    */
    PanelManager.prototype.close = function (panelClass) {
        var panel = this.panelMap[panelClass];
        if (panel) {
            panel.parent && panel.parent.removeChild(panel);
        }
    };
    /**关闭所有弹框*/
    PanelManager.prototype.closeAll = function () {
        for (var key in this.panelMap) {
            this.close(key);
        }
    };
    /**销毁Panel */
    PanelManager.prototype.destoryPanel = function (panelClass) {
        var panel = this.panelMap[panelClass];
        if (panel) {
            this.close(panelClass);
            delete this.panelMap[panelClass];
            delete this.groupMap[panelClass];
            if (panel == this.curPanel) {
                this.curPanel = null;
            }
            panel.dispose();
            console.log("销毁panel", panelClass);
        }
    };
    /**销毁所有Panel */
    PanelManager.prototype.destoryAllPanel = function () {
        for (var key in this.panelMap) {
            this.destoryPanel(key);
        }
    };
    /**显示加载动画 */
    PanelManager.prototype.showLoadAnim = function () {
        this.loadAnim && App.LayerManager.lockLayer.addChild(this.loadAnim);
    };
    /**隐藏加载动画 */
    PanelManager.prototype.hideLoadAnim = function () {
        this.loadAnim && this.loadAnim.parent && this.loadAnim.parent.removeChild(this.loadAnim);
    };
    return PanelManager;
}(SingleClass));
__reflect(PanelManager.prototype, "PanelManager");
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
/**
 * 场景管理类
 * @author chenkai 2016/12/23
 */
var SceneManager = (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        var _this = _super.call(this) || this;
        /**面板实例*/
        _this.sceneMap = {};
        return _this;
    }
    /**
     * 注册场景
     * @sceneClass 场景类定义
     * @scene      场景实例
     */
    SceneManager.prototype.register = function (sceneClass, scene) {
        if (this.sceneMap[sceneClass] != null) {
            console.log("SceneManager >> 场景已存在:", sceneClass);
            return;
        }
        this.sceneMap[sceneClass] = scene;
    };
    /**
     * 注销场景
     * @sceneClass 场景类定义
     */
    SceneManager.prototype.unRegister = function (sceneClass) {
        var scene = this.sceneMap[sceneClass];
        if (scene != null) {
            delete this.sceneMap[sceneClass];
        }
        return scene;
    };
    /**
     * 打开场景
     * @sceneName 场景类定义
     * @data 传入数据
     */
    SceneManager.prototype.open = function (sceneClass, data) {
        if (data === void 0) { data = null; }
        var scene = this.sceneMap[sceneClass];
        //如果scene不存在，则尝试新建一个
        if (scene == null) {
            scene = new sceneClass();
            this.register(sceneClass, scene);
        }
        //如果scene存在，则打开
        if (scene) {
            //如果scene已经显示到舞台，则不重复显示
            if (scene.parent == null) {
                //保存场景
                var removeScene = this.curScene;
                this.curScene = scene;
                //移除当前场景
                if (removeScene) {
                    removeScene.parent && removeScene.parent.removeChild(removeScene);
                }
                //监听事件
                scene.once(egret.Event.ADDED_TO_STAGE, function () {
                    scene.onEnable(data);
                }, this);
                scene.once(egret.Event.REMOVED_FROM_STAGE, function () {
                    scene.onRemove();
                }, this);
                //显示open的场景
                App.LayerManager.sceneLayer.addChild(scene);
            }
            else {
                console.error("SceneManager >> 场景重复打开:", sceneClass);
            }
        }
        else {
            console.error("SceneManager >> 场景不存在:", sceneClass);
        }
        return scene;
    };
    /**
     * 获取场景
     * @sceneClass 场景类定义
     */
    SceneManager.prototype.getScene = function (sceneClass) {
        return this.sceneMap[sceneClass];
    };
    /**
     * 获取当前场景
     */
    SceneManager.prototype.getCurScene = function () {
        return this.curScene;
    };
    /**销毁场景 */
    SceneManager.prototype.destoryScene = function (sceneClass) {
        var scene = this.sceneMap[sceneClass];
        if (scene) {
            scene.parent && scene.parent.removeChild(scene);
            scene.dispose();
            delete this.sceneMap[sceneClass];
            if (scene == this.curScene) {
                this.curScene = null;
            }
        }
    };
    /**销毁所有场景 */
    SceneManager.prototype.destoryAllScene = function () {
        for (var key in this.sceneMap) {
            this.destoryScene(key);
        }
        this.curScene = null;
    };
    return SceneManager;
}(SingleClass));
__reflect(SceneManager.prototype, "SceneManager");
/**
 * 声音管理类
 * @author chenkai  2016/12/26
 */
var SoundManager = (function (_super) {
    __extends(SoundManager, _super);
    function SoundManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**允许播放音效*/
        _this.allowEffect = true;
        /**允许播放背景音乐*/
        _this.allowBGM = true;
        /**声音列表*/
        _this.soundList = {};
        return _this;
    }
    /**
     * 播放声音
     * @param soundName 声音名
     * @param loop 循环次数
     */
    SoundManager.prototype.playEffect = function (soundName, loop) {
        var _this = this;
        if (loop === void 0) { loop = 1; }
        //禁止播放音效，则返回
        if (this.allowEffect == false) {
            return;
        }
        //播放音效
        var sound = this.soundList[soundName];
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            sound.play(0, loop);
            //音效不存在
        }
        else {
            //从RES中获取
            sound = RES.getRes(soundName);
            if (sound) {
                this.soundList[soundName] = sound;
                sound.type = egret.Sound.EFFECT;
                sound.play(0, loop);
                //从远程获取
            }
            else {
                var url = "resource/assets/music/" + soundName.replace("_mp3", ".mp3");
                RES.getResByUrl(url, function (sound) {
                    _this.soundList[soundName] = sound;
                    sound.type = egret.Sound.EFFECT;
                    sound.play(0, loop);
                }, this, RES.ResourceItem.TYPE_SOUND);
            }
        }
    };
    /**
     * 播放背景音乐
     * @soundName 声音名
     */
    SoundManager.prototype.playBGM = function (soundName) {
        var _this = this;
        //禁止播放背景音乐，则返回
        if (this.allowBGM == false) {
            return;
        }
        //播放背景音乐
        var sound = this.soundList[soundName];
        if (sound) {
            sound.type = egret.Sound.MUSIC;
            if (this.bgmChannel == null) {
                this.bgmChannel = sound.play(0, Number.MAX_VALUE);
            }
            //背景音乐不存在
        }
        else {
            //从RES中获取
            sound = RES.getRes(soundName);
            if (sound) {
                this.soundList[soundName] = sound;
                sound.type = egret.Sound.MUSIC;
                if (this.bgmChannel == null) {
                    this.bgmChannel = sound.play(0, Number.MAX_VALUE);
                }
                //从远程获取
            }
            else {
                var url = "resource/assets/music/" + soundName.replace("_mp3", ".mp3");
                RES.getResByUrl(url, function (sound) {
                    _this.soundList[soundName] = sound;
                    sound.type = egret.Sound.MUSIC;
                    if (_this.bgmChannel == null) {
                        _this.bgmChannel = sound.play(0, Number.MAX_VALUE);
                    }
                }, this, RES.ResourceItem.TYPE_SOUND);
            }
        }
    };
    /**
     * 停止背景音乐
     */
    SoundManager.prototype.stopBGM = function () {
        if (this.bgmChannel) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
    };
    return SoundManager;
}(SingleClass));
__reflect(SoundManager.prototype, "SoundManager");
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
/**
 * 字符串工具
 * @author chenkai 2016/12/18
 */
var StringTool = (function (_super) {
    __extends(StringTool, _super);
    function StringTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 字符串大于一定长度时，进行换行(增加换行符"\n")
     * @param str 字符串
     * @param num 限制长度
     */
    StringTool.formatWrap = function (str, num) {
        var result = "";
        var row = Math.ceil(str.length / num); //有几行
        //大于1行时，进行换行处理
        if (row > 1) {
            var i = void 0;
            for (i = 0; i < row; i++) {
                if (i < row - 1) {
                    result += str.substr(i * num, num) + "\n"; //"123456" substr(0,3) =>"123"
                }
                else {
                    //最后一行
                    result += str.substr(i * num, str.length);
                }
            }
        }
        else {
            result = str;
        }
        return result;
    };
    /**
     * 删除左右两端的空格.   " abc " - > "abc"
     * @str 待处理字符串
     * @is_global 是否处理中间空格
     * @return 处理后字符串
     */
    StringTool.trim = function (str, bGloal) {
        if (bGloal === void 0) { bGloal = false; }
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g, "");
        if (bGloal) {
            result = result.replace(/\s/g, "");
        }
        return result;
    };
    /**
     * 由A-Z,0-9随机组成一个指定长度验证码
     * @param n 验证码位数
     */
    StringTool.prototype.getVerificationCode = function (n) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var len = str.length;
        var code = "";
        for (var i = 0; i < n; i++) {
            code += str.charAt(NumberTool.getRandInt(0, len));
        }
        return code;
    };
    /**
     * 用"..."代替超出指定长度的字符串
     * @param str 源字符串
     * @param len 字符串可显示的长度
     * @returns
     */
    StringTool.prototype.cutString = function (str, len) {
        if (str.length > len) {
            str = str.substr(0, len);
            str += "...";
        }
        return str;
    };
    /**
     * 检查字符串是否为空
     * @param str 源字符串
     * @return 是否为空
     */
    StringTool.prototype.checkEmpty = function (str) {
        if (str.length == 0) {
            return true;
        }
        return false;
    };
    return StringTool;
}(SingleClass));
__reflect(StringTool.prototype, "StringTool");
/**
 * App主类
 * @author chenkai  2018/6/14
 */
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.getInstance = function () {
        if (this.appInstance == null) {
            this.appInstance = new App();
        }
        return this.appInstance;
    };
    Object.defineProperty(App, "ResUtils", {
        /**资源加载类 */
        get: function () {
            return ResUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "StageUtils", {
        /**舞台管理类*/
        get: function () {
            return StageUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "PanelManager", {
        /**弹框管理类*/
        get: function () {
            return PanelManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "SceneManager", {
        /**场景管理类*/
        get: function () {
            return SceneManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "LayerManager", {
        /**图层管理类*/
        get: function () {
            return LayerManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "SoundManager", {
        /**声音管理类*/
        get: function () {
            return SoundManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "DeviceUtils", {
        /**设备管理类*/
        get: function () {
            return DeviceUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "EventManager", {
        /**全局事件类 */
        get: function () {
            return EventMananger.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "DataCenter", {
        /**数据中心*/
        get: function () {
            return DataCenter.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Http", {
        /**Http请求*/
        get: function () {
            return Http.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ObjectPool", {
        /**对象池 */
        get: function () {
            return ObjectPool.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Tips", {
        /**提示信息 */
        get: function () {
            return Tips.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ScreeLock", {
        /**屏幕锁定 */
        get: function () {
            return ScreenLock.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    return App;
}(puremvc.Facade));
__reflect(App.prototype, "App");
/**
 * App代理(处理全局事件)
 * @author chenkai 2018/8/28
 */
var AppMediator = (function (_super) {
    __extends(AppMediator, _super);
    function AppMediator() {
        return _super.call(this) || this;
    }
    AppMediator.prototype.onRegister = function () {
    };
    AppMediator.prototype.onRemove = function () {
    };
    AppMediator.prototype.listNotificationInterests = function () {
        return [AppMediator.START_HEART_TIMER];
    };
    AppMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case AppMediator.START_HEART_TIMER:
                this.startHeartTimer();
                break;
        }
    };
    //开启同步计时器
    AppMediator.prototype.startHeartTimer = function () {
        this.heartTimer || (this.heartTimer = new egret.Timer(20000));
        this.heartTimer.addEventListener(egret.TimerEvent.TIMER, this.onHeartTimer, this);
        this.heartTimer.start();
    };
    //同步计时器
    AppMediator.prototype.onHeartTimer = function () {
        App.Http.doGet(ProtoUrl.USER_ONLINE + App.DataCenter.loginInfo.openId, function (res) {
            if (res.status == 200) {
                console.log("心跳");
            }
        }, this);
    };
    //停止同步计时器
    AppMediator.prototype.stopHeartTimer = function () {
        if (this.heartTimer) {
            this.heartTimer.stop();
            this.heartTimer.removeEventListener(egret.TimerEvent.TIMER, this.onHeartTimer, this);
            this.heartTimer = null;
        }
    };
    AppMediator.NAME = "AppMediator";
    //================== 事件 ========================
    /**启动心跳计时器 */
    AppMediator.START_HEART_TIMER = "START_HEART_TIMER";
    return AppMediator;
}(puremvc.Mediator));
__reflect(AppMediator.prototype, "AppMediator");
/**
 * 启动命令
 * @author chenkai 2018/8/28
 */
var StartupCommand = (function (_super) {
    __extends(StartupCommand, _super);
    function StartupCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartupCommand.prototype.execute = function (notification) {
        //初始化舞台
        var stage = notification.getBody();
        App.StageUtils.stage = stage;
        //小游戏组件初始化
        //common
        window["Tips"] = Tips;
        window["ScaleButton"] = ScaleButton;
        //game
        window["CollectionText"] = CollectionText;
        window["FootMenuUI"] = FootMenuUI;
        window["TopMenuUI"] = TopMenuUI;
        window["EffectMeterUI"] = EffectMeterUI;
        window["GainText"] = GainText;
        window["WorkAreaUI"] = WorkAreaUI;
        window["WorkDesk"] = WorkDesk;
        window["LevelUpItem"] = LevelUpItem;
        //小游戏平台初始化
        platform.updateShareMenu(); //更新转发属性
        //进入加载界面
        this.facade.registerMediator(new LoadMediator());
    };
    return StartupCommand;
}(puremvc.SimpleCommand));
__reflect(StartupCommand.prototype, "StartupCommand");
/**
 * 资源常量
 * @author chenkai 2017/3/16
 */
var AssetConst = (function () {
    function AssetConst() {
    }
    //======================= 主包 =======================
    /**预加载界面 */
    AssetConst.Preload = "preload";
    /**登陆 */
    AssetConst.Home = "home";
    //========================= 分包 ======================
    /**大厅 */
    AssetConst.Game = "game";
    //======================= 其他 ========================
    /**声音*/
    AssetConst.Sound = "sound";
    return AssetConst;
}());
__reflect(AssetConst.prototype, "AssetConst");
/**
 * 命令常量
 * @author chenkai 2018/8/2
 */
var CMDConst = (function () {
    function CMDConst() {
    }
    //========== 启动 ===============
    CMDConst.START_UP = "START_UP";
    return CMDConst;
}());
__reflect(CMDConst.prototype, "CMDConst");
/**
 * 事件常量
 * @author chenkai 2017/4/17
 */
var EventConst = (function () {
    function EventConst() {
    }
    /**Http 发送错误 */
    EventConst.HTTP_ERROR = "HTTP_ERROR";
    //================== 收集区域 =========================
    /**收集产品 */
    EventConst.COLLECTION_PRODUCT = "COLLECTION_PRODUCT";
    //================== 工作区域 =======================
    /**更新金币显示 */
    EventConst.UPDATE_MONEY = "UPDATE_MONEY";
    //================== 增益计 ====================
    /**改变计量状态 */
    EventConst.METER_STATE = "METER_STATE";
    //================== 工厂经验 ===================
    /**刷新工厂经验 */
    EventConst.UPDATE_FACTORY_EXP = "UPDATE_FACTORY_EXP";
    //================== 菜单UI ====================
    /**底部菜单所有按钮下缩 */
    EventConst.DOWN_FOOT_BTN = "DOWN_FOOT_BTN";
    /**生产了新的商品，刷新收集按钮 */
    EventConst.UPDATE_COL_BTN = "UPDATE_COL_BTN";
    //================== 远程通讯 =====================
    /**升级桌子 */
    EventConst.LEVEL_UP_DESK = "LEVEL_UP_DESK";
    /**解锁桌子 */
    EventConst.UNLOCK_DESK = "UNLOCK_DESK";
    /**工厂升级 */
    EventConst.FACTORY_UPGRADE = "FACTORY_UPGRADE";
    return EventConst;
}());
__reflect(EventConst.prototype, "EventConst");
/**
 * 游戏常量
 * @author chenkai 2018/7/26
 */
var GameConst = (function () {
    function GameConst() {
    }
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
/**工作台类型 */
var DeskType;
(function (DeskType) {
    DeskType[DeskType["Empty"] = 0] = "Empty";
    DeskType[DeskType["Work"] = 1] = "Work";
})(DeskType || (DeskType = {}));
/**桌子状态 */
var DeskState;
(function (DeskState) {
    DeskState[DeskState["Work"] = 0] = "Work";
    DeskState[DeskState["Work_Push"] = 1] = "Work_Push";
    DeskState[DeskState["Sleep"] = 2] = "Sleep"; //睡眠
})(DeskState || (DeskState = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
/**
 * 数据中心
 * @author chenkai  2016/12/18
 */
var DataCenter = (function (_super) {
    __extends(DataCenter, _super);
    function DataCenter() {
        var _this = _super.call(this) || this;
        _this.loginInfo = new LoginInfo();
        _this.userInfo = new UserInfo();
        _this.factoryInfo = new FactoryInfo();
        _this.meterInfo = new MeterInfo();
        _this.deskInfo = new DeskInfo();
        _this.produceInfo = new ProduceInfo();
        return _this;
    }
    return DataCenter;
}(SingleClass));
__reflect(DataCenter.prototype, "DataCenter");
/**
 * 工作台信息
 * @author chenkai 2018/8/9
 */
var DeskInfo = (function () {
    function DeskInfo() {
        this.effectTime = 16.6; //效率，每帧消耗的制作时间
        this.maxProduct = 5; //可堆叠的产品数量上限
        this.maxLevel = 300; //最高等级
        this.cosList = []; //开启消耗
        this.offLineTotal = 0; //离线收益总和
        this.workTimeScale = 5; //点击工作动作加速
        this.pushTimeScale = 5; //点击推送动作加速
        this.config = {}; //桌子配置
    }
    //保存配置
    DeskInfo.prototype.saveConfig = function (data) {
        this.config = data;
    };
    //保存数据
    DeskInfo.prototype.saveData = function (data) {
        this.deskData = [];
        //保存解锁的桌子数据
        var dataList = data.data.resFactoryVo.resWorkbenchVos;
        for (var i = 0; i < dataList.length; i++) {
            var value = dataList[i];
            var deskVO = new DeskVO();
            deskVO.id = value.id;
            deskVO.type = value.status;
            deskVO.level = value.level;
            deskVO.product = value.producedMoney;
            deskVO.workbenchNo = value.workbenchNo;
            this.deskData.push(deskVO);
        }
    };
    //保存离线收益
    DeskInfo.prototype.saveOffLine = function (data) {
        for (var _i = 0, _a = data.data; _i < _a.length; _i++) {
            var value = _a[_i];
            this.deskData[value.workbenchNo - 1].product += value.offLineMoney; //服务端桌子id从1开始
            this.offLineTotal += value.offLineMoney;
        }
    };
    //新增的开启桌子配置，又换了个一个配置文件写..
    DeskInfo.prototype.saveOpenConfig = function (data) {
        for (var i = 1; i <= 9; i++) {
            this.cosList.push(data["B00" + i].coin_need);
        }
    };
    //根据等级获取工厂经验
    DeskInfo.prototype.getFactoryExp = function (workbenchNo, level) {
        return this.config["B00" + workbenchNo].level[level - 1].property[0].exp_factory;
    };
    //根据等级获取阶段
    DeskInfo.prototype.getStar = function (workbenchNo, level) {
        var rank = this.config["B00" + workbenchNo].rank;
        for (var key in rank) {
            if (level >= rank[key].level_lower && level <= rank[key].level_upper) {
                return rank[key].rank;
            }
        }
    };
    //根据等级获取当前升星阶的进度 0-1
    DeskInfo.prototype.getLevelUpPro = function (workbenchNo, level) {
        var rank = this.config["B00" + workbenchNo].rank;
        for (var key in rank) {
            if (level >= rank[key].level_lower && level <= rank[key].level_upper) {
                return (level - rank[key].level_lower) / (rank[key].level_upper - rank[key].level_lower);
            }
        }
    };
    //根据等级获取工作台的升级消耗
    DeskInfo.prototype.getUpdateCos = function (workbenchNo, level) {
        return parseInt(this.config["B00" + workbenchNo].level[level - 1].property[0].coin_upgrade); //id+1是因为id从0开始，level-1是应为level是从1开始
    };
    //根据等级获取工作台单次的产出
    DeskInfo.prototype.getOnceCoin = function (workbenchNo, level) {
        return parseInt(this.config["B00" + workbenchNo].level[level - 1].produce[0].coin_once);
    };
    //根据等级获取工作台单次生产的时间
    DeskInfo.prototype.getOnceTime = function (workbenchNo, level) {
        return this.config["B00" + workbenchNo].level[level - 1].produce[0].time_once;
    };
    return DeskInfo;
}());
__reflect(DeskInfo.prototype, "DeskInfo");
/**
 * 工厂等级信息
 * @author chenkai 2018/8/9
 */
var FactoryInfo = (function () {
    function FactoryInfo() {
        //================ 工厂属性 =================
        this.id = 0; //工厂id
        this.name = ""; //名称
        this.curLevel = 1; //当前等级
        this.curMoney = 0; //当前拥有金币
        this.curExp = 0; //当前经验
        this.nextExp = 0; //下一级升级所需经验值
        this.maxLevel = 999; //最大等级
        //=============== 工厂相关配置 ==============
        this.config = {
            level: {},
            scale: {}
        };
    }
    /**
     * 保存json配置
     * @data json配置
     */
    FactoryInfo.prototype.saveConfig = function (data) {
        this.config.level = data.level.property;
        this.config.scale = data.scale.property;
    };
    /**
     * 保存工厂数据
     * @param data 工厂数据
     */
    FactoryInfo.prototype.saveData = function (data) {
        this.id = data.data.resFactoryVo.id;
        this.curLevel = data.data.resFactoryVo.level;
        this.curMoney = parseInt(data.data.baseUser.money);
        this.curExp = data.data.resFactoryVo.currentExp;
        this.nextExp = this.getNextLevelExp();
        this.name = this.getFactoryName();
    };
    /**根据等级获取工厂规模 */
    FactoryInfo.prototype.getFactoryScale = function () {
        var sConfig = this.config.scale;
        for (var key in sConfig) {
            if (this.curLevel >= sConfig[key].level_lower && this.curLevel <= sConfig[key].level_upper) {
                return key;
            }
        }
    };
    /**根据规模获取工厂名称 */
    FactoryInfo.prototype.getFactoryName = function () {
        var scale = this.getFactoryScale();
        return this.config.scale[scale].name;
    };
    /**根据当前等级获取下一级升级Exp */
    FactoryInfo.prototype.getNextLevelExp = function () {
        return this.config.level[this.curLevel + ""].EXP;
    };
    /**获取规模进阶进度  0-1*/
    FactoryInfo.prototype.getScalePro = function () {
        var sConfig = this.config.scale;
        for (var key in sConfig) {
            if (this.curLevel >= sConfig[key].level_lower && this.curLevel <= sConfig[key].level_upper) {
                return (this.curLevel - sConfig[key].level_lower) / (sConfig[key].level_upper - sConfig[key].level_lower);
            }
        }
    };
    //获取工厂的背景图片
    FactoryInfo.prototype.getFactoryBg = function () {
        var sConfig = this.config.scale;
        for (var key in sConfig) {
            if (this.curLevel >= sConfig[key].level_lower && this.curLevel <= sConfig[key].level_upper) {
                return sConfig[key].background;
            }
        }
    };
    return FactoryInfo;
}());
__reflect(FactoryInfo.prototype, "FactoryInfo");
/**
 * 登陆信息
 * @author chenkai 2018/7/29
 */
var LoginInfo = (function () {
    function LoginInfo() {
    }
    return LoginInfo;
}());
__reflect(LoginInfo.prototype, "LoginInfo");
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
/**
 * 产品皮肤配置 (产品跟随工厂等级提升变换皮肤)
 * @author chenkai 2018/8/21
 */
var ProduceInfo = (function () {
    function ProduceInfo() {
        //配置
        this.config = {};
    }
    //保存配置
    ProduceInfo.prototype.saveConfig = function (data) {
        this.config = data;
    };
    /**
     * 根据规模和等级，获取皮肤ID
     * @param scale 工厂规模
     * @param level 工厂等级
     */
    ProduceInfo.prototype.getSkinID = function (scale, level) {
        for (var key in this.config) {
            //判断规模
            if (this.config[key].scale == scale) {
                //判断等级区间
                var skin_produce = this.config[key].skin_produce;
                for (var i = 0; i < skin_produce.length; i++) {
                    if (level >= skin_produce[i].lv_range[0] && level <= skin_produce[i].lv_range[1]) {
                        return skin_produce[i].skin_produce;
                    }
                }
            }
        }
    };
    return ProduceInfo;
}());
__reflect(ProduceInfo.prototype, "ProduceInfo");
/**
 * 用户信息
 * @author chenkai 2018/7/29
 */
var UserInfo = (function () {
    function UserInfo() {
    }
    UserInfo.prototype.saveData = function (data) {
        this.nickName = data.nickName;
        this.avatarUrl = data.avatarUrl;
    };
    return UserInfo;
}());
__reflect(UserInfo.prototype, "UserInfo");
/**
 * 桌子数据
 * @author chenkai 2018/8/24
 */
var DeskVO = (function () {
    function DeskVO() {
    }
    return DeskVO;
}());
__reflect(DeskVO.prototype, "DeskVO");
/**
 * 通讯数据
 * @author chenkai 2018/7/29
 */
var ProtoData = (function () {
    function ProtoData() {
    }
    return ProtoData;
}());
__reflect(ProtoData.prototype, "ProtoData");
/**
 * 通讯接口
 * @author chenkai 2018/7/29
 */
var ProtoUrl = (function () {
    function ProtoUrl() {
    }
    ProtoUrl.preUrl = "https://dc.gamehema.com:8443/hm-factory";
    //============================= 用户登录 ==============================
    /**获取openId */
    ProtoUrl.GET_OPENID = "/user/getOpenid";
    /**获取用户数据 */
    ProtoUrl.GET_USER_INFO = "/user/";
    /**获取离线收益 */
    ProtoUrl.OFF_LINE_EARNINGS = "/user/offLineEarnings/";
    /**清理用户数据 */
    ProtoUrl.CLEAR_USER_INFO = "/user/clear/";
    //============================== 工厂、工作台 ==========================
    /**工作台升级 */
    ProtoUrl.WORKBENCH_UPGRADE = "/workbench/upgrade";
    /**解锁工作台 */
    ProtoUrl.WORKBENCH_LOCK = "/workbench/unlock";
    /**工厂升级 */
    ProtoUrl.FACTORY_UPGRADE = "/factory/upgrade";
    /**收钱 */
    ProtoUrl.COLLECT_MONEY = "/user/collectMoney";
    /**同步用户信息 */
    ProtoUrl.SYNC_USER_INFO = "/user/sync";
    //============================= 心跳 ===========================
    /**心跳 */
    ProtoUrl.USER_ONLINE = "/user/online/";
    return ProtoUrl;
}());
__reflect(ProtoUrl.prototype, "ProtoUrl");
/**
 * 缩放Button
 * 点击会放大，释放会缩回原来大小
 * 问题：双指点击两个按钮时，松开其中一个，另外一个也会触发stageEnd
 * @author chenkai 2018/7/25
 */
var ScaleButton = (function (_super) {
    __extends(ScaleButton, _super);
    function ScaleButton() {
        return _super.call(this) || this;
    }
    ScaleButton.prototype.onTouchBegin = function (event) {
        _super.prototype.onTouchBegin.call(this, event);
        this.initAnchorOffset();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
        this.scaleX = 1.05;
        this.scaleY = 1.05;
    };
    ScaleButton.prototype.buttonReleased = function () {
        _super.prototype.buttonReleased.call(this);
        this.scaleX = 1;
        this.scaleY = 1;
    };
    ScaleButton.prototype.onTouchCancle = function (event) {
        _super.prototype.onTouchCancle.call(this, event);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
        this.scaleX = 1;
        this.scaleY = 1;
    };
    ScaleButton.prototype.onStageEnd = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
        this.scaleX = 1;
        this.scaleY = 1;
    };
    ScaleButton.prototype.initAnchorOffset = function () {
        if (this.anchorOffsetX != this.width / 2 && this.anchorOffsetY != this.height / 2) {
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            this.x = this.x + this.width / 2;
            this.y = this.y + this.height / 2;
        }
    };
    return ScaleButton;
}(eui.Button));
__reflect(ScaleButton.prototype, "ScaleButton");
/**
 * 提示信息
 * @author chenkai 2018/7/28
 */
var Tips = (function (_super) {
    __extends(Tips, _super);
    function Tips() {
        var _this = _super.call(this) || this;
        _this.skinName = "TipsSkin";
        return _this;
    }
    Tips.prototype.childrenCreated = function () {
    };
    //显示信息
    Tips.prototype.showMsg = function (msg) {
        var tips = new Tips();
        tips.msgLabel.text = msg;
        tips.x = App.StageUtils.stageWidth / 2 - tips.width / 2;
        tips.y = App.StageUtils.stageHeight / 2 - tips.height / 2;
        App.LayerManager.tipLayer.addChild(tips);
        var yPos = tips.y - 100;
        egret.Tween.get(tips).to({ y: yPos }, 1500).call(function () {
            tips.parent && tips.parent.removeChild(tips);
        }, this);
    };
    Tips.getInstance = function () {
        if (this.instance == null) {
            this.instance = new Tips();
        }
        return this.instance;
    };
    return Tips;
}(eui.Component));
__reflect(Tips.prototype, "Tips");
/**
 * 游戏视图代理
 * @author chenkai 2018/8/28
 */
var GameMediator = (function (_super) {
    __extends(GameMediator, _super);
    function GameMediator() {
        return _super.call(this, GameMediator.NAME) || this;
    }
    GameMediator.prototype.onRegister = function () {
        this.gameScene = App.SceneManager.open(GameScene);
        this.sendNotification(AppMediator.START_HEART_TIMER);
    };
    GameMediator.prototype.onRemove = function () {
    };
    GameMediator.prototype.listNotificationInterests = function () {
        return [GameMediator.SEND_COLLECTION_PRODUCT];
    };
    GameMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case GameMediator.SEND_COLLECTION_PRODUCT:
                this.onSendCollectionProduct(notification.getBody());
                break;
        }
    };
    /**
     * 发送收集产品消息
     */
    GameMediator.prototype.onSendCollectionProduct = function (data) {
        App.Http.doPost(ProtoUrl.COLLECT_MONEY, data, function (res) {
            if (res.status == 200) {
                console.log("收集金币成功，当前金币:", res.data);
            }
            else {
                console.log("收集金币失败:", res.msg);
            }
        }, this, false);
    };
    GameMediator.NAME = "GameMediator";
    //=============== 事件 =======================
    /**发送收集产品 */
    GameMediator.SEND_COLLECTION_PRODUCT = "SEND_COLLECTION_PRODUCT";
    return GameMediator;
}(puremvc.Mediator));
__reflect(GameMediator.prototype, "GameMediator");
/**
 * 游戏场景
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.totalProduct = 0; //当前所有工作台囤积金币数
        _this.skinName = "GameSceneSkin";
        return _this;
    }
    GameScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //初始化游戏界面
        this.init();
    };
    GameScene.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        //监听
        this.configListeners();
    };
    GameScene.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        //取消监听
        this.deConfigListeners();
    };
    GameScene.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    /**初始化游戏界面 */
    GameScene.prototype.init = function () {
        var _this = this;
        //iphonex适配，UI下移
        if (App.DeviceUtils.IsiPhoneX) {
            this.topGroup.y += 60;
        }
        //初始化顶部UI  
        this.topMenuUI.updateView();
        //工厂动画
        this.factoryBones = new FactoryBones();
        this.factoryBones.show(this.factoryBoneGroup);
        this.factoryBoneGroup.visible = false;
        //工厂背景图
        this.bg.source = RES.getRes(App.DataCenter.factoryInfo.getFactoryBg() + "_jpg");
        //初始化工作台
        this.workAreaUI.initDesk();
        this.workAreaUI.initLevelUpItem();
        this.workAreaUI.hideLevelUp();
        //离线收益
        if (App.DataCenter.deskInfo.offLineTotal > 0) {
            App.Tips.showMsg("离线收益：" + NumberTool.formatMoney(App.DataCenter.deskInfo.offLineTotal));
        }
        //测试用
        this.topMenuUI.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var data = {
                openid: App.DataCenter.loginInfo.openId,
                money: 100000000,
                ids: [App.DataCenter.deskInfo.deskData[0].id]
            };
            App.Http.doPost(ProtoUrl.COLLECT_MONEY, data, function (res) {
                if (res.status == 200) {
                    App.DataCenter.factoryInfo.curMoney += 100000000;
                    _this.topMenuUI.updateMoney();
                    console.log("调试增加金币成功:", res.data);
                }
                else {
                    console.log("调试增加金币失败:", res.msg);
                }
            }, _this, false);
        }, this);
    };
    //============================= 事件处理 ====================================
    /**监听 */
    GameScene.prototype.configListeners = function () {
        //模块内
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this); //每帧执行
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this); //点击事件
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgTap, this); //背景点击
        this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBgBegin, this); //背景长按
        //模块间
        this.addEvent(EventConst.COLLECTION_PRODUCT, this.onCollectionProduct, this); //收集产品
        this.addEvent(EventConst.UPDATE_MONEY, this.updateMoney, this); //刷新金币
        this.addEvent(EventConst.METER_STATE, this.onMeterState, this); //改变增益状态
        this.addEvent(EventConst.UPDATE_FACTORY_EXP, this.onUpdateFactoryExp, this); //刷新工厂经验
        this.addEvent(EventConst.DOWN_FOOT_BTN, this.onFootBtnDown, this); //底部菜单
        this.addEvent(EventConst.UPDATE_COL_BTN, this.onUpdateColBtn, this); //生成了新的产品
        //远程通讯
        this.addEvent(EventConst.LEVEL_UP_DESK, this.onLevelUpDesk, this); //升级桌子
        this.addEvent(EventConst.UNLOCK_DESK, this.onUnlockDesk, this); //解锁桌子
    };
    /**取消监听 */
    GameScene.prototype.deConfigListeners = function () {
        //模块内
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgTap, this);
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBgBegin, this);
        //模块间
        this.removeEvent(EventConst.COLLECTION_PRODUCT, this.onCollectionProduct, this);
        this.removeEvent(EventConst.UPDATE_MONEY, this.updateMoney, this);
        this.removeEvent(EventConst.METER_STATE, this.onMeterState, this);
        this.removeEvent(EventConst.UPDATE_FACTORY_EXP, this.onUpdateFactoryExp, this);
        this.removeEvent(EventConst.DOWN_FOOT_BTN, this.onFootBtnDown, this);
        //远程通讯
        this.removeEvent(EventConst.LEVEL_UP_DESK, this.onLevelUpDesk, this);
        this.removeEvent(EventConst.UNLOCK_DESK, this.onUnlockDesk, this);
        //点击背景的收集
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBgEnd, this);
        egret.Tween.removeTweens(this.bg);
    };
    //每帧执行
    GameScene.prototype.onEnterFrame = function () {
        this.workAreaUI.workRender(); //工作台渲染
        this.meterUI.workRender(); //增益计渲染
    };
    //点击
    GameScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.footMenuUI.levelUpBtn://升级
                this.onLevelUpTap();
                break;
            case this.footMenuUI.picBtn://图鉴
                this.onMatchTap();
                break;
            case this.footMenuUI.colBtn://收集
                this.onColTap();
                break;
            case this.footMenuUI.taskBtn://任务
                this.onTaskTap();
                break;
        }
    };
    //点击升级
    GameScene.prototype.onLevelUpTap = function () {
        this.workAreaUI.showLevelUp();
    };
    //点击循环赛
    GameScene.prototype.onMatchTap = function () {
    };
    //点击收集按钮
    GameScene.prototype.onColTap = function () {
        this.footMenuUI.downAllBtn();
        this.onCollectionProduct();
    };
    //点击任务
    GameScene.prototype.onTaskTap = function () {
    };
    /**点击背景，增加工作效率 */
    GameScene.prototype.onBgTap = function (e) {
        if (App.DataCenter.meterInfo.state == MeterState.Normal) {
            App.DataCenter.meterInfo.clickAddEffect(App.DataCenter.meterInfo.clickStep);
            this.workAreaUI.clickReduceTime();
        }
        else if (App.DataCenter.meterInfo.state == MeterState.Sleep) {
            App.DataCenter.meterInfo.changeState(MeterState.Normal);
        }
    };
    /**按住背景，则以一定频率增加工作效率 */
    GameScene.prototype.onBgBegin = function (e) {
        if (App.DataCenter.meterInfo.state == MeterState.Normal) {
            var meterInfo_1 = App.DataCenter.meterInfo;
            this.bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgTap, this);
            this.bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBgBegin, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onBgEnd, this);
            meterInfo_1.bHolding = true;
            egret.Tween.get(this.bg, { loop: true }).wait(17).call(function () {
                meterInfo_1.clickAddEffect(meterInfo_1.holdStep);
            }, this);
        }
    };
    /**释放按住背景 */
    GameScene.prototype.onBgEnd = function (e) {
        egret.Tween.removeTweens(this.bg);
        App.DataCenter.meterInfo.bHolding = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBgEnd, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBgBegin, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgTap, this);
    };
    /**点击收集，收集产品 */
    GameScene.prototype.onCollectionProduct = function () {
        var _this = this;
        var deskList = this.workAreaUI.workDeskList;
        var len = deskList.length;
        var workDesk;
        var sum = 0;
        var ids = [];
        var _loop_1 = function (i) {
            //金币总和
            workDesk = deskList[i];
            sum += workDesk.curProduct;
            //金币收集效果
            if (workDesk.type == DeskType.Work && workDesk.curProduct > 0) {
                var goldBones_1 = App.ObjectPool.getPool(GoldBones).getObject();
                goldBones_1.gold = workDesk.curProduct;
                var startP = workDesk.parent.localToGlobal(workDesk.x, workDesk.y);
                goldBones_1.x = startP.x + workDesk.width / 2 + 60;
                goldBones_1.y = startP.y + workDesk.height / 2 + 20;
                var endP = this_1.topMenuUI.parent.localToGlobal(this_1.topMenuUI.x, this_1.topMenuUI.y);
                egret.Tween.get(goldBones_1).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ x: endP.x + 100, y: endP.y + 30, scaleX: 1, scaleY: 1 }, 500, egret.Ease.cubicIn).call(function (gold) {
                    App.DataCenter.factoryInfo.curMoney += goldBones_1.gold;
                    goldBones_1.recyle();
                    _this.topMenuUI.updateMoney();
                    _this.topMenuUI.playGoldAnim();
                }, this_1);
                App.LayerManager.topLayer.addChild(goldBones_1);
                ids.push(workDesk.id);
            }
            //清理工作台金币
            workDesk.clearProduct();
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        //设置收集按钮
        this.totalProduct = 0;
        this.footMenuUI.setGoldLab(0);
        //派发收集消息
        if (sum > 0) {
            var data = {
                openid: App.DataCenter.loginInfo.openId,
                money: sum,
                ids: ids
            };
            App.getInstance().sendNotification(GameMediator.SEND_COLLECTION_PRODUCT, data);
        }
    };
    //设置底部金币
    GameScene.prototype.setFootGoldLab = function (gold) {
        this.footMenuUI.setGoldLab(gold);
    };
    /**刷新顶部UI */
    GameScene.prototype.updateTopMenu = function () {
        this.topMenuUI.updateView();
    };
    /**刷新金币 */
    GameScene.prototype.updateMoney = function () {
        this.topMenuUI.updateMoney();
    };
    //增益计状态变化
    GameScene.prototype.onMeterState = function (state) {
        if (state == MeterState.MAX) {
            this.meterUI.setMaxIcon(true);
            this.workAreaUI.showFire();
        }
        else if (state == MeterState.Normal) {
            this.meterUI.setMaxIcon(false);
            this.workAreaUI.hideFire();
            this.workAreaUI.allDeskWork();
        }
        else if (state == MeterState.Sleep) {
            this.meterUI.setMaxIcon(false);
            this.workAreaUI.hideFire();
            this.workAreaUI.allDeskSleep();
        }
    };
    //刷新工厂经验
    GameScene.prototype.onUpdateFactoryExp = function (exp) {
        var _this = this;
        var factoryInfo = App.DataCenter.factoryInfo;
        //判断等级上限
        if (factoryInfo.curLevel >= factoryInfo.maxLevel) {
            App.Tips.showMsg("工厂等级已达上限");
            return;
        }
        //增加经验
        factoryInfo.curExp += exp;
        //判断是否升级
        if (factoryInfo.curExp >= factoryInfo.nextExp) {
            App.Http.doPost(ProtoUrl.FACTORY_UPGRADE, { openid: App.DataCenter.loginInfo.openId, id: App.DataCenter.factoryInfo.id }, function () {
                factoryInfo.curLevel += 1;
                factoryInfo.curExp -= factoryInfo.nextExp;
                factoryInfo.nextExp = factoryInfo.getNextLevelExp();
                factoryInfo.name = factoryInfo.getFactoryName();
                _this.workAreaUI.setProductSkin();
                _this.topMenuUI.updateView();
                //工厂背景图
                _this.bg.source = RES.getRes(App.DataCenter.factoryInfo.getFactoryBg() + "_jpg");
                console.log("工厂升级成功，" + "当前工厂规模:", factoryInfo.getFactoryScale(), "当前工厂等级:", factoryInfo.curLevel, "当前工厂经验:", factoryInfo.curExp, "下一级工厂经验:", factoryInfo.nextExp);
            }, this, false);
        }
        //刷新等级、规模、进度条等
        this.topMenuUI.updateView();
    };
    //底部菜单的按钮下缩
    GameScene.prototype.onFootBtnDown = function () {
        this.footMenuUI.downAllBtn();
    };
    //升级桌子
    GameScene.prototype.onLevelUpDesk = function (workbenchNo) {
        //获取桌子id
        var id = this.workAreaUI.deskList[workbenchNo - 1].id;
        var data = { openid: App.DataCenter.loginInfo.openId, id: id };
        App.Http.doPost(ProtoUrl.WORKBENCH_UPGRADE, data, function (res) {
            if (res.status == 200) {
                // this.workAreaUI.revLevelUpDesk(res.data.id);
            }
            else {
                App.Tips.showMsg(res.msg);
            }
        }, this, false);
    };
    //解锁桌子
    GameScene.prototype.onUnlockDesk = function (workbenchNo) {
        var _this = this;
        //获取桌子id
        var id = this.workAreaUI.deskList[workbenchNo - 1].id;
        var data = { openid: App.DataCenter.loginInfo.openId, id: id };
        App.Http.doPost(ProtoUrl.WORKBENCH_LOCK, data, function (res) {
            if (res.status == 200) {
                _this.workAreaUI.revUnLockDesk(res.data);
            }
            else {
                App.Tips.showMsg(res.msg);
            }
        }, this);
    };
    //开启同步计时器
    GameScene.prototype.startSyncTimer = function () {
        this.syncTimer || (this.syncTimer = new egret.Timer(10000));
        this.syncTimer.addEventListener(egret.TimerEvent.TIMER, this.onSyncTimer, this);
        this.syncTimer.start();
    };
    //同步计时器
    GameScene.prototype.onSyncTimer = function () {
        var data = {
            id: App.DataCenter.userInfo.id,
            openid: App.DataCenter.loginInfo.openId,
            money: App.DataCenter.factoryInfo.curMoney,
            workbenchs: []
        };
        var deskList = this.workAreaUI.workDeskList;
        for (var i = 0; i < deskList.length; i++) {
            var obj = { workbenchId: deskList[i].id, producedMoney: deskList[i].curProduct };
            data.workbenchs.push(obj);
        }
        App.Http.doPost(ProtoUrl.SYNC_USER_INFO, data, function (res) {
            if (res.status == 200) {
                console.log("同步数据成功");
            }
        }, this, false);
    };
    //停止同步计时器
    GameScene.prototype.stopSyncTimer = function () {
        if (this.syncTimer) {
            this.syncTimer.stop();
            this.syncTimer.removeEventListener(egret.TimerEvent.TIMER, this.onSyncTimer, this);
            this.syncTimer = null;
        }
    };
    //刷新收集按钮 num生成的产品
    GameScene.prototype.onUpdateColBtn = function (num) {
        this.totalProduct += num;
        this.footMenuUI.setGoldLab(this.totalProduct);
    };
    return GameScene;
}(BaseScene));
__reflect(GameScene.prototype, "GameScene");
/**
 * 工厂龙骨
 * @author chenkai 2018/8/18
 */
var FactoryBones = (function (_super) {
    __extends(FactoryBones, _super);
    function FactoryBones() {
        var _this = _super.call(this) || this;
        _this.initBinary("gongchang", "gongchang");
        return _this;
    }
    //显示
    FactoryBones.prototype.show = function (doc) {
        doc.addChild(this);
        this.scaleX = 2; //调整大小和位置
        this.scaleY = 2;
        this.x = 360;
        this.y = 520;
        this.playAction("gongchangyunzuo", -1);
    };
    return FactoryBones;
}(BaseBone));
__reflect(FactoryBones.prototype, "FactoryBones");
/**
 * 人物火动画
 * @author chenkai 2018/8/21
 */
var FireBones = (function (_super) {
    __extends(FireBones, _super);
    function FireBones() {
        var _this = _super.call(this) || this;
        _this.initBinary("fire", "fire");
        return _this;
    }
    FireBones.prototype.play = function () {
        this.playAction("fire", -1);
    };
    FireBones.prototype.hide = function () {
        this.armatureDisplay.animation.stop();
        this.parent && this.parent.removeChild(this);
    };
    return FireBones;
}(BaseBone));
__reflect(FireBones.prototype, "FireBones");
/**
 * 收集金币龙骨动画   (后修改，不需要龙骨了)
 * @author chenkai 2018/8/21
 */
var GoldBones = (function (_super) {
    __extends(GoldBones, _super);
    function GoldBones() {
        var _this = _super.call(this) || this;
        //收集的金币数
        _this.gold = 0;
        _this.texture = RES.getRes("com_col_gold_png");
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        return _this;
    }
    //回收
    GoldBones.prototype.recyle = function () {
        this.parent && this.parent.removeChild(this);
        App.ObjectPool.getPool(GoldBones).returnObject(this);
    };
    return GoldBones;
}(eui.Image));
__reflect(GoldBones.prototype, "GoldBones");
/**
 * 收集的文本
 * @author chenkai 2018/8/9
 */
var CollectionText = (function (_super) {
    __extends(CollectionText, _super);
    function CollectionText() {
        var _this = _super.call(this) || this;
        _this.skinName = "CollectionTextSkin";
        return _this;
    }
    //飞行 
    CollectionText.prototype.fly = function (startX, startY, endX, endY, doc) {
        var _this = this;
        this.x = startX;
        this.y = startY;
        doc.addChild(this);
        egret.Tween.get(this).to({ x: endX, y: endY }, 1000).call(function () {
            _this.parent && _this.parent.removeChild(_this);
            App.ObjectPool.getPool(CollectionText).returnObject(_this);
        });
    };
    CollectionText.prototype.setNumLab = function (gold) {
        this.numLab.text = NumberTool.formatMoney(gold);
    };
    return CollectionText;
}(eui.Component));
__reflect(CollectionText.prototype, "CollectionText");
/**
 * 底部菜单按钮
 * @author chenkai 2018/8/10
 */
var FootMenuUI = (function (_super) {
    __extends(FootMenuUI, _super);
    function FootMenuUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "FootMenuUISkin";
        return _this;
    }
    FootMenuUI.prototype.childrenCreated = function () {
    };
    FootMenuUI.prototype.downAllBtn = function () {
        this.levelUpBtn.selected = false;
        this.picBtn.selected = false;
        this.taskBtn.selected = false;
    };
    //设置金币显示
    FootMenuUI.prototype.setGoldLab = function (gold) {
        this.goldLab.text = NumberTool.formatMoney(gold);
    };
    //设置任务提示
    FootMenuUI.prototype.setTaskLab = function (num) {
    };
    return FootMenuUI;
}(eui.Component));
__reflect(FootMenuUI.prototype, "FootMenuUI");
/**
 * 工厂UI
 * @author chenkai 2018/8/9
 */
var TopMenuUI = (function (_super) {
    __extends(TopMenuUI, _super);
    function TopMenuUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "TopMenuUISkin";
        return _this;
    }
    TopMenuUI.prototype.childrenCreated = function () {
        //头像
        this.headImg.mask = this.headMask;
        this.headImg.source = App.DataCenter.userInfo.avatarUrl;
        //工厂等级进度条
        this.factoryBar.mask = this.factoryBarMask;
    };
    /**刷新视图 金币、等级等 */
    TopMenuUI.prototype.updateView = function () {
        var factoryInfo = App.DataCenter.factoryInfo;
        //金币
        this.goldLab.text = NumberTool.formatMoney(factoryInfo.curMoney);
        //名称
        this.factoryNameImg.source = RES.getRes("topmenu_name" + factoryInfo.getFactoryScale() + "_png");
        //工厂等级进度
        this.factoryBarMask.scaleX = factoryInfo.curExp / factoryInfo.nextExp;
        this.factoryLevelLab.text = factoryInfo.curLevel + "";
    };
    /**刷新金币 */
    TopMenuUI.prototype.updateMoney = function () {
        var factoryInfo = App.DataCenter.factoryInfo;
        this.goldLab.text = NumberTool.formatMoney(factoryInfo.curMoney);
    };
    /**播放金币缩放动画 */
    TopMenuUI.prototype.playGoldAnim = function () {
        this.goldImg.scaleX = 1;
        this.goldImg.scaleY = 1;
        egret.Tween.get(this.goldImg).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1, scaleY: 1 }, 200);
    };
    return TopMenuUI;
}(eui.Component));
__reflect(TopMenuUI.prototype, "TopMenuUI");
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
/**
 * 会话框基类
 * @description 设置内容、标题、确认、删除
 * @author chenkai 2017/12/11
 *
 * @example
 * 1. 子类继承 DialogA extends BaseDialog
 * 2. let dialog:DialogA = new DialogA();
 *    dialog.show();
 */
var BaseDialog = (function (_super) {
    __extends(BaseDialog, _super);
    function BaseDialog() {
        var _this = _super.call(this) || this;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        return _this;
    }
    /**
     * 显示
     */
    BaseDialog.prototype.show = function () {
        this.okBtn && CommonBtn.addClick(this.okBtn, this.onConfirm, this, ComBtnType.Click);
        this.cancelBtn && CommonBtn.addClick(this.cancelBtn, this.onCancel, this, ComBtnType.Close);
        App.LayerManager.dialogLayer.addChild(this);
        this.playEnterAnim();
    };
    //播放弹框入场动画
    BaseDialog.prototype.playEnterAnim = function () {
        if (this.contentGroup) {
            egret.Tween.get(this.contentGroup).set({ scaleX: 0, scaleY: 0 }).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        }
    };
    /**设置标题
     * @param title 标题
     */
    BaseDialog.prototype.setTitle = function (title) {
        this.titleLabel && (this.titleLabel.text = title);
    };
    /**设置信息内容
     * @param content 内容
     */
    BaseDialog.prototype.setContent = function (content) {
        this.contentLabel && (this.contentLabel.text = content);
    };
    /**设置确定回调
     * @param callBack 确认回调函数
     * @param thisObject 回调函数执行对象
     */
    BaseDialog.prototype.setOk = function (callBack, thisObject) {
        this.okCB = callBack;
        this.thisObject = thisObject;
    };
    /**
     * 设置取消回调
     * @param callBack 取消回调函数
     * @param thisObject 回调函数执行对象
     */
    BaseDialog.prototype.setCancel = function (callBack, thisObject) {
        this.cancelCB = callBack;
        this.thisObject = thisObject;
    };
    /**确认回调，回调后自动销毁*/
    BaseDialog.prototype.onConfirm = function () {
        if (this.okCB && this.thisObject) {
            this.okCB.apply(this.thisObject);
        }
    };
    /**取消回调，回调后自动销毁*/
    BaseDialog.prototype.onCancel = function () {
        if (this.cancelCB && this.thisObject) {
            this.cancelCB.apply(this.thisObject);
        }
        this.destoryMe();
    };
    /**销毁 */
    BaseDialog.prototype.destoryMe = function () {
        //隐藏
        this.parent && this.parent.removeChild(this);
        egret.Tween.removeTweens(this);
        //移除监听
        this.okBtn && CommonBtn.removeClick(this.okBtn, this.onConfirm, this);
        this.cancelBtn && CommonBtn.removeClick(this.cancelBtn, this.onCancel, this);
        //重置界面
        this.titleLabel && (this.titleLabel.text = "");
        this.contentLabel && (this.contentLabel.text = "");
        //删除回调
        this.cancelCB = null;
        this.okCB = null;
        this.thisObject = null;
    };
    return BaseDialog;
}(eui.Component));
__reflect(BaseDialog.prototype, "BaseDialog");
/**
 * 空的工作台
 * @author chenkai 2018/8/8
 */
var EmptyDesk = (function (_super) {
    __extends(EmptyDesk, _super);
    function EmptyDesk() {
        var _this = _super.call(this) || this;
        _this.cos = 0; //解锁所需金币
        _this.skinName = "EmptyDeskSkin";
        _this.touchChildren = false;
        _this.touchEnabled = false;
        return _this;
    }
    EmptyDesk.prototype.childrenCreated = function () {
    };
    return EmptyDesk;
}(BaseDesk));
__reflect(EmptyDesk.prototype, "EmptyDesk");
/**
 * 获得金币的飘动字体
 * @author chenkai 2018/8/10
 */
var GainText = (function (_super) {
    __extends(GainText, _super);
    function GainText() {
        var _this = _super.call(this) || this;
        _this.skinName = "GainTextSkin";
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    /**
     * 显示
     * @param num 显示的数字
     * @param doc 显示的容器
     */
    GainText.prototype.show = function (num, x, y, doc) {
        var _this = this;
        this.numLab.text = "+" + NumberTool.formatMoney(num);
        this.x = x;
        this.y = y;
        doc.addChild(this);
        egret.Tween.get(this).to({ y: y - 50 }, 1000).call(function () {
            _this.parent && _this.parent.removeChild(_this);
            App.ObjectPool.getPool(GainText).returnObject(_this);
        });
    };
    return GainText;
}(eui.Component));
__reflect(GainText.prototype, "GainText");
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
/**
 * 产品
 * @author chenkai 2018/8/8
 */
var Product = (function (_super) {
    __extends(Product, _super);
    function Product() {
        var _this = _super.call(this) || this;
        _this.texture = RES.getRes("game_product_png");
        return _this;
    }
    Product.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
        App.ObjectPool.getPool(Product).returnObject(this);
    };
    return Product;
}(eui.Image));
__reflect(Product.prototype, "Product");
/**
 * 工作区域
 * @author chenkai 2018/8/10
 */
var WorkAreaUI = (function (_super) {
    __extends(WorkAreaUI, _super);
    function WorkAreaUI() {
        var _this = _super.call(this) || this;
        _this.deskList = []; //工作台数组
        _this.workDeskList = []; //运转中工作台数组
        _this.leveUpList = []; //升级数组
        _this.skinName = "WorkAreaUISkin";
        _this.touchEnabled = false;
        return _this;
    }
    WorkAreaUI.prototype.childrenCreated = function () {
    };
    //初始化工作台
    WorkAreaUI.prototype.initDesk = function () {
        //保存工作台对象到数组
        var len = this.deskGroup.numChildren;
        var desk;
        for (var i = 0; i < len; i++) {
            desk = this.deskGroup.getChildAt(i);
            this.deskList.push(desk);
        }
        //设置工作台属性
        var deskData = App.DataCenter.deskInfo.deskData;
        for (var i = 0; i < deskData.length; i++) {
            this.setDesk(deskData[i]);
        }
        //设置工作台皮肤
        this.setProductSkin();
    };
    //设置工作台
    WorkAreaUI.prototype.setDesk = function (deskVO) {
        //移除原有工作台
        var desk = this.deskList[deskVO.workbenchNo - 1]; //workbenchNo从1开始，数组索引从0开始
        desk.hide();
        //新建未解锁工作台
        if (deskVO.type == DeskType.Empty) {
            var emptyDesk = new EmptyDesk();
            emptyDesk.id = deskVO.id;
            emptyDesk.x = desk.x;
            emptyDesk.y = desk.y;
            this.deskGroup.addChild(emptyDesk);
            this.deskList[deskVO.workbenchNo - 1] = emptyDesk;
            emptyDesk.workbenchNo = deskVO.workbenchNo;
            emptyDesk.type = deskVO.type;
            emptyDesk.cos = App.DataCenter.deskInfo.cosList[deskVO.workbenchNo - 1];
            //新建已解锁工作台
        }
        else if (deskVO.type == DeskType.Work) {
            var workDesk = new WorkDesk();
            workDesk.id = deskVO.id;
            workDesk.x = desk.x;
            workDesk.y = desk.y;
            this.deskGroup.addChild(workDesk);
            this.deskGroup.setChildIndex(workDesk, deskVO.workbenchNo - 1);
            this.deskList[deskVO.workbenchNo - 1] = workDesk;
            workDesk.workbenchNo = deskVO.workbenchNo;
            workDesk.type = deskVO.type;
            workDesk.level = deskVO.level;
            this.workDeskList.push(workDesk);
            workDesk.updateView();
            this.setProductSkin();
            this.setManSkin(deskVO.workbenchNo - 1);
            workDesk.addProduct(deskVO.product, false);
        }
    };
    //工作台渲染
    WorkAreaUI.prototype.workRender = function () {
        var len = this.workDeskList.length;
        for (var i = 0; i < len; i++) {
            this.workDeskList[i].workRender();
        }
    };
    //解锁桌子
    WorkAreaUI.prototype.sendUnLockDesk = function (workbenchNo) {
        //获取未解锁桌子
        var emptyDesk = this.deskList[workbenchNo - 1];
        //判断金币是否足够
        if (App.DataCenter.factoryInfo.curMoney < emptyDesk.cos) {
            App.Tips.showMsg("金币不足");
            return;
        }
        //派发解锁事件
        App.EventManager.sendEvent(EventConst.UNLOCK_DESK, emptyDesk.workbenchNo);
    };
    //接收解锁桌子
    WorkAreaUI.prototype.revUnLockDesk = function (id) {
        var workbenchNo = this.getDeskByID(id).workbenchNo;
        var emptyDesk = this.deskList[workbenchNo - 1];
        //刷新金币
        App.DataCenter.factoryInfo.curMoney -= emptyDesk.cos;
        App.EventManager.sendEvent(EventConst.UPDATE_MONEY);
        App.Tips.showMsg("解锁成功");
        //刷新解锁的levelupItem图标
        var levelupItem = this.leveUpList[workbenchNo - 1];
        levelupItem.setView(emptyDesk.id, workbenchNo, 1, 0);
        //创建运转中工作台
        var deskVO = new DeskVO();
        deskVO.workbenchNo = workbenchNo;
        deskVO.type = DeskType.Work;
        deskVO.level = 1;
        deskVO.product = 0;
        deskVO.id = emptyDesk.id;
        this.setDesk(deskVO);
    };
    //初始化升级界面
    WorkAreaUI.prototype.initLevelUpItem = function () {
        var len = this.levelUpGroup.numChildren;
        for (var i = 0; i < len; i++) {
            this.leveUpList.push(this.levelUpGroup.getChildAt(i));
        }
    };
    //显示升级界面
    WorkAreaUI.prototype.showLevelUp = function () {
        //显示蒙版
        this.rect.width = App.StageUtils.stageWidth;
        this.rect.height = App.StageUtils.stageHeight;
        App.LayerManager.panelLayer.addChild(this.rect);
        //显示升级图标
        var len = this.leveUpList.length;
        for (var i = 0; i < len; i++) {
            var desk = this.deskList[i];
            var levelUpItem = this.leveUpList[i];
            if (desk.type == DeskType.Work) {
                var workDesk = desk;
                levelUpItem.setView(workDesk.id, workDesk.workbenchNo, workDesk.level, 0);
            }
            else if (desk.type == DeskType.Empty) {
                var emptyDesk = desk;
                levelUpItem.setView(emptyDesk.id, emptyDesk.workbenchNo, 0, emptyDesk.cos);
            }
        }
        var p = this.deskGroup.parent.localToGlobal(this.deskGroup.x, this.deskGroup.y);
        this.levelUpGroup.x = p.x;
        this.levelUpGroup.y = p.y;
        App.LayerManager.panelLayer.addChild(this.levelUpGroup);
        //监听
        this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideLevelUp, this);
        this.levelUpGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLevelUpTap, this);
        this.levelUpGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onLevelUpBegin, this);
    };
    //隐藏升级的界面
    WorkAreaUI.prototype.hideLevelUp = function () {
        this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideLevelUp, this);
        this.levelUpGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLevelUpTap, this);
        this.levelUpGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onLevelUpBegin, this);
        this.levelUpGroup.parent && this.levelUpGroup.parent.removeChild(this.levelUpGroup);
        this.rect.parent && this.rect.parent.removeChild(this.rect);
        App.EventManager.sendEvent(EventConst.DOWN_FOOT_BTN);
    };
    //点击升级
    WorkAreaUI.prototype.onLevelUpTap = function (e) {
        if ((e.target instanceof LevelUpItem) == false) {
            return;
        }
        var levelUpItem = e.target;
        //已解锁，则升级
        if (levelUpItem.level > 0) {
            this.sendLevelUpDesk(levelUpItem.workbenchNo);
            //未解锁，则解锁
        }
        else {
            //判断解锁顺序
            if (levelUpItem.workbenchNo == (this.workDeskList.length + 1)) {
                this.sendUnLockDesk(levelUpItem.workbenchNo);
            }
        }
    };
    //长按判断
    WorkAreaUI.prototype.onLevelUpBegin = function (e) {
        var _this = this;
        //长按的不是升级按钮，则退出
        if ((e.target instanceof LevelUpItem) == false) {
            return;
        }
        //未解锁，则退出
        var levelUpItem = e.target;
        if (levelUpItem.level <= 0) {
            return;
        }
        //长按升级
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onLevelUpEnd, this);
        egret.Tween.get(this.levelUpGroup).wait(500).call(function () {
            egret.Tween.get(_this.levelUpGroup, { loop: true }).wait(100).call(function () {
                _this.sendLevelUpDesk(levelUpItem.workbenchNo);
            }, _this);
        }, this);
    };
    //长按释放
    WorkAreaUI.prototype.onLevelUpEnd = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onLevelUpEnd, this);
        egret.Tween.removeTweens(this.levelUpGroup);
    };
    //发送升级桌子
    WorkAreaUI.prototype.sendLevelUpDesk = function (workbenchNo) {
        var workDesk = this.deskList[workbenchNo - 1];
        var levelUpItem = this.leveUpList[workbenchNo - 1];
        if (workDesk) {
            var cos = App.DataCenter.deskInfo.getUpdateCos(workDesk.workbenchNo, workDesk.level);
            var myMoney = App.DataCenter.factoryInfo.curMoney;
            //判断等级上线
            if (workDesk.level >= App.DataCenter.deskInfo.maxLevel) {
                this.onLevelUpEnd();
                App.Tips.showMsg("等级已达上限");
                return;
            }
            //判断金币
            if (myMoney < cos) {
                this.onLevelUpEnd();
                App.Tips.showMsg("金币不足");
                return;
            }
            //发送请求
            App.EventManager.sendEvent(EventConst.LEVEL_UP_DESK, levelUpItem.workbenchNo);
            //因为升级会连续快速升级，不需要等待服务端反馈，就升级桌子
            this.revLevelUpDesk(workDesk.id);
        }
    };
    //接收升级桌子
    WorkAreaUI.prototype.revLevelUpDesk = function (id) {
        var workbenchNo = this.getDeskByID(id).workbenchNo;
        var workDesk = this.deskList[workbenchNo - 1];
        var levelUpItem = this.leveUpList[workbenchNo - 1];
        var cos = App.DataCenter.deskInfo.getUpdateCos(workDesk.workbenchNo, workDesk.level);
        var myMoney = App.DataCenter.factoryInfo.curMoney;
        //刷新金币
        App.DataCenter.factoryInfo.curMoney -= cos;
        App.EventManager.sendEvent(EventConst.UPDATE_MONEY);
        //增加等级，刷新工作台数据
        workDesk.level += 1;
        workDesk.updateView();
        //刷新升级图标
        levelUpItem.setView(workDesk.id, workDesk.workbenchNo, workDesk.level, 0);
        //升级飘动字体
        var gainText = App.ObjectPool.getPool(GainText).getObject();
        var p = levelUpItem.parent.localToGlobal(levelUpItem.x, levelUpItem.y);
        gainText.show(1, p.x + 50, p.y, App.StageUtils.stage);
        //增加工厂经验
        var exp = App.DataCenter.deskInfo.getFactoryExp(workDesk.workbenchNo, workDesk.level);
        App.EventManager.sendEvent(EventConst.UPDATE_FACTORY_EXP, exp);
        console.log("工作台升级成功，当前金币:", App.DataCenter.factoryInfo.curMoney, "工作台等级:", workDesk.level, "本次升级提供工厂经验:", exp);
    };
    //设置工作台产品皮肤
    WorkAreaUI.prototype.setProductSkin = function () {
        var scale = parseInt(App.DataCenter.factoryInfo.getFactoryScale());
        var level = App.DataCenter.factoryInfo.curLevel;
        var skinID = App.DataCenter.produceInfo.getSkinID(scale, level);
        var desk;
        for (var i = 0; i < this.workDeskList.length; i++) {
            //重置龙骨动画
            desk = this.workDeskList[i];
            desk.man.setNewSlot("原材料", skinID + "_0_png");
            desk.man.setNewSlot("原材料1", skinID + "_0_png");
            desk.man.setNewSlot("鸭子", skinID + "_png");
            desk.productSkin = skinID + "_png";
            //重置桌子上产品
            var len = desk.productGroup.numChildren;
            for (var i_1 = len - 1; i_1 >= 0; i_1--) {
                var product = desk.productGroup.getChildAt(i_1);
                product.texture = RES.getRes(skinID + "_png");
                product.anchorOffsetX = product.width / 2;
                product.anchorOffsetY = product.height / 2;
            }
        }
    };
    //设置人物皮肤
    WorkAreaUI.prototype.setManSkin = function (id) {
        var desk = this.workDeskList[id];
        if (desk) {
            desk.man.setNewSlot("人", "man" + id + "_0_png");
            desk.man.setNewSlot("头1", "man" + id + "_1_png");
            desk.man.setNewSlot("头2", "man" + id + "_2_png");
            desk.man.setNewSlot("sleep", "man" + id + "_3_png");
            desk.man.setNewSlot("手", "man" + id + "_4_png");
            desk.man.setNewSlot("手2", "man" + id + "_4_png");
            desk.man.setNewSlot("拿工具手", "man" + id + "_5_png");
        }
    };
    //显示火
    WorkAreaUI.prototype.showFire = function () {
        var len = this.workDeskList.length;
        for (var i = 0; i < len; i++) {
            this.workDeskList[i].showFire();
        }
    };
    //隐藏火
    WorkAreaUI.prototype.hideFire = function () {
        var len = this.workDeskList.length;
        for (var i = 0; i < len; i++) {
            this.workDeskList[i].hideFire();
        }
    };
    //点击减少制作时间
    WorkAreaUI.prototype.clickReduceTime = function () {
        var len = this.workDeskList.length;
        var desk;
        var clickReduceTime = App.DataCenter.meterInfo.clickReduceTime;
        for (var i = 0; i < len; i++) {
            desk = this.workDeskList[i];
            //只有工作状态才能加速
            if (desk.state == DeskState.Work) {
                //减少制作时间
                desk.curTime += clickReduceTime * 1000;
                //工作状态加速
                desk.man.armatureDisplay.animation.timeScale = App.DataCenter.deskInfo.workTimeScale; //加速
            }
            else if (desk.state == DeskState.Work_Push) {
                desk.man.armatureDisplay.animation.timeScale = App.DataCenter.deskInfo.pushTimeScale; //加速
            }
        }
    };
    //桌子休眠
    WorkAreaUI.prototype.allDeskSleep = function () {
        var len = this.workDeskList.length;
        for (var i = 0; i < len; i++) {
            this.workDeskList[i].changeState(DeskState.Sleep);
        }
    };
    //桌子工作
    WorkAreaUI.prototype.allDeskWork = function () {
        var len = this.workDeskList.length;
        for (var i = 0; i < len; i++) {
            this.workDeskList[i].changeState(DeskState.Work);
        }
    };
    //根据ID获取桌子
    WorkAreaUI.prototype.getDeskByID = function (id) {
        var len = this.deskList.length;
        for (var i = 0; i < len; i++) {
            if (this.deskList[i].id == id) {
                return this.deskList[i];
            }
        }
        return null;
    };
    return WorkAreaUI;
}(eui.Component));
__reflect(WorkAreaUI.prototype, "WorkAreaUI");
/**
 * 工作台
 * @author chenkai 2018/8/8
 */
var WorkDesk = (function (_super) {
    __extends(WorkDesk, _super);
    function WorkDesk() {
        var _this = _super.call(this) || this;
        _this.curTime = 0; //当前制作时间  单位ms
        _this.curProduct = 0; //当前制作物品数量
        //============== 等级 ===============
        _this.level = 0; //工作台等级
        _this.skinName = "WorkDeskSkin";
        _this.touchChildren = false;
        _this.touchEnabled = false;
        return _this;
    }
    WorkDesk.prototype.childrenCreated = function () {
        //进度条
        this.progress = new CircleProgress(this.clock, false, 1);
        //工人
        this.man = new WorkMan();
        this.man.x -= 20;
        this.man.y -= 10;
        this.manGroup.addChild(this.man);
        this.man.playWork();
        this.workTime = this.man.armatureDisplay.animation.getState("work").totalTime;
        this.man.playWorkPush();
        this.workPushTime = this.man.armatureDisplay.animation.getState("work_push").totalTime;
        this.man.armatureDisplay.addEventListener(eui.UIEvent.LOOP_COMPLETE, this.workLoopComplete, this);
        this.man.armatureDisplay.addEvent(dragonBones.EgretEvent.FRAME_EVENT, this.onFrameEvent, this);
        this.changeState(DeskState.Work);
    };
    //刷新显示
    WorkDesk.prototype.updateView = function () {
        this.onceTime = App.DataCenter.deskInfo.getOnceTime(this.workbenchNo, this.level);
        this.effectTime = App.DataCenter.deskInfo.effectTime;
        this.onceCoin = App.DataCenter.deskInfo.getOnceCoin(this.workbenchNo, this.level);
        this.maxProduct = App.DataCenter.deskInfo.maxProduct;
    };
    //每帧执行
    WorkDesk.prototype.workRender = function () {
        if (this.state == DeskState.Work) {
            //max状态，制作效率增加
            if (App.DataCenter.meterInfo.state == MeterState.MAX) {
                var addTime = this.effectTime + this.effectTime * App.DataCenter.meterInfo.FastestValue;
                this.curTime += addTime;
                this.man.armatureDisplay.animation.timeScale = addTime / this.effectTime;
                //普通状态制作效率
            }
            else if (App.DataCenter.meterInfo.state == MeterState.Normal) {
                this.curTime += this.effectTime;
            }
            //制作进度
            this.setProgress();
            //制作完一件物品，则物品加1
            if (this.curTime >= this.onceTime) {
                this.curTime = 0;
                this.changeState(DeskState.Work_Push);
            }
        }
    };
    //设置进度条
    WorkDesk.prototype.setProgress = function () {
        this.progress.drawProgress(this.curTime / this.onceTime);
    };
    //增加产品 (视图表现产品堆叠有上限)
    WorkDesk.prototype.addProduct = function (num, bShowNum) {
        if (bShowNum === void 0) { bShowNum = true; }
        if (num <= 0) {
            return;
        }
        //显示堆叠物品
        if (this.productGroup.numChildren < this.maxProduct) {
            var product = App.ObjectPool.getPool(Product).getObject();
            product.texture = RES.getRes(this.productSkin);
            product.anchorOffsetX = product.width / 2;
            product.anchorOffsetY = product.height / 2;
            product.x = 0;
            product.y = this.productGroup.numChildren * -10; //堆叠时向上移动10像素位置
            this.productGroup.addChild(product);
        }
        //显示增加的物品
        this.curProduct += num;
        //增加数字飘动
        if (bShowNum) {
            var gainText = App.ObjectPool.getPool(GainText).getObject();
            gainText.show(num, this.width / 2, this.height / 2, this);
        }
        App.EventManager.sendEvent(EventConst.UPDATE_COL_BTN, num);
    };
    //清理产品
    WorkDesk.prototype.clearProduct = function () {
        var len = this.productGroup.numChildren;
        for (var i = len - 1; i >= 0; i--) {
            var product = this.productGroup.getChildAt(i);
            product.hide();
        }
        this.curProduct = 0;
    };
    //显示火焰
    WorkDesk.prototype.showFire = function () {
        this.fireBones || (this.fireBones = new FireBones);
        this.fireBones.x = -25; //位置调整
        this.fireBones.y = -this.height / 2 + 30;
        this.fireGroup.addChild(this.fireBones);
        this.fireBones.play();
    };
    //隐藏火焰
    WorkDesk.prototype.hideFire = function () {
        this.fireBones && this.fireBones.hide();
    };
    //改变状态
    WorkDesk.prototype.changeState = function (state) {
        switch (state) {
            case DeskState.Work:
                this.man.playWork();
                break;
            case DeskState.Work_Push:
                //max状态
                if (App.DataCenter.meterInfo.state == MeterState.MAX) {
                    this.man.armatureDisplay.animation.timeScale = App.DataCenter.meterInfo.FastestValue;
                }
                else {
                    this.man.armatureDisplay.animation.timeScale = 1;
                }
                this.man.playWorkPush();
                break;
            case DeskState.Sleep:
                this.man.armatureDisplay.animation.timeScale = 1;
                //中断推动产品状态，则增加物品
                if (this.state == DeskState.Work_Push) {
                    this.addProduct(this.onceCoin);
                }
                this.man.playSleep();
                break;
        }
        //设置状态
        this.state = state;
    };
    //一次循环动作完成
    WorkDesk.prototype.workLoopComplete = function () {
        //工作一次完成，如果在click加速状态，则恢复原速率
        if (this.state == DeskState.Work) {
            if (App.DataCenter.meterInfo.state == MeterState.Normal) {
                this.man.armatureDisplay.animation.timeScale = 1;
            }
            //推送一次完成，则增加商品，并切换工作
        }
        else if (this.state == DeskState.Work_Push) {
            if (App.DataCenter.meterInfo.state == MeterState.Normal) {
                this.man.armatureDisplay.animation.timeScale = 1;
            }
            this.changeState(DeskState.Work);
        }
    };
    //帧事件。推动产品动作，产品被推到指定位置时触发新增物品操作
    WorkDesk.prototype.onFrameEvent = function (e) {
        if (e.frameLabel == "push_complete") {
            this.addProduct(this.onceCoin);
        }
    };
    return WorkDesk;
}(BaseDesk));
__reflect(WorkDesk.prototype, "WorkDesk");
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
/**
 * 主页视图代理
 * @author chenkai 2018/8/28
 */
var HomeMediator = (function (_super) {
    __extends(HomeMediator, _super);
    function HomeMediator() {
        return _super.call(this, HomeMediator.NAME) || this;
    }
    HomeMediator.prototype.onRegister = function () {
        this.homeScene = App.SceneManager.open(HomeScene);
        this.checkSetting();
    };
    HomeMediator.prototype.onRemove = function () {
        App.SceneManager.destoryScene(HomeScene);
        this.homeScene = null;
    };
    HomeMediator.prototype.listNotificationInterests = function () {
        return [HomeMediator.OPEN_GAME_SCENE,
            HomeMediator.SEND_RESET_DATA];
    };
    HomeMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case HomeMediator.OPEN_GAME_SCENE:
                this.onOpenGameScene();
                break;
            case HomeMediator.SEND_RESET_DATA:
                this.onSendResetData();
                break;
        }
    };
    //打开游戏场景
    HomeMediator.prototype.onOpenGameScene = function () {
        this.facade.removeMediator(HomeMediator.NAME);
        this.facade.registerMediator(new GameMediator());
    };
    //重置数据
    HomeMediator.prototype.onSendResetData = function () {
        var _this = this;
        platform.showLoading("重置数据", true);
        App.Http.doGet(ProtoUrl.CLEAR_USER_INFO + App.DataCenter.userInfo.id, function (res) {
            if (res.status == 200) {
                _this.login();
            }
            else {
                App.Tips.showMsg(res.msg);
            }
        }, this);
    };
    //检查设置信息
    HomeMediator.prototype.checkSetting = function () {
        var _this = this;
        platform.showLoading("检查授权", true);
        platform.getSetting().then(function () {
            //已授权，开始登陆
            _this.login();
        }, function () {
            //未授权，显示授权按钮
            platform.hideLoading();
            _this.homeScene.hideDebugBtn();
            _this.createUserInfoButton();
        });
    };
    //创建授权按钮
    HomeMediator.prototype.createUserInfoButton = function () {
        var _this = this;
        var button = platform.createUserInfoButton("resource/assets/home/home_start.png", this.homeScene.startBtn);
        button.show();
        button.onTap(function (res) {
            console.log(res);
            if (res.errMsg == "getUserInfo:ok") {
                button.hide();
                button.destroy();
                //授权成功，登陆
                _this.login();
            }
        });
    };
    //登录
    HomeMediator.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginInfo, userInfo, rawData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform.showLoading("登录中", true);
                        //录入配置文件
                        App.DataCenter.factoryInfo.saveConfig(RES.getRes("Factory_json"));
                        App.DataCenter.deskInfo.saveConfig(RES.getRes("Workbench_json"));
                        App.DataCenter.deskInfo.saveOpenConfig(RES.getRes("Workbench_open_json"));
                        App.DataCenter.meterInfo.saveConfig(RES.getRes("Meter_json"));
                        App.DataCenter.produceInfo.saveConfig(RES.getRes("Produce_json"));
                        return [4 /*yield*/, platform.login()];
                    case 1:
                        loginInfo = _a.sent();
                        App.DataCenter.loginInfo.code = loginInfo.code;
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 2:
                        userInfo = _a.sent();
                        rawData = JSON.parse(userInfo.rawData);
                        App.DataCenter.userInfo.saveData(rawData);
                        //请求服务器获取openid
                        App.Http.doPost(ProtoUrl.GET_OPENID, { code: loginInfo.code, nickname: rawData.nickName, headUrl: rawData.avatarUrl }, this.revOpenId, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    //接收openid
    HomeMediator.prototype.revOpenId = function (res) {
        if (res.status == 200) {
            App.DataCenter.loginInfo.openId = res.data;
            //获取用户信息
            App.Http.doGet(ProtoUrl.GET_USER_INFO + App.DataCenter.loginInfo.openId, this.revUserInfo, this);
        }
        else {
            platform.hideLoading();
            App.Tips.showMsg(res.msg);
        }
    };
    //接收用户信息
    HomeMediator.prototype.revUserInfo = function (res) {
        if (res.status == 200) {
            App.DataCenter.factoryInfo.saveData(res);
            App.DataCenter.deskInfo.saveData(res);
            App.DataCenter.userInfo.id = res.data.baseUser.id;
            //获取离线收益
            App.Http.doGet(ProtoUrl.OFF_LINE_EARNINGS + App.DataCenter.loginInfo.openId, this.revOffLine, this);
        }
        else {
            platform.hideLoading();
            App.Tips.showMsg(res.msg);
        }
    };
    //接收离线收益
    HomeMediator.prototype.revOffLine = function (res) {
        if (res.status == 200) {
            App.DataCenter.deskInfo.saveOffLine(res);
            console.log("离线收益:" + App.DataCenter.deskInfo.offLineTotal);
        }
        platform.hideLoading();
        //显示调试按钮
        this.homeScene.showDebugBtn();
    };
    HomeMediator.NAME = "HomeMediator";
    //================= 事件 =======================
    /**打开游戏场景 */
    HomeMediator.OPEN_GAME_SCENE = "OPEN_GAME_SCENE";
    /**重置用户数据 */
    HomeMediator.SEND_RESET_DATA = "SEND_RESET_DATA";
    return HomeMediator;
}(puremvc.Mediator));
__reflect(HomeMediator.prototype, "HomeMediator");
/**
 * 首页
 * @author chenkai 2018/8/8
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "HomeSceneSkin";
        return _this;
    }
    HomeScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    HomeScene.prototype.onEnable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.onEnable.call(this);
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                return [2 /*return*/];
            });
        });
    };
    HomeScene.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    HomeScene.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //点击
    HomeScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.startBtn://开始
                this.onStartTap();
                break;
            case this.resetBtn://重置数据
                this.onResetTap();
                break;
        }
    };
    /**游戏开始 */
    HomeScene.prototype.onStartTap = function () {
        App.getInstance().sendNotification(HomeMediator.OPEN_GAME_SCENE);
    };
    /**重置数据 */
    HomeScene.prototype.onResetTap = function () {
        App.getInstance().sendNotification(HomeMediator.SEND_RESET_DATA);
    };
    /**显示测试按钮 */
    HomeScene.prototype.showDebugBtn = function () {
        this.startBtn.visible = true;
        this.resetBtn.visible = true;
    };
    /**隐藏测试按钮 */
    HomeScene.prototype.hideDebugBtn = function () {
        this.startBtn.visible = false;
        this.resetBtn.visible = false;
    };
    return HomeScene;
}(BaseScene));
__reflect(HomeScene.prototype, "HomeScene");
/**
 * 加载视图代理
 * @author chenkai 2018/8/28
 */
var LoadMediator = (function (_super) {
    __extends(LoadMediator, _super);
    function LoadMediator() {
        return _super.call(this, LoadMediator.NAME) || this;
    }
    LoadMediator.prototype.onRegister = function () {
        //打开加载场景
        this.loadScene = App.SceneManager.open(LoadScene);
        //开始加载资源
        this.startLoad();
    };
    LoadMediator.prototype.onRemove = function () {
        App.SceneManager.destoryScene(LoadScene);
        this.loadScene = null;
    };
    //开始加载
    LoadMediator.prototype.startLoad = function () {
        var _this = this;
        platform.showLoading("加载资源中", true);
        this.loadScene.setProgress(0);
        //分包加载
        var loadTask = wx.loadSubpackage({
            name: 'game',
            success: function (res) {
                console.log("LoadMediator >> 加载分包成功");
                _this.loadRes();
            },
            fail: function (res) {
                console.log("LoadMediator >>  加载分包失败");
                App.Tips.showMsg("加载资源失败");
            },
            complete: function (res) {
                console.log("LoadMediator >>  加载分包完成");
            }
        });
        loadTask.onProgressUpdate(function (res) {
            // console.log('已经下载的数据长度', res.totalBytesWritten);
            // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite);
            // console.log('加载进度', res.progress);
        });
    };
    //加载资源
    LoadMediator.prototype.loadRes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RES.loadGroup("game")];
                    case 1:
                        _a.sent();
                        //跳转到主页
                        platform.hideLoading();
                        this.facade.removeMediator(LoadMediator.NAME);
                        this.facade.registerMediator(new HomeMediator());
                        return [2 /*return*/];
                }
            });
        });
    };
    LoadMediator.NAME = "LoadMediator";
    return LoadMediator;
}(puremvc.Mediator));
__reflect(LoadMediator.prototype, "LoadMediator");
/**
 * 加载场景
 * @author chenkai 2018/8/8
 */
var LoadScene = (function (_super) {
    __extends(LoadScene, _super);
    function LoadScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "LoadSceneSkin";
        return _this;
    }
    LoadScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    LoadScene.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
    };
    LoadScene.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
    };
    LoadScene.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    /**
     * 设置进度文本
     * @param value 进度值 0-100
     */
    LoadScene.prototype.setProgress = function (value) {
        this.progressLab.text = value + "%";
    };
    return LoadScene;
}(BaseScene));
__reflect(LoadScene.prototype, "LoadScene");
;window.Main = Main;