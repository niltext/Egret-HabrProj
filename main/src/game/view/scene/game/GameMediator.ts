/**
 * 游戏视图代理
 * @author chenkai 2018/8/28
 */
class GameMediator extends puremvc.Mediator{
	public static NAME:string  = "GameMediator";

	//=============== 事件 =======================
	/**发送收集产品 */
	public static SEND_COLLECTION_PRODUCT:string = "SEND_COLLECTION_PRODUCT";

	//================ View =======================
	public gameScene:GameScene;  //游戏场景

	public constructor() {
		super(GameMediator.NAME);
	}
	
	public onRegister(): void{
		this.gameScene = App.SceneManager.open(GameScene) as GameScene;
		this.sendNotification(AppMediator.START_HEART_TIMER);
	}

	public onRemove(): void{

	}

	public listNotificationInterests(): string[]{
		return [GameMediator.SEND_COLLECTION_PRODUCT];
	}

	public handleNotification(notification: puremvc.INotification): void{
		switch(notification.getName()){
			case GameMediator.SEND_COLLECTION_PRODUCT:
				this.onSendCollectionProduct(notification.getBody());
			break;
		}
	}

	/**
	 * 发送收集产品消息
	 */
	public onSendCollectionProduct(data){
		App.Http.doPost(ProtoUrl.COLLECT_MONEY, data, (res)=>{
			if(res.status == 200){
				console.log("收集金币成功，当前金币:", res.data);
			}else{
				console.log("收集金币失败:", res.msg);
			}
		},this,false);
	}
}