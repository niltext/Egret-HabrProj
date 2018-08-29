/**
 * 屏幕锁定  
 * 使用一个全屏的rect遮挡舞台
 * @author chenkai 2018/8/24
 */
class ScreenLock extends SingleClass{
	public rect:eui.Rect;

	public constructor() {
		super();
		this.rect = new eui.Rect();
		this.rect.width = App.StageUtils.stage.width;
		this.rect.height = App.StageUtils.stage.height;
		this.rect.alpha = 0;
	}

	public lock(){
		App.LayerManager.lockLayer.addChild(this.rect);
	}

	public unLock(){
		this.rect.parent && this.rect.parent.removeChild(this.rect);
	}
}