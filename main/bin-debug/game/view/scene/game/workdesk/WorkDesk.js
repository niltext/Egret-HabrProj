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
