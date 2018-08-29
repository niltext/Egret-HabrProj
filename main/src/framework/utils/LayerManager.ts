/**
 * 图层管理类
 * @author chenkai 2016/12/23
 */
class LayerManager extends SingleClass{
	/**场景层*/
	public sceneLayer:eui.UILayer;
	/**弹框层*/
	public panelLayer:eui.UILayer;
	/**对话层 */
	public dialogLayer:eui.UILayer;
	/**锁定层 */
	public lockLayer:eui.UILayer;
	/**提示层*/
	public tipLayer:eui.UILayer;
	/**顶层 */
	public topLayer:eui.UILayer;

	public constructor() {
		super();

		var stage:egret.Stage = App.StageUtils.stage;

		this.sceneLayer = new eui.UILayer();
		this.sceneLayer.percentWidth = 100;
		this.sceneLayer.percentHeight = 100;
		this.sceneLayer.touchEnabled = false;
		stage.addChild(this.sceneLayer);

		this.panelLayer = new eui.UILayer();
		this.panelLayer.percentWidth = 100;
		this.panelLayer.percentHeight = 100;
		this.panelLayer.touchEnabled = false;
		stage.addChild(this.panelLayer);

		this.dialogLayer = new eui.UILayer();
		this.dialogLayer.percentWidth = 100;
		this.dialogLayer.percentHeight = 100;
		this.dialogLayer.touchEnabled = false;
		stage.addChild(this.dialogLayer);

		this.lockLayer = new eui.UILayer();
		this.lockLayer.percentWidth = 100;
		this.lockLayer.percentHeight = 100;
		this.lockLayer.touchEnabled = false;
		stage.addChild(this.lockLayer);

		this.tipLayer = new eui.UILayer();
		this.tipLayer.percentWidth = 100;
		this.tipLayer.percentHeight = 100;
		this.tipLayer.touchEnabled = false;
		stage.addChild(this.tipLayer);

		this.topLayer = new eui.UILayer();
		this.topLayer.percentWidth = 100;
		this.topLayer.percentHeight = 100;
		this.topLayer.touchEnabled = false;
		stage.addChild(this.topLayer);
		
	}

	

}