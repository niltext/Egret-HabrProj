/**
 * 收集金币龙骨动画   (后修改，不需要龙骨了)
 * @author chenkai 2018/8/21
 */
class GoldBones extends eui.Image{
	//收集的金币数
	public gold:number = 0;

	public constructor() {
		super();
		this.texture = RES.getRes("com_col_gold_png");
		this.anchorOffsetX = this.width/2;
		this.anchorOffsetY = this.height/2;
	}

	//回收
	public recyle(){
		this.parent && this.parent.removeChild(this);
		App.ObjectPool.getPool(GoldBones).returnObject(this);
	}
}