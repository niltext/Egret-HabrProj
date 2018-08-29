/**
 * 弹框基类
 * @description 用于功能模块，例如人物面板、技能面板等
 * @author chenkai 2016/12/18
 */
class BasePanel extends eui.Component{
	/**面板名 */
	public panelName:string = "";
	/**内容Group */
	protected contentGroup:eui.Group;

	public constructor() {
		super();
        this.percentWidth = 100;
        this.percentHeight = 100;
	}

	/**添加到舞台时在PanelManager中调用
	 *@param data 传递参数 
	 */
	public onEnable(data:any = null){

	}

	/**从舞台移除时在PanelManager中调用*/
	public onRemove(){
		
	}

	/**播放弹框入场动画 */
    protected playEnterAnim(){
        if(this.contentGroup){
			egret.Tween.get(this.contentGroup).set({scaleX:0,scaleY:0}).to({scaleX:1, scaleY:1},300,egret.Ease.backOut);
        }
    }

	/**销毁 */
	public dispose(){
		egret.Tween.removeTweens(this);
	}
}