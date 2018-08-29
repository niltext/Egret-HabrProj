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
