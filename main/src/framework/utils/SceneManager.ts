/**
 * 场景管理类
 * @author chenkai 2016/12/23
 */
class SceneManager extends SingleClass {
    /**面板实例*/
    private sceneMap = {};
    /**当前场景*/
    private curScene: BaseScene;

    public constructor() {
        super();
    }

	/**
	 * 注册场景
	 * @sceneClass 场景类定义
	 * @scene      场景实例
	 */
    public register(sceneClass: any, scene:BaseScene) {
        if(this.sceneMap[sceneClass] != null){
            console.log("SceneManager >> 场景已存在:",sceneClass);
            return;
        }
        this.sceneMap[sceneClass] = scene;
    }

    /**
     * 注销场景
     * @sceneClass 场景类定义
     */
    public unRegister(sceneClass:any){
        let scene:BaseScene = this.sceneMap[sceneClass]
        if(scene != null){
            delete this.sceneMap[sceneClass];
        }
        return scene;
    }

	/**
	 * 打开场景
	 * @sceneName 场景类定义
     * @data 传入数据
	 */
    public open(sceneClass: any, data:any =null):BaseScene {
        var scene: BaseScene = this.sceneMap[sceneClass];

        //如果scene不存在，则尝试新建一个
        if(scene == null){
            scene = new sceneClass();
            this.register(sceneClass, scene);
        }

        //如果scene存在，则打开
        if(scene) {
            //如果scene已经显示到舞台，则不重复显示
            if(scene.parent == null){

                //保存场景
                let removeScene:BaseScene = this.curScene;
                this.curScene = scene;

                //移除当前场景
                if(removeScene){
                    removeScene.parent && removeScene.parent.removeChild(removeScene);
                }
               
                //监听事件
                scene.once(egret.Event.ADDED_TO_STAGE,() => {
                    scene.onEnable(data);
                },this);
                scene.once(egret.Event.REMOVED_FROM_STAGE,() => {
                        scene.onRemove();
                    },this);
                
                //显示open的场景
                App.LayerManager.sceneLayer.addChild(scene);
            }else{
                console.error("SceneManager >> 场景重复打开:", sceneClass);
            }
            
        }else{
            console.error("SceneManager >> 场景不存在:", sceneClass);
        }

        return scene;
    }

    /**
     * 获取场景
     * @sceneClass 场景类定义
     */
    public getScene(sceneClass:any){
        return this.sceneMap[sceneClass];
    }

	/**
	 * 获取当前场景
	 */
    public getCurScene(): BaseScene {
        return this.curScene;
    }

    /**销毁场景 */
    public destoryScene(sceneClass:any){
        let scene:BaseScene = this.sceneMap[sceneClass];
        if(scene){
            scene.parent && scene.parent.removeChild(scene);
            scene.dispose();
            delete this.sceneMap[sceneClass];
            if(scene == this.curScene){
                this.curScene = null;
            }
        }
    }

    /**销毁所有场景 */
    public destoryAllScene(){
        for(let key in this.sceneMap){
            this.destoryScene(key);
        }
        this.curScene = null;
    }
}