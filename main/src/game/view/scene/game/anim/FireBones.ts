/**
 * 人物火动画
 * @author chenkai 2018/8/21
 */
class FireBones extends BaseBone{
	public constructor() {
		super();
		this.initBinary("fire", "fire");
	}

	public play(){
		this.playAction("fire", -1);
	}

	public hide(){
		this.armatureDisplay.animation.stop();
		this.parent && this.parent.removeChild(this);
	}
}