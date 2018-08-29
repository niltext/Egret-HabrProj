/**
 * App代理(处理全局事件)
 * @author chenkai 2018/8/28
 */
class AppMediator extends puremvc.Mediator{
	public static NAME:string = "AppMediator";
	//================== 事件 ========================
	/**启动心跳计时器 */
	public static START_HEART_TIMER:string = "START_HEART_TIMER";
	
	//==================== View ======================
	public heartTimer:egret.Timer;     //心跳计时器

	public constructor() {
		super();
	}


	public onRegister(): void{

	}

	public onRemove(): void{

	}

	public listNotificationInterests(): string[]{
		return [AppMediator.START_HEART_TIMER];
	}

	public handleNotification(notification: puremvc.INotification): void{
		switch(notification.getName()){
			case AppMediator.START_HEART_TIMER:
				this.startHeartTimer();
			break;
		}
	}

	//开启同步计时器
	public startHeartTimer(){
		this.heartTimer || (this.heartTimer = new egret.Timer(20000));
		this.heartTimer.addEventListener(egret.TimerEvent.TIMER, this.onHeartTimer, this);
		this.heartTimer.start();
	}

	//同步计时器
	private onHeartTimer(){
		App.Http.doGet(ProtoUrl.USER_ONLINE +App.DataCenter.loginInfo.openId, (res)=>{
			if(res.status == 200){
				console.log("心跳");
			}
		},this);
	}

	//停止同步计时器
	private stopHeartTimer(){
		if(this.heartTimer){
			this.heartTimer.stop();
			this.heartTimer.removeEventListener(egret.TimerEvent.TIMER, this.onHeartTimer, this);
			this.heartTimer = null;
		}
	}
	
}