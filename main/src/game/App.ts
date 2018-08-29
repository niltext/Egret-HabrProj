/**
 * App主类
 * @author chenkai  2018/6/14
 */
class App extends puremvc.Facade{

	//单例
	private static appInstance:App;
	public static getInstance():App{
		if(this.appInstance == null){
			this.appInstance = new App();
		}
		return this.appInstance;
	}

	/**资源加载类 */
	public static get ResUtils():ResUtils{
		return ResUtils.getInstance();
	}
	/**舞台管理类*/
	public static get StageUtils():StageUtils{
		return StageUtils.getInstance();
	}

	/**弹框管理类*/
	public static get PanelManager():PanelManager{
		return PanelManager.getInstance();
	}

	/**场景管理类*/
	public static get SceneManager():SceneManager{
		return SceneManager.getInstance();
	}

	/**图层管理类*/
	public static get LayerManager():LayerManager{
		return LayerManager.getInstance();
	}
	
	/**声音管理类*/
	public static get SoundManager():SoundManager{
    	return SoundManager.getInstance();
	}
	
	/**设备管理类*/
	public static get DeviceUtils():DeviceUtils{
    	return DeviceUtils.getInstance();
	}

	/**全局事件类 */
	public static get EventManager():EventMananger{
		return EventMananger.getInstance();
	}

	/**数据中心*/
	public static get DataCenter():DataCenter{
    	return DataCenter.getInstance();
	}

	/**Http请求*/
	public static get Http():Http{
		return Http.getInstance();
	}

	/**对象池 */
	public static get ObjectPool():ObjectPool{
		return ObjectPool.getInstance();
	}

	/**提示信息 */
	public static get Tips():Tips{
		return Tips.getInstance();
	}

	/**屏幕锁定 */
	public static get ScreeLock():ScreenLock{
		return ScreenLock.getInstance();
	}

}















