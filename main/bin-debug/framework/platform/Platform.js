var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
