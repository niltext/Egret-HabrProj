/**
 * 首页
 * @author chenkai 2018/8/8
 */
class HomeScene extends BaseScene{
	public startBtn:eui.Button;   //开始游戏
	public resetBtn:eui.Button;   //重置数据

	public constructor() {
		super();
		this.skinName = "HomeSceneSkin";
	}

	protected childrenCreated(){
		super.childrenCreated();
	}

	public async onEnable(){
		super.onEnable();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}
	
	public onRemove(){
		super.onRemove();
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
		
	}

	public dispose(){
		super.dispose();
	}

	//点击
	private onTouchTap(e:egret.TouchEvent){
		switch(e.target){
			case this.startBtn:     //开始
				this.onStartTap();
			break;
			case this.resetBtn:     //重置数据
				this.onResetTap();
			break;
		}
	}

	/**游戏开始 */
	private onStartTap(){
		App.getInstance().sendNotification(HomeMediator.OPEN_GAME_SCENE);
	}

	/**重置数据 */
	private onResetTap(){
		App.getInstance().sendNotification(HomeMediator.SEND_RESET_DATA);
	}

	/**显示测试按钮 */
	public showDebugBtn(){
		this.startBtn.visible = true;
		this.resetBtn.visible = true;
	}

	/**隐藏测试按钮 */
	public hideDebugBtn(){
		this.startBtn.visible = false;
		this.resetBtn.visible = false;
	}

}