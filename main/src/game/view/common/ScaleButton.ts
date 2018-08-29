/**
 * 缩放Button
 * 点击会放大，释放会缩回原来大小
 * 问题：双指点击两个按钮时，松开其中一个，另外一个也会触发stageEnd
 * @author chenkai 2018/7/25
 */
class ScaleButton extends eui.Button{
	public constructor() {
		super();
	}

	protected onTouchBegin(event: egret.TouchEvent):void{
		super.onTouchBegin(event);
		this.initAnchorOffset();
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);

		this.scaleX = 1.05;
		this.scaleY = 1.05;
	}

	protected buttonReleased(){
		super.buttonReleased();

		this.scaleX = 1;
		this.scaleY = 1;
	}

	protected onTouchCancle(event: egret.TouchEvent){
		super.onTouchCancle(event);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
		this.scaleX = 1;
		this.scaleY = 1;
	}

	private onStageEnd(){
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
		this.scaleX = 1;
		this.scaleY = 1;
	}

	private initAnchorOffset(){
        if(this.anchorOffsetX != this.width/2 && this.anchorOffsetY != this.height/2){
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            this.x = this.x + this.width / 2;
            this.y = this.y + this.height / 2;
        }
    }
}