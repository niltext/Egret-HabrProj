/**
 * 加载视图代理
 * @author chenkai 2018/8/28
 */
class LoadMediator extends puremvc.Mediator{
	public static NAME:string = "LoadMediator";

	//================ View ======================
	public loadScene:LoadScene;   //加载场景


	public constructor() {
		super(LoadMediator.NAME);
	}

	public onRegister(): void{
		//打开加载场景
		this.loadScene =  App.SceneManager.open(LoadScene) as LoadScene;
		//开始加载资源
		this.startLoad();
	}

	public onRemove(): void{
		App.SceneManager.destoryScene(LoadScene);
		this.loadScene = null;
	}


	//开始加载
	public startLoad(){
		platform.showLoading("加载资源中",true);
		this.loadScene.setProgress(0);
		//分包加载
		const loadTask = wx.loadSubpackage({
			name: 'game',
			success: (res)=> {
				console.log("LoadMediator >> 加载分包成功");
				this.loadRes();
			},
			fail: (res)=> {
				console.log("LoadMediator >>  加载分包失败");
				App.Tips.showMsg("加载资源失败");
			},
			complete:(res)=>{
				console.log("LoadMediator >>  加载分包完成");
			}	
		})
		
		loadTask.onProgressUpdate((res) => {
			// console.log('已经下载的数据长度', res.totalBytesWritten);
			// console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite);
			// console.log('加载进度', res.progress);
		}); 
	}

	//加载资源
	public async loadRes(){
		await RES.loadGroup("game");

		//跳转到主页
		platform.hideLoading();
		this.facade.removeMediator(LoadMediator.NAME);
		this.facade.registerMediator(new HomeMediator());
	}
}