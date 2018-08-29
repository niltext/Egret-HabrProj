var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
