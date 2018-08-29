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
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    Main.prototype.onThemeLoadComplete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("子项目加载皮肤完成");
                //监听主域来的消息
                wx.onMessage(function (data) {
                    console.log("主域发送来的消息：", data); //消息格式  data = {data:{cmd:"", ...}}
                    switch (data.data.cmd) {
                        case "openid"://保存openid
                            _this.saveOpenId(data);
                            break;
                        case "rankFriend"://好友排行
                            _this.showRankFriend(data);
                            break;
                        case "hideRankFriend"://隐藏好友排行
                            _this.hideRankFriend();
                            break;
                        case "rankGroup"://群排行  data格式 data = {data:{cmd:"",shareTicket:""}}
                            _this.showRankGroup(data);
                            break;
                        case "saveScore"://保存分数 data格式 {data:{cmd:"saveScore", score:99}}
                            _this.saveScore(data);
                            break;
                        case "heartPanel"://复活界面，显示超越好友
                            _this.showHeartPanel(data); //data格式 {data:{cmd:"heartPanel", score:99}}
                            break;
                        case "hideHeartPanel"://隐藏复活界面
                            _this.hideHeartPanel();
                            break;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    //保存openid
    Main.prototype.saveOpenId = function (data) {
        console.log("Sub Main >> 保存openid:", data.data.openid);
        GameConst.openId = data.data.openid;
    };
    Main.prototype.showRankFriend = function (data) {
        var _this = this;
        //读取好友关系链数据
        wx.getFriendCloudStorage({
            keyList: ["rank"],
            success: function (res) {
                console.log("Sub Main >> getFriendCloudStorage:", res);
                _this.friendRankPanel || (_this.friendRankPanel = new FriendRankPanel());
                _this.addChild(_this.friendRankPanel);
                _this.friendRankPanel.init(res.data);
            },
            fail: function (err) {
                console.log(err);
            },
            complete: function () {
            }
        });
    };
    //隐藏好友排行
    Main.prototype.hideRankFriend = function () {
        if (this.friendRankPanel) {
            this.friendRankPanel.hide();
        }
    };
    //显示群排行
    Main.prototype.showRankGroup = function (data) {
        var _this = this;
        console.log("Sub Main >> 准备显示群排行榜");
        wx.getGroupCloudStorage({
            shareTicket: data.data.shareTicket,
            keyList: ["rank"],
            success: function (res) {
                console.log("Sub Main >> getGroupCloudStorage success:", res);
                _this.friendRankPanel || (_this.friendRankPanel = new FriendRankPanel());
                _this.addChild(_this.friendRankPanel);
                _this.friendRankPanel.init(res.data);
            },
            fail: function (res) {
            },
            complete: function (res) {
            }
        });
    };
    //保存分数
    Main.prototype.saveScore = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var curScore, cloudInfo, lastScore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        curScore = data.data.score;
                        if (!(curScore > GameConst.maxScore)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getUserCloudStorage()];
                    case 1:
                        cloudInfo = _a.sent();
                        //如果已保存过我的分数，则当本次分数大于上一次，才进行保存
                        if (cloudInfo.KVDataList && cloudInfo.KVDataList[0]) {
                            lastScore = JSON.parse(cloudInfo.KVDataList[0].value).wxgame.score;
                            if (curScore > lastScore) {
                                GameConst.maxScore = curScore;
                                this.setUserCloudStorage(curScore);
                            }
                            //如果未保存过我的分数，则直接保存
                        }
                        else {
                            GameConst.maxScore = curScore;
                            this.setUserCloudStorage(curScore);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    //获取好友数据链
    Main.prototype.getUserCloudStorage = function () {
        return new Promise(function (resolve, reject) {
            wx.getUserCloudStorage({
                keyList: ["rank"],
                success: function (res) {
                    console.log("Sub Main >> getUserCloudStorage:", res);
                    resolve(res);
                },
                fail: function (res) {
                },
                complete: function (res) {
                }
            });
        });
    };
    //保存分数到微信服务器
    Main.prototype.setUserCloudStorage = function (score) {
        var KVDataList = [{
                key: "",
                value: ""
            }];
        KVDataList[0].key = "rank";
        KVDataList[0].value = JSON.stringify({
            "wxgame": {
                "score": score,
                "update_time": new Date().getTime()
            },
            "cost_ms": 0
        });
        wx.setUserCloudStorage({ KVDataList: KVDataList, success: function (res) {
                console.log("Sub Main >> setUserCloudStorage success", res);
            }, fail: function (res) {
                console.log("Sub Main >> setUserCloudStorage fail");
            }, complete: function (res) {
                console.log("Sub Main >> setUserCloudStorage complete");
            } });
    };
    Main.prototype.showHeartPanel = function (data) {
        var _this = this;
        //读取好友关系数据链
        wx.getFriendCloudStorage({
            keyList: ["rank"],
            success: function (res) {
                console.log("Sub Main >> getFriendCloudStorage:", res);
                //我当前分数
                var myScore = data.data.score;
                //冒泡降序排列
                var rankList = res.data;
                var len = rankList.length;
                var temp;
                for (var i = 0; i < len; i++) {
                    for (var j = i + 1; j < len; j++) {
                        if (rankList[i].score < rankList[j].score) {
                            temp = rankList[i];
                            rankList[i] = rankList[j];
                            rankList[j] = temp;
                        }
                    }
                }
                //获取第一个比我大的好友分数，逆序访问
                var index = -1;
                var friendScore;
                for (var i = len - 1; i >= 0; i--) {
                    if (rankList[i].openid != GameConst.openId) {
                        friendScore = JSON.parse(rankList[i].KVDataList[0].value).wxgame.score;
                        if (friendScore > myScore) {
                            index = i;
                            break;
                        }
                    }
                }
                //如果有比我大的分数，则显示超越好友
                if (index != -1) {
                    _this.heartPanel || (_this.heartPanel = new HeartPanel());
                    _this.addChild(_this.heartPanel);
                    _this.heartPanel.init(rankList[index]);
                }
            },
            fail: function (err) {
                console.log(err);
            },
            complete: function () {
            }
        });
    };
    //隐藏复活界面
    Main.prototype.hideHeartPanel = function () {
        this.heartPanel && this.heartPanel.hide();
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
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
 * 游戏常量
 * @author chenkai 2018/7/29
 */
var GameConst = (function () {
    function GameConst() {
    }
    //根据分数获取等级  50分一个等级
    GameConst.getLevel = function (score) {
        var level = Math.ceil(score / 50);
        level = level <= 14 ? level : 14;
        return level;
    };
    //根据分数获取等级称号
    GameConst.getScoreTitle = function (score) {
        var level = GameConst.getLevel(score);
        return GameConst.levelName[level - 1];
    };
    //============================= 用户信息 ==============================
    GameConst.openId = ""; //openId
    GameConst.maxScore = 0; //好友排行榜中我的最高分数
    //============================== 等级 ===================================
    //等级名称
    //public static levelName = ["飞跃","乘风","米格","暴龙","子弹","雷诺","锐速","狂风","圣徒","幻想","冰魄","刀锋","雷霆","光速"];
    GameConst.levelName = ["头盔哥", "隔壁老王", "单身汪", "绿帽哥", "夜猫君", "全村的希望", "包治百病", "天生萌货", "国民女流氓", "限量版逗比", "超级小正太", "富家子弟", "奔跑吧奶奶", "小猪佩奇"];
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
/**
 * 排行榜
 * @author chenkai 2018/7/28
 */
var FriendRankPanel = (function (_super) {
    __extends(FriendRankPanel, _super);
    function FriendRankPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "FriendRankPanelSkin";
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        return _this;
    }
    FriendRankPanel.prototype.childrenCreated = function () {
        this.rankList.itemRenderer = RankItem;
        this.myRankList.itemRenderer = RankItem;
    };
    //初始化 data格式  data:[{KVDataList:[{key:"rank",value: "{"wxgame":{"score":200,"update_time":1201},"cost_ms":0}"}], nickname:"",openid:"",avatarUrl:""}, ...]
    FriendRankPanel.prototype.init = function (data) {
        console.log("Sub Main >> FriendRankPanel start init");
        //测试数据
        // for(let i=0;i<20;i++){
        // 	data[i] = {KVDataList:[{key:"rank",value: '{"wxgame":{"score":200,"update_time":1201},"cost_ms":0}'}], nickname:"陈凯",openid:"",avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLicm8mv3ia2H786MdictOnnQqCNflAPU1wza1iaDIF0hVic7A6uqyKsHIHAWKstibOXJDqSadZL6HV3xOQ/132"}
        // }
        //将data中的字符串的分数获取出来，赋值给新增动态属性score。并评判星级
        var len = data.length;
        var score;
        for (var i = len - 1; i >= 0; i--) {
            if (data[i] && data[i].KVDataList[0]) {
                score = JSON.parse(data[i].KVDataList[0].value).wxgame.score;
                data[i].score = score; //测试分数
                data[i].star = Math.ceil(score / 100); //星级 100一星， 200二星，300 三星
            }
            else {
                data.splice(i, 1);
            }
            if (data[i].openid == GameConst.openId) {
                this.myRankList.dataProvider = new eui.ArrayCollection([data[i]]);
            }
        }
        //冒泡降序排列
        len = data.length;
        var temp;
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                if (data[i].score < data[j].score) {
                    temp = data[i];
                    data[i] = data[j];
                    data[j] = temp;
                }
            }
        }
        //赋值新增动态属性排行
        for (var i = 0; i < len; i++) {
            data[i].rank = i + 1;
        }
        //赋值给排行列表
        this.rankList.dataProvider = new eui.ArrayCollection(data);
    };
    //隐藏
    FriendRankPanel.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
        this.rankList.dataProvider = new eui.ArrayCollection([]);
        this.myRankList.dataProvider = new eui.ArrayCollection([]);
        this.rankScroller.stopAnimation();
        this.rankScroller.viewport.scrollV = 0;
    };
    return FriendRankPanel;
}(eui.Component));
__reflect(FriendRankPanel.prototype, "FriendRankPanel");
/**
 * 复活界面
 * @author chenkai 2018/7/30
 */
var HeartPanel = (function (_super) {
    __extends(HeartPanel, _super);
    function HeartPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "HeartPanelSkin";
        return _this;
    }
    //初始化
    HeartPanel.prototype.init = function (data) {
        this.overBg.source = "resource/assets/game/rank_over_bg.png";
        this.headImg.source = data.avatarUrl;
        this.scoreLabel.text = JSON.parse(data.KVDataList[0].value).wxgame.score + "米";
    };
    //隐藏
    HeartPanel.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
        this.headImg.source = "";
        this.scoreLabel.text = "";
    };
    return HeartPanel;
}(eui.Component));
__reflect(HeartPanel.prototype, "HeartPanel");
/**
 * 排行列表
 * @author chenkai 2018/7/28
 */
var RankItem = (function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "RankItemSkin";
        return _this;
    }
    RankItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.rankItemBg.source = "resource/assets/game/rank_item_bg0.png";
        this.rankNoImg.source = "resource/assets/game/rank_no_bg.png";
        this.rankTitle.source = "resource/assets/game/rank_title.png";
    };
    //data格式 data:[{KVDataList:[{key:"rank",value:"wxgame:xxx"}], nickname:"",openid:"",avatarUrl:""}, ...]
    RankItem.prototype.dataChanged = function () {
        //排名
        this.rankLabel.text = "";
        if (this.data.rank == 1) {
            this.rankNoImg.source = "resource/assets/game/rank_no1.png";
        }
        else if (this.data.rank == 2) {
            this.rankNoImg.source = "resource/assets/game/rank_no2.png";
        }
        else if (this.data.rank == 3) {
            this.rankNoImg.source = "resource/assets/game/rank_no3.png";
        }
        else {
            this.rankNoImg.source = "resource/assets/game/rank_no_bg.png";
            this.rankLabel.text = this.data.rank;
        }
        //头像和昵称
        this.headImg.source = this.data.avatarUrl;
        this.nameLabel.text = this.data.nickname;
        //称号
        this.rankTitle.source = "resource/assets/game/rank_title.png";
        this.titleLabel.text = GameConst.getScoreTitle(this.data.score);
        //自己分数，特殊背景
        if (GameConst.openId == this.data.openId) {
            this.rankItemBg.source = "resource/assets/game/rank_item_bg1.png";
        }
        else {
            this.rankItemBg.source = "resource/assets/game/rank_item_bg0.png";
        }
        this.scoreLabel.text = this.data.score + "米";
        //星星
        if (this.data.star <= 1) {
            this.star0.source = "resource/assets/game/rank_star_yellow.png";
            this.star1.source = "resource/assets/game/rank_star_blue.png";
            this.star2.source = "resource/assets/game/rank_star_blue.png";
        }
        else if (this.data.star == 2) {
            this.star0.source = "resource/assets/game/rank_star_yellow.png";
            this.star1.source = "resource/assets/game/rank_star_yellow.png";
            this.star2.source = "resource/assets/game/rank_star_blue.png";
        }
        else if (this.data.star) {
            this.star0.source = "resource/assets/game/rank_star_yellow.png";
            this.star1.source = "resource/assets/game/rank_star_yellow.png";
            this.star2.source = "resource/assets/game/rank_star_yellow.png";
        }
    };
    return RankItem;
}(eui.ItemRenderer));
__reflect(RankItem.prototype, "RankItem");
;window.Main = Main;