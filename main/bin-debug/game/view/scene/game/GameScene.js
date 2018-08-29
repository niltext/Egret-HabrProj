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
    GameScene.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
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
        //心跳计时
        this.startHeartTimer();
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
        var data = {
            openid: App.DataCenter.loginInfo.openId,
            money: sum,
            ids: ids
        };
        if (sum > 0) {
            App.Http.doPost(ProtoUrl.COLLECT_MONEY, data, function (res) {
                if (res.status == 200) {
                    console.log("收集金币成功，当前金币:", res.data);
                }
                else {
                    console.log("收集金币失败:", res.msg);
                }
            }, this, false);
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
    //开启同步计时器
    GameScene.prototype.startHeartTimer = function () {
        this.heartTimer || (this.heartTimer = new egret.Timer(20000));
        this.heartTimer.addEventListener(egret.TimerEvent.TIMER, this.onHeartTimer, this);
        this.heartTimer.start();
    };
    //同步计时器
    GameScene.prototype.onHeartTimer = function () {
        App.Http.doGet(ProtoUrl.USER_ONLINE + App.DataCenter.loginInfo.openId, function (res) {
            if (res.status == 200) {
                console.log("心跳");
            }
        }, this);
    };
    //停止同步计时器
    GameScene.prototype.stopHeartTimer = function () {
        if (this.heartTimer) {
            this.heartTimer.stop();
            this.heartTimer.removeEventListener(egret.TimerEvent.TIMER, this.onHeartTimer, this);
            this.heartTimer = null;
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
