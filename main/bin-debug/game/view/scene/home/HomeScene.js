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
                this.checkSetting();
                this.configListener();
                return [2 /*return*/];
            });
        });
    };
    HomeScene.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.deConfigListener();
    };
    HomeScene.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    /**监听 */
    HomeScene.prototype.configListener = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    /**取消监听 */
    HomeScene.prototype.deConfigListener = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    /**检查设置信息 */
    HomeScene.prototype.checkSetting = function () {
        var _this = this;
        platform.showLoading("检查授权", true);
        platform.getSetting().then(function () {
            //已授权，开始登陆
            _this.login();
        }, function () {
            //未授权，显示授权按钮
            platform.hideLoading();
            _this.hideDebugBtn();
            _this.createUserInfoButton();
        });
    };
    /**登录 */
    HomeScene.prototype.login = function () {
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
    HomeScene.prototype.revOpenId = function (res) {
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
    HomeScene.prototype.revUserInfo = function (res) {
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
    HomeScene.prototype.revOffLine = function (res) {
        if (res.status == 200) {
            App.DataCenter.deskInfo.saveOffLine(res);
            console.log("离线收益:" + App.DataCenter.deskInfo.offLineTotal);
        }
        platform.hideLoading();
        //显示调试按钮
        this.showDebugBtn();
    };
    //创建授权按钮
    HomeScene.prototype.createUserInfoButton = function () {
        var _this = this;
        var button = platform.createUserInfoButton("resource/assets/home/home_start.png", this.startBtn);
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
        platform.showLoading("加载资源中", true);
        //跳转到游戏场景
        platform.hideLoading();
        App.SceneManager.destoryScene(HomeScene);
        App.SceneManager.open(GameScene);
    };
    /**重置数据 */
    HomeScene.prototype.onResetTap = function () {
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
