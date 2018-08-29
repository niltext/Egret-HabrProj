/**
 * 主页视图代理
 * @author chenkai 2018/8/28
 */
class HomeMediator extends puremvc.Mediator{
	public static NAME:string = "HomeMediator";

	//================= 事件 =======================
	/**打开游戏场景 */
	public static OPEN_GAME_SCENE:string = "OPEN_GAME_SCENE";
	/**重置用户数据 */
	public static SEND_RESET_DATA:string = "SEND_RESET_DATA";

	//================== View ==========================
	public homeScene:HomeScene;    //主页场景

	public constructor() {
		super(HomeMediator.NAME);
	}

	public onRegister(): void{
		this.homeScene = App.SceneManager.open(HomeScene) as HomeScene;
		this.checkSetting();
	}

	public onRemove(): void{
		App.SceneManager.destoryScene(HomeScene);
		this.homeScene = null;
	}

	public listNotificationInterests():string[]{
		return [HomeMediator.OPEN_GAME_SCENE,
				HomeMediator.SEND_RESET_DATA];
	}

	public handleNotification(notification: puremvc.INotification): void{
		switch(notification.getName()){
			case HomeMediator.OPEN_GAME_SCENE:
				this.onOpenGameScene();
			break;
			case HomeMediator.SEND_RESET_DATA:
				this.onSendResetData();
			break;
		}
	}
	
	//打开游戏场景
	private onOpenGameScene(){
		this.facade.removeMediator(HomeMediator.NAME);
		this.facade.registerMediator(new GameMediator());
	}

	//重置数据
	private onSendResetData(){
		platform.showLoading("重置数据", true);
		App.Http.doGet(ProtoUrl.CLEAR_USER_INFO + App.DataCenter.userInfo.id,(res)=>{
			if(res.status == 200){
				this.login();
			}else{
				App.Tips.showMsg(res.msg);
			}
		},this);
	}

	//检查设置信息
	public checkSetting(){
		platform.showLoading("检查授权", true);
		platform.getSetting().then(()=>{
			//已授权，开始登陆
			this.login();
		},()=>{
			//未授权，显示授权按钮
			platform.hideLoading();
			this.homeScene.hideDebugBtn();
			this.createUserInfoButton();
		});
	}

	//创建授权按钮
	private createUserInfoButton(){
		let button:UserInfoButton = platform.createUserInfoButton("resource/assets/home/home_start.png", this.homeScene.startBtn);
		button.show();
		button.onTap((res)=>{
			console.log(res);
			if(res.errMsg == "getUserInfo:ok"){
				button.hide();
				button.destroy();
				//授权成功，登陆
				this.login();
			}	
		});
	}

	//登录
	public async login(){
		platform.showLoading("登录中", true);
		//录入配置文件
		App.DataCenter.factoryInfo.saveConfig(RES.getRes("Factory_json"));
		App.DataCenter.deskInfo.saveConfig(RES.getRes("Workbench_json"));
		App.DataCenter.deskInfo.saveOpenConfig(RES.getRes("Workbench_open_json"));
		App.DataCenter.meterInfo.saveConfig(RES.getRes("Meter_json"));
		App.DataCenter.produceInfo.saveConfig(RES.getRes("Produce_json"));
		//微信登录 获取code
        let loginInfo:any = await platform.login();
		App.DataCenter.loginInfo.code = loginInfo.code;
		//获取用户信息
		let userInfo:any = await platform.getUserInfo();
		let rawData:any = JSON.parse(userInfo.rawData);
		App.DataCenter.userInfo.saveData(rawData);
		//请求服务器获取openid
		App.Http.doPost(ProtoUrl.GET_OPENID, {code:loginInfo.code,nickname:rawData.nickName,headUrl:rawData.avatarUrl},this.revOpenId, this);	
	}

	//接收openid
	private revOpenId(res){
		if(res.status == 200){
			App.DataCenter.loginInfo.openId = res.data;
			//获取用户信息
			App.Http.doGet(ProtoUrl.GET_USER_INFO + App.DataCenter.loginInfo.openId, this.revUserInfo, this);
		}else{
			platform.hideLoading();
			App.Tips.showMsg(res.msg);
		}
	}

	//接收用户信息
	private revUserInfo(res){
		if(res.status == 200){
			App.DataCenter.factoryInfo.saveData(res);
			App.DataCenter.deskInfo.saveData(res);
			App.DataCenter.userInfo.id = res.data.baseUser.id;
			//获取离线收益
			App.Http.doGet(ProtoUrl.OFF_LINE_EARNINGS + App.DataCenter.loginInfo.openId, this.revOffLine ,this);
		}else{
			platform.hideLoading();
			App.Tips.showMsg(res.msg);
		}
	}

	//接收离线收益
	private revOffLine(res){
		if(res.status == 200){
			App.DataCenter.deskInfo.saveOffLine(res);
			console.log("离线收益:" + App.DataCenter.deskInfo.offLineTotal);
		}
		
		platform.hideLoading();
		//显示调试按钮
		this.homeScene.showDebugBtn();
	}

	
}