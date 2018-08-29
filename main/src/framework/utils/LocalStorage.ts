/**
 * 本地数据保存
 */
class LocalStorage {
	//单例
	private static instance:LocalStorage;
	public static getInstance():LocalStorage{
		if(this.instance == null){
			this.instance = new LocalStorage();
		}
		return this.instance;
	}


	//临时用户数据   调试阶段在点击收集和升级、解锁时保存一次
	public userInfo = {
		factoryLvl:1,
		factoryExp:0,
		factoryMoney:0,
		workDeskList:[
			{id:0,type:1,level:1,product:0},
			{id:1,type:0,level:1,product:0},
			{id:2,type:0,level:1,product:0},
			{id:3,type:0,level:1,product:0},
			{id:4,type:0,level:1,product:0},
			{id:5,type:0,level:1,product:0},
			{id:6,type:0,level:1,product:0},
			{id:7,type:0,level:1,product:0},
			{id:8,type:0,level:1,product:0}
		]
	}

	//保存用户数据
	public saveUserInfo(userInfo){
		console.log("LocalStorage >> 保存用户数据:", userInfo);
		egret.localStorage.setItem("userInfo", JSON.stringify(userInfo));
	}

	//获取用户数据
	public getUserInfo(){
		let userInfo = egret.localStorage.getItem("userInfo");
		if(userInfo == null || userInfo == ""){
			console.log("LocalStorage >> 获取用户数据:", null);
			return this.userInfo;
		}else{
			console.log("LocalStorage >> 获取用户数据:", JSON.parse(userInfo));
			return JSON.parse(egret.localStorage.getItem("userInfo"));
		}
	}

	//清理本地数据
	public clearUserInfo(){
		console.log("LocalStorage >> 清理用户数据");
		egret.localStorage.setItem("userInfo", "");
	}
}