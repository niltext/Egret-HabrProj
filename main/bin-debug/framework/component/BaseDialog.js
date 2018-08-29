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
