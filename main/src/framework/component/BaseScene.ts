/**
 * 场景
 * @description 用于登录、大厅、游戏等场景界面
 * @author chenkai 2016/12/18
 */
class BaseScene extends eui.Component{
	
	public constructor(){
		super();
		this.percentWidth = 100;
        this.percentHeight = 100;
	}

	/**显示到舞台
	 *@param data 传递参数 
	 */
	public onEnable(data:any = null){
		
	}

	/**从舞台移除*/
	public onRemove(){
		
	}

	/**销毁 */
	public dispose(){
		
	}

	/**
     * 监听事件
     * @param type 事件类型
     * @param listener 回调函数
     * @param thisObject 回调执行对象
     */
	public addEvent(type:string, listener:Function, thisObject:any){
		App.EventManager.addEvent(type, listener, thisObject);
	}

	/**
     * 移除事件
     * @param type 事件类型
     * @param listener 回调函数
     * @param thisObject 回调执行对象
     */
    public removeEvent(type:string ,listener, thisObject:any){
		App.EventManager.removeEvent(type, listener, thisObject);
	}

}

/*  复制粘贴用
	protected childrenCreated(){
		super.childrenCreated();
		
	}

	public onEnable(){
		super.onEnable();

	}

	public onRemove(){
		super.onRemove();

	}

	public onDestroy(){
		super.onDestroy();

	}

 */