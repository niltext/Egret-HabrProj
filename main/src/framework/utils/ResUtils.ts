/**
 * 资源加载
 * @description 1.单个或多个资源组加载 
 *              2.配置文件加载
 *              3.版本号配置
 * @author chenkai
 * 
 * @example
 * //添加配置文件，并加载配置文件
 * App.ResUtils.addConfig("resource/default.res.json", "resource/");
 * App.ResUtils.loadConfig(this.onConfigComplete, this);
 * 
 * //加载单个资源组
 * App.ResUtils.loadGroup("preload", this.onComplete,this.onProgress, this);
 * 
 * //加载多个资源组
 * App.ResUtils.loadGroups("newGroupName",["preload","home"],this.onComplete,this.onProgress, this);
 */
class ResUtils extends SingleClass {
    /**保存资源组名*/
    private groupMap: any;
    /**资源配置文件*/
    private configs: Array<any>;
    /**资源配置加载完成回调*/
    private onConfigComplete: Function;
    /**资源配置加载完成回调执行对象*/
    private onConfigCompleteTarget: any;

    /**
     * 构造函数
     */
    public constructor() {
        super();

        this.initVersion();

        this.groupMap = {};
        this.configs = new Array<any>();

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceLoadProgress,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
    }

    /**
     * 初始化版本号
     */
    private initVersion() {
        // var version = window["version"];
        // if(version == null){
        //     console.warn("version not init");
        //     return;
        // }
        // console.log("版本号:",version);
        // RES.web.Html5VersionController.prototype.getVirtualUrl = function(url) {
        //     if(url.indexOf("?") == -1) {
        //         url += "?v=" + version;
        //     } else {
        //         url += "&v=" + version;
        //     }
        //     return url;
        // }
    }


	/**
     * 添加一个配置文件
     * @param jsonPath resource.json路径
     * @param filePath 访问资源路径
     */
    public addConfig(jsonPath: string,filePath: string): void {
        this.configs.push([jsonPath,filePath]);
    }

    /**
     * 开始加载配置文件
     * @param onConfigComplete 加载完成执行函数
     * @param onConfigCompleteTarget 加载完成执行函数所属对象
     */
    public loadConfig(onConfigComplete: Function,onConfigCompleteTarget: any): void {
        this.onConfigComplete = onConfigComplete;
        this.onConfigCompleteTarget = onConfigCompleteTarget;
        this.loadNextConfig();
    }

    /**
     * 加载
     */
    private loadNextConfig(): void {
        //加载完成
        if(this.configs.length == 0) {
            this.onConfigComplete.call(this.onConfigCompleteTarget);
            this.onConfigComplete = null;
            this.onConfigCompleteTarget = null;
            return;
        }

        var arr: any = this.configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigCompleteHandle,this);
        RES.loadConfig(arr[0],arr[1]);
    }

    /**
     * 加载完成
     * @param event
     */
    private onConfigCompleteHandle(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigCompleteHandle,this);
        this.loadNextConfig();
    }
    
    /**
     * 加载资源组
     * @group     支持单个或多个资源组加载。例如单个资源组 group = "Preload"，多个资源组group = ["Preload", "Game"]
     * @onProgress 加载进度回调
     * @onComplete 加载完成回调
     * @thisObject 回调执行对象
     */
    public loadGroup(group, onProgress:Function = null,onComplete: Function = null,thisObject: any = null) {
        let groupName:string = this.combGroupName(group);
        if(thisObject != null && (onComplete != null || onProgress != null)){
            this.groupMap[groupName] = [onComplete,onProgress,thisObject];
        }
        RES.loadGroup(groupName);
    }

    /**
     * 资源组是否已加载
     */
    public isGroupLoaded(groupName:string){
        return RES.isGroupLoaded(groupName);
    }

    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        var groupName: string = event.groupName;
        console.log("ResUtils >> 加载资源组完成:" + groupName);
        if(this.groupMap[groupName]) {
            var loadComplete: Function = this.groupMap[groupName][0];
            var loadCompleteTarget: any = this.groupMap[groupName][2];
            if(loadComplete != null && loadCompleteTarget != null) {
                loadComplete.call(loadCompleteTarget);
            }

            this.groupMap[groupName] = null;
            delete this.groupMap[groupName];
        }
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(event: RES.ResourceEvent): void {
        var groupName: string = event.groupName;
        if(this.groupMap[groupName]) {
            var loadProgress: Function = this.groupMap[groupName][1];
            var loadProgressTarget: any = this.groupMap[groupName][2];
            if(loadProgress != null && loadProgressTarget != null) {
                loadProgress.call(loadProgressTarget,event);
            }
        }
    }

    /**
     * 资源组加载失败
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        console.error("ResUtils >> 加载资源组错误:" + event.groupName);
        this.onResourceLoadComplete(event);
    }

    /**
	 * 拼接资源组名
	 * @group 资源数组
	 * @return 资源组名
	 */
	private combGroupName(group):string{
        var groupName = "";
        if(typeof (group) == "string") {
            groupName = group;
        } else {
            var len = group.length;
            for(var i=0;i<len;i++){
                groupName += group[i];
            }
            RES.createGroup(groupName,group);
        }
		return groupName;
	}

    /**清理加载回调*/
    public clearAllCallBack() {
        for(var key in this.groupMap) {
            this.groupMap[key] = null;
            delete this.groupMap[key];
        }
    }
}