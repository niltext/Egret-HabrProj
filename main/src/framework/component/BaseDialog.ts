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
class BaseDialog extends eui.Component{
	protected contentGroup:eui.Group;  //内容Group
	protected okBtn:eui.Button;        //确定按钮
	protected cancelBtn:eui.Button;    //取消按钮
	protected titleLabel:eui.Label;    //标题
	protected contentLabel:eui.Label;  //内容

	protected okCB:Function;           //确定回调
	protected cancelCB:Function;       //取消回调
	protected thisObject:any;          //回调执行对象

	public constructor() {
		super();
		this.percentWidth = 100;
		this.percentHeight = 100;
	}
	
	/**
	 * 显示
	 */
	public show(){
		this.okBtn && CommonBtn.addClick(this.okBtn, this.onConfirm, this, ComBtnType.Click);
		this.cancelBtn && CommonBtn.addClick(this.cancelBtn, this.onCancel, this, ComBtnType.Close);
		App.LayerManager.dialogLayer.addChild(this);
		this.playEnterAnim();
	}



	//播放弹框入场动画
    protected playEnterAnim(){
        if(this.contentGroup){
		    egret.Tween.get(this.contentGroup).set({scaleX:0,scaleY:0}).to({scaleX:1, scaleY:1},300,egret.Ease.backOut);
        }
    }

	/**设置标题
	 * @param title 标题
	 */
	public setTitle(title:string){
		this.titleLabel && (this.titleLabel.text = title);
	}

	/**设置信息内容 
	 * @param content 内容
	 */
	public setContent(content:string){
		this.contentLabel && (this.contentLabel.text = content);
	}

	/**设置确定回调 
	 * @param callBack 确认回调函数
	 * @param thisObject 回调函数执行对象
	 */
	public setOk(callBack:Function, thisObject:any){
		this.okCB = callBack;
		this.thisObject = thisObject;
	}

	/**
	 * 设置取消回调
	 * @param callBack 取消回调函数
	 * @param thisObject 回调函数执行对象
	 */
	public setCancel(callBack:Function, thisObject:any){
		this.cancelCB = callBack;
		this.thisObject = thisObject;
	}

	/**确认回调，回调后自动销毁*/
	protected onConfirm(){
		if(this.okCB && this.thisObject){
			this.okCB.apply(this.thisObject);
		}
	}

	/**取消回调，回调后自动销毁*/
	protected onCancel(){
		if(this.cancelCB && this.thisObject){
			this.cancelCB.apply(this.thisObject);
		}
		this.destoryMe();
	}

	/**销毁 */
	public destoryMe(){
		//隐藏
		this.parent && this.parent.removeChild(this);
		egret.Tween.removeTweens(this);

		//移除监听
		this.okBtn &&  CommonBtn.removeClick(this.okBtn, this.onConfirm, this);
		this.cancelBtn && CommonBtn.removeClick(this.cancelBtn, this.onCancel, this);

		//重置界面
		this.titleLabel && (this.titleLabel.text = "");
		this.contentLabel && (this.contentLabel.text = "");

		//删除回调
		this.cancelCB = null;
		this.okCB = null;
		this.thisObject = null;
	}
	
}