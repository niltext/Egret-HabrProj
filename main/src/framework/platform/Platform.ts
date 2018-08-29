
interface Platform{

	//=================================================
	//==================  用户信息    ==================
	//=================================================
	/**登录 */
	login():Promise<any>;
	/**获取用户数据 */
	getUserInfo():Promise<any>;

	//=================================================
	//=====================  广告    ==================
	//=================================================

	/**创建激励视频广告 */
	createRewardedVideoAd():Promise<any>

	//=================================================
	//================  开放数据域    ==================
	//=================================================
	/**向开放数据域发送数据 */
	postMessage(obj:Object);
	/**保存用户数据 */
	setUserCloudStorage(KVDataList):Promise<any>

	//=================================================
	//======================  分享    ==================
	//=================================================
	
	/**主动拉起分享  query格式必须是 key1=val1&key2=val2 的格式*/
	shareAppMessage(title:string, imgeUrl:string, query:string):Promise<any>;
	/**更新转发属性 */
	updateShareMenu():Promise<any>;
	/**预览图片，用于更多游戏 */
	previewImage(imgUrl:string):Promise<any>;
	/**保存图片到相册 */
	toTempFilePath(x,y,w,h,dw,dh):Promise<any>;
	/**保存图片到相册 */
	saveImageToPhotosAlbum(filePath:string):Promise<any>;

	//=================================================
	//==================   系统    ====================
	//=================================================
	//获取设备信息
	getSystemInfo():Promise<any>;
	//设置调试信息
	setEnableDebug():Promise<any>;
	//获取设置信息
	getSetting():Promise<any>;
	//创建授权按钮  imgrUrl：按钮图片链接   btn：Egret中授权按钮，定位用
	createUserInfoButton(imgUrl,btn):UserInfoButton;
	
	//=================================================
	//==================   其他通用    ================
	//=================================================
	/**客服 */
	openCustomerServiceConversation():Promise<any>;
	/**获取启动参数 */
	getLaunchOptionsSync();
	/**创建论坛 */
	createGameClubButton(x,y,w,h);
	/**显示提示 */
	showToast(title:string);
	/**隐藏提示 */
	hideToast();
	/**显示loading */
	showLoading(title:string, mask:boolean);
	/**隐藏loading */
	hideLoading();
	
	//=================================================
	//==================   绘制离屏信息    =============
	//=================================================

	/**绘制离屏canvas */
	showShareCanvas();
	/**隐藏离屏canvas */
	hideShareCanvas();
}

/**
 * 微信平台
 * @author chenkai 2018/7/25
 */
class WxPlatform implements Platform{

	//=================================================
	//==================  用户信息    ==================
	//=================================================
	/**登陆 */
    async login() {
        return new Promise((resolve, reject) => {
            wx.login({
				success:(res)=>{
                    console.log("WxPlatform >> login success:",res);
                    resolve(res)
                },
				fail:(res)=>{
					console.log("WxPlatform >> login fail:",res);
					reject();
				},
				complete:(res)=>{
					
				}
            })
        })
    }

	/**获取用户信息 */
	async getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials: true,
                success:(res)=>{
                    console.log("WxPlatform >> getUserInfo success:",res);
                    resolve(res);
                },
				fail:(res)=>{
					console.log("WxPlatform >> getUserInfo fail:",res);
					reject();
				},
				complete:(res)=>{

				}
            })
        })
    }

	

	//=================================================
	//=====================  广告    ==================
	//=================================================

	/**创建激励视频广告 */
	public createRewardedVideoAd(){
		return new Promise((resolve, reject) => {
			//创建广告
			let rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: 'xxxx' });

			//播放广告。如果失败，则重新拉取一次
			rewardedVideoAd.show()
			.catch(err => {
				rewardedVideoAd.load()
				.then(() => rewardedVideoAd.show())
			})

			//广告关闭
			rewardedVideoAd.onClose(res => {
				// 用户点击了【关闭广告】按钮，小于 2.1.0 的基础库版本，res 是一个 undefined
				if (res && res.isEnded || res === undefined) {
					// 正常播放结束，可以下发游戏奖励
					resolve();
				}
				else {
					// 播放中途退出，不下发游戏奖励
					reject();
				}
			});
		});
		
	}

	//=================================================
	//================  开放数据域    ==================
	//=================================================

	/**
	 * 向开放数据域发送消息 
	 * @param obj  {cmd:value1, key1:value1, ...} 
	*/
	public postMessage(obj:Object){
		let openDataContext = wx.getOpenDataContext();
		openDataContext.postMessage({
			data:obj
		});
	}	

	/**保存用户数据 */
	public setUserCloudStorage(KVDataList){
		return new Promise((resolve, reject) => {
			wx.setUserCloudStorage({
				KVDataList: KVDataList,
				success: function (res) {
					console.log("WxPlatform >> setUserCloudStorage success:", res);
					resolve();
				},
				fail:function(res){
					
				},
				complete:function(res){

				}
			})
		})
	}

	//=================================================
	//======================  分享    ==================
	//=================================================
	
	/**主动拉起分享  query格式必须是 key1=val1&key2=val2 的格式*/
	async shareAppMessage(title:string, imgeUrl:string, query:string){
		return new Promise((resolve, reject) => {
			wx.shareAppMessage({
				title:title,
				imageUrl:imgeUrl,
				query:query,
				success:function(res){
					console.log("WxPlatform >> shareAppMessage success:",res);
					resolve(res);
				},
				fail:function(res){
					console.log("WxPlatform >> shareAppMessage fail");
				},
				complete:function(res){
					console.log("WxPlatform >> shareAppMessage complete");
				}
			});
		});
	}
	
	/**更新转发属性 */
	public updateShareMenu(){
		return new Promise((resolve, reject) => {
			wx.updateShareMenu({
				withShareTicket:true,
				success:function(res){
					console.log("WxPlatform >> 更新转发属性成功",res);
				},
				fail:function(res){
					
				},
				complete:function(res){

				}
			})
		});
	}

	/**预览图片，用于更多游戏 */
	public previewImage(imgUrl:string){
		return new Promise((resolve, reject) => {
			wx.previewImage({
				urls:[imgUrl]
			});
		});
	}


	/**保存图片到相册 */
	public async toTempFilePath(x,y,w,h,dw,dh){
		let systemInfo:any = await this.getSystemInfo();

		return new Promise((resolve, reject) => {
			let xRate =  systemInfo.windowWidth*systemInfo.pixelRatio/App.StageUtils.stageWidth;
			let yRate = systemInfo.windowHeight*systemInfo.pixelRatio/App.StageUtils.stageHeight;
			x = x*xRate;
			y = y*yRate;
			w = w*xRate;
			h = h*yRate;

			canvas.toTempFilePath({
				x: x,
				y: y,
				width: w,
				height: h,
				destWidth: w,
				destHeight: h,
				success: (res)=> {
				console.log("WxPlatform >> toTempFilePath success:", res.tempFilePath);
					resolve(res.tempFilePath);
				},
				faile:(res)=>{
					console.log("WxPlatform >> toTempFilePath fail:");
				}
			});
		});
		
	}

	/**保存图片到相册 */
	public saveImageToPhotosAlbum(filePath:string){
		return new Promise((resolve, reject) => {
			wx.saveImageToPhotosAlbum({filePath:filePath, 
				success:(res)=>{
					console.log("WxPlatform >> saveImageToPhotosAlbum success");
				},
				fail:(res)=>{
					console.log("WxPlatform >> saveImageToPhotosAlbum fail");
				},
				complete:(res)=>{
					
				}
			   });
		});
		
	}

	//=================================================
	//==================   系统    ====================
	//=================================================

	//获取设备信息
	public getSystemInfo(){
		return new Promise((resolve, reject) => {
			wx.getSystemInfo({
				success:(res)=>{
					console.log("WxPlatform >> getSystemInfo:", res);
					resolve(res);
				}
			})
		});
	}

	//设置调试信息
	public setEnableDebug(){
		return new Promise((resolve, reject) => {
			wx.setEnableDebug({
					enableDebug:true,
					success:(res)=>{

						},
					fail:(res)=>{

					},complete:(res)=>{
						
					}
				});
		});
	}

	//检查是否授权
	public getSetting(){
		return new Promise((resolve, reject) => {
			wx.getSetting({success:(res)=>{
				console.log("Platform >> getSetting:", res);
				//未授权
				if(res.authSetting == null || res.authSetting["scope.userInfo"] == null || res.authSetting["scope.userInfo"] == false){
					reject();
				//已授权
				}else{	
					resolve();
				}
			},fail:(res)=>{
				console.log("Platform >> getSetting fail");
				reject();
			},complete:(res)=>{
				console.log("Platform >> getSetting complete");
			}});
		});
	}

	//创建授权按钮  
	public createUserInfoButton(imgUrl:string, btn:egret.DisplayObject):UserInfoButton{
		let xRate =  window.innerWidth/App.StageUtils.stageWidth;
		let yRate = window.innerHeight/App.StageUtils.stageHeight;
		let button = wx.createUserInfoButton({
					type: 'image',
					image: imgUrl,
					style: {
						left: btn.x*xRate,
						top: btn.y*yRate,
						width: btn.width*xRate,
						height: btn.height*yRate,
					}
				});
		return button;
		/* 显示、点击和销毁示例
		button.show();
		button.onTap((res)=>{
			console.log(res);
			if(res.errMsg == "getUserInfo:ok"){
				button.hide();
				button.destroy();
			}	
		});
		*/
	}
	

	//=================================================
	//==================   其他通用    ================
	//=================================================

	/**客服 */
	public openCustomerServiceConversation(){
		return new Promise((resolve, reject) => {
			wx.openCustomerServiceConversation({
				success: (res) => {
					console.log("WxPlatform >> customerService success:",res);
				},
				fail:(res)=>{
					console.log("WxPlatform >> customerService fail:",res);
				},
				complete:(res)=>{
					console.log("WxPlatform >> customerService complete:",res);
				}
			});
		});
		
	}

	/**获取启动参数 */
	public getLaunchOptionsSync(){
		return wx.getLaunchOptionsSync();
	}

	/**创建论坛 */
	public createGameClubButton(x,y,w,h){
		return wx.createGameClubButton({
				type:"image",
				icon: 'light',
				style: {
					left: x,
					top: y,
					width: w,
					height: h
				}
			});
	}

	/**显示提示 */
	public showToast(title:string, duration:number = 1000){
		wx.showToast({title:title, duration:duration});
	}
	/**隐藏提示 */
	public hideToast(){
		wx.hideToast({});
	}
	/**显示loading */
	public showLoading(title:string, mask:boolean = false){
		wx.showLoading({title:title,mask:mask,
        success:(res)=>{
		
        },
        fail:(res)=>{
           
        }});
	}
	/**隐藏loading */
	public hideLoading(){
		wx.hideLoading({});
	}
	

	//=================================================
	//==================   绘制离屏信息    =============
	//=================================================

	private bitmap:egret.Bitmap;
	private bitmapdata:egret.BitmapData;
	/**绘制离屏canvas */
	public showShareCanvas(){
        console.log("绘制离屏Canvas");
		this.bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
		this.bitmapdata.$deleteSource = false;
		const texture = new egret.Texture();
		texture._setBitmapData(this.bitmapdata);
		this.bitmap = new egret.Bitmap(texture);
		this.bitmap.width = App.StageUtils.stage.stageWidth;
		this.bitmap.height = App.StageUtils.stage.stageHeight;
		App.LayerManager.topLayer.addChild(this.bitmap);
		egret.startTick(this.webGL, this);
	}

	private webGL(timeStarmp: number){
		egret.WebGLUtils.deleteWebGLTexture(this.bitmapdata.webGLTexture);
		this.bitmapdata.webGLTexture = null;
		return false;
	}

	/**隐藏离屏canvas */
	public hideShareCanvas(){
		if(this.bitmap){
			this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
			this.bitmap.$bitmapData.$dispose();
			egret.stopTick(this.webGL,this);
		}
	}
}



/**
 * 调试
 * @author chenkai 2018/8/2
 */
class DebugPlatform implements Platform{

	//=================================================
	//==================  用户信息    ==================
	//=================================================
	/**登陆 */
    async login() {
        return {code:"test"};
    }

	/**获取用户信息 */
	async getUserInfo() {
        return {};
    }

	//=================================================
	//=====================  广告    ==================
	//=================================================

	/**创建激励视频广告 */
	public createRewardedVideoAd(){
		return new Promise((resolve, reject)=>{
			resolve();
		});
	}

	//=================================================
	//================  开放数据域    ==================
	//=================================================

	/**
	 * 向开放数据域发送消息 
	 * @param obj  {cmd:value1, key1:value1, ...} 
	*/
	public postMessage(obj:Object){
		
	}	

	/**保存用户数据 */
	public setUserCloudStorage(KVDataList){
		return new Promise((resolve, reject)=>{
			resolve();
		});
	}

	//=================================================
	//======================  分享    ==================
	//=================================================
	
	/**主动拉起分享  query格式必须是 key1=val1&key2=val2 的格式*/
	async shareAppMessage(title:string, imgeUrl:string, query:string){
		return new Promise((resolve, reject)=>{
			resolve();
		});
	}
	
	/**更新转发属性 */
	public updateShareMenu(){
		return new Promise((resolve, reject)=>{
			resolve();
		});
	}

	/**预览图片，用于更多游戏 */
	public previewImage(imgUrl:string){
		return new Promise((resolve, reject)=>{
			resolve();
		});
	}


	/**保存图片到相册 */
	public async toTempFilePath(x,y,w,h,dw,dh){
		return new Promise((resolve, reject)=>{
			resolve();
		});
	}

	/**保存图片到相册 */
	public saveImageToPhotosAlbum(filePath:string){
		return new Promise((resolve, reject)=>{
			resolve();
		});
	}

	//=================================================
	//==================   系统    ====================
	//=================================================
	//获取设备信息
	public getSystemInfo(){
		return new Promise((resolve, reject)=>{
			resolve();
		});
	}
	//设置调试信息
	public setEnableDebug(){
		return new Promise((resolve, reject)=>{
			resolve();
		});
	}
	//获取设置信息
	public getSetting(){
		return new Promise((resolve, reject)=>{
			resolve();
		});
	}
	//创建授权按钮
	public createUserInfoButton(imgUrl,btn):UserInfoButton{
		return null;
	}

	//=================================================
	//==================   其他通用    ================
	//=================================================

	/**客服 */
	public openCustomerServiceConversation(){
		return new Promise((resolve, reject)=>{
			resolve();
		});
	}

	/**获取启动参数 */
	public getLaunchOptionsSync(){
		return {};
	}

	/**创建论坛 */
	public createGameClubButton(x,y,w,h){
		return {};
	}

	/**显示提示 */
	public showToast(title:string, duration:number = 1000){
		App.Tips.showMsg(title);
	}
	/**隐藏提示 */
	public hideToast(){
		wx.hideToast({});
	}
	/**显示loading */
	public showLoading(title:string, mask:boolean){

	}
	/**隐藏loading */
	public hideLoading(){
			
	}
	

	//=================================================
	//==================   绘制离屏信息    =============
	//=================================================
	/**绘制离屏canvas */
	public showShareCanvas(){
       
	}

	private webGL(timeStarmp: number){

	}

	/**隐藏离屏canvas */
	public hideShareCanvas(){
		
	}	
}


if (!window.platform) {
	if(0){
		window.platform = new DebugPlatform();
	}else{
		window.platform = new WxPlatform();
	}	
}

declare let platform: Platform;

declare interface Window {
    platform: Platform
}