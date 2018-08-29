/**
 * Http请求类 (只能序列发送，不能并列发送多条)
 * @description 序列发送http请求
 * @author chenkai  2016/12/18
 * @example
 * doPost("http://xxxxx", {head:"login",account:"chenkai"}, this.revLogin, this);
 * doGet("http:///xxxxx?a=1", this.reLogin, this);
 */
class Http extends SingleClass{
	/**Request*/
	private request:egret.HttpRequest;
	/**发送缓存*/
	private cacheList = [];
	/**当前发送内容*/
	private curSend;
	/**请求状态*/
	private requesting:boolean = false;

	public constructor(){
		super();
		this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.addEventListener(egret.Event.COMPLETE,this.onSendComplete,this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onSendIOError,this);
	}

	/**
	 * POST请求
	 * @url 访问地址
	 * @json 消息字符串 (json格式)
	 * @cb 回调
	 * @thisObj 回调执行对象
	 * @bMask 是否遮罩
	 */
	public doPost(url:string, json:any, cb:Function, thisObj:any, bMask:boolean = true){
		this.send(url, json, cb, thisObj, egret.HttpMethod.POST, bMask);
	}

	/**
	 * Get请求
	 * @url 访问地址
	 * @cb 回调
	 * @thisObj 回调执行对象
	 * @bMask 是否遮罩
	 */
	public doGet(url:string ,cb:Function, thisObj:any, bMask:boolean = true){
		this.send(url, null,cb, thisObj, egret.HttpMethod.GET, bMask);
	}

	/**
	 * 发送
	 * @url 访问地址
	 * @json 消息字符串 (json格式)
	 * @callBack 回调
	 * @thisObject 回调执行对象
	 * @httpMethod 请求方式
	 * @bMask 是否遮罩
	 */
    private send(url:string, json:any, cb:Function, thisObj:any, httpMethod:any, bMask:boolean = true){
		url = ProtoUrl.preUrl + url;
		//保存请求数据
        this.cacheList.push({json:json, cb:cb, obj:thisObj, url:url,httpMethod:httpMethod, bMask:bMask});
		//请求数据
		this.next();
	}

	/**发送下一条*/
	private next(){
		//当前正在发送时，需要等待
		if(this.requesting){
			return;
		}
		//全部发送完成，停止发送
		if(this.cacheList.length == 0){
			this.hideLoadAnim();
			return;
		}
		//获取数组第一条待发送包
		this.curSend = this.cacheList.shift();
		//显示加载动画
		this.curSend.bMask && this.showLoadAnim();
		//发送数据
		this.request.open(this.curSend.url ,this.curSend.httpMethod);
		//设置编码 JSON:application/json  application/x-www-form-urlencoded
        this.request.setRequestHeader("Content-type","application/json");
		//根据POST和GET方式，选择是否发送msg数据
		if(this.curSend.httpMethod == egret.HttpMethod.POST){
			console.log("Http >> 发送POST请求:",this.curSend.url, JSON.stringify(this.curSend.json));
			this.request.send(JSON.stringify(this.curSend.json));
		}else{
			console.log("Http >> 发送GET请求:",this.curSend.url);
			this.request.send();
		}
		//设置发送状态
		this.requesting = true;

		
	}
	
	/**发送完成*/
	private onSendComplete(e:egret.Event):void{
		console.log("Http >> 返回:", JSON.parse(this.request.response));
		//隐藏遮罩
		this.curSend.bMask && this.hideLoadAnim();
		
		//执行回调
		if(this.curSend.cb && this.curSend.obj){
			let cb = this.curSend.cb;
			let obj = this.curSend.obj;
			cb.call(obj, JSON.parse(this.request.response));
		}
		
		//重置数据
		this.curSend = null;
		this.requesting = false;
		//发送下一条
		this.next();
	}
	
	/**发送失败*/
	private onSendIOError(e:egret.IOErrorEvent):void{
		 console.error("Http send error");
    	 this.requesting = false;
		 this.hideLoadAnim();
		 App.EventManager.sendEvent(EventConst.HTTP_ERROR);
		 App.Tips.showMsg("网络请求失败");
	}

	/**发送失败时，继续发送失败的请求 */
	public resume(){
		this.cacheList.push(this.curSend);
		this.next();
	}

	/**删除所有请求*/
	public clearAllRequest(){
		this.request.abort();
		this.curSend = null;
		this.cacheList.length = 0;
		this.hideLoadAnim();
	}

	/**显示加载等待动画 */
	private showLoadAnim(){
		App.ScreeLock.lock();
		egret.Tween.get(this).wait(2000).call(()=>{
			platform.showLoading("网络请求中",false);
		},this);
		
	}

	/**隐藏加载等待动画 */
	private hideLoadAnim(){
		App.ScreeLock.unLock();
		platform.hideLoading();
		egret.Tween.removeTweens(this);
	}
}
