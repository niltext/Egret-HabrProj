/**
 * 弹框面板加载类
 * @author chenkai 2016/12/23
 */
class PanelManager extends SingleClass {
    /**面板实例*/
    private panelMap = {};
    /**面板所需资源组*/
    private groupMap = {};
    /**加载等待动画 如果为null，不显示*/
    private loadAnim:egret.DisplayObject;
    /**当前打开的Panel */
    private curPanel:BasePanel;

	/**
	 * @注册
	 * @panelClass 弹框类定义
     * @panel      弹框实例
     * @groupName  弹框资源组
	 */
    public register(panelClass:any, panel:BasePanel) {
        this.panelMap[panelClass] = panel;
    }

    /**
     * 注销弹框
     * @panelClass 弹框类定义
     */
    public unRegister(panelClass:any){
        let panel:BasePanel = this.panelMap[panelClass];
        if(panel){
            delete this.panelMap[panelClass];
        }
        return panel;
    }

	/**
	 * 打开弹框面板。若不存在，则尝试创建一个；若需要实时加载资源，则加载完成后打开。
	 * @panelClass 弹框类定义
     * @data 传入数据
	 * @reutrn 返回打开的面板
	 */
    public open(panelClass: any,data:any = null): BasePanel {
        var panel: BasePanel = this.panelMap[panelClass];

        //如果panel不存在，则尝试新建一个
        if(panel == null){
            panel = new panelClass();
            this.register(panelClass, panel);
        }

        //如果panel存在，则打开
        if(panel) {
            //如果panel已经显示到舞台，则不再重复显示
            if(panel.parent == null){
                //监听舞台事件
                panel.once(egret.Event.ADDED_TO_STAGE,() => {
                    panel.onEnable(data);
                },this);
                panel.once(egret.Event.REMOVED_FROM_STAGE,() => {
                    panel.onRemove();
                },this);

                //未加载资源组，则加载资源后打开
                let groupName: string = this.groupMap[panelClass];
                if(groupName != null && App.ResUtils.isGroupLoaded(groupName) == false) {
                    this.showLoadAnim();
                    App.ResUtils.loadGroup(groupName,null,() => {
                        this.hideLoadAnim();
                        App.LayerManager.panelLayer.addChild(panel);
                    },this);
                //已加载资源组，直接打开
                } else {
                    App.LayerManager.panelLayer.addChild(panel);
                }
            }else{
                console.log("PanelManager >> 弹框已打开:",panelClass);
            }

            //设置当前面板
            this.curPanel = panel;
        }else{
            console.log("PanelManager >> 弹框不存在:",panelClass);
        }

        return panel;
    }

	/**
	 * 关闭弹框
	 * @panelClass 弹框类定义
	*/
    public close(panelClass:any) {
        let panel: BasePanel = this.panelMap[panelClass];
        if(panel) {
            panel.parent && panel.parent.removeChild(panel);
        }

    }

    /**关闭所有弹框*/
    public closeAll() {
        for(var key in this.panelMap) {
            this.close(key);
        }
    }

    /**销毁Panel */
    public destoryPanel(panelClass:any){
        let panel:BasePanel = this.panelMap[panelClass];
            if(panel){
                this.close(panelClass);
                delete this.panelMap[panelClass];
                delete this.groupMap[panelClass];
                if(panel == this.curPanel){
                    this.curPanel = null;
                }
                panel.dispose();
                console.log("销毁panel", panelClass);
            }
    }

    /**销毁所有Panel */
    public destoryAllPanel(){
        for(let key in this.panelMap){
            this.destoryPanel(key);
        }
    }

    /**显示加载动画 */
    private showLoadAnim(){
        this.loadAnim && App.LayerManager.lockLayer.addChild(this.loadAnim);
    }

    /**隐藏加载动画 */
    private hideLoadAnim(){
        this.loadAnim && this.loadAnim.parent && this.loadAnim.parent.removeChild(this.loadAnim);
    }


}