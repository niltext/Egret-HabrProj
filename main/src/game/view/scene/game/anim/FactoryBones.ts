/**
 * 工厂龙骨
 * @author chenkai 2018/8/18
 */
class FactoryBones extends BaseBone{
	public constructor() {
		super();
		this.initBinary("gongchang","gongchang");
	}

	//显示
	public show(doc:egret.DisplayObjectContainer){
		doc.addChild(this);
		this.scaleX = 2;  //调整大小和位置
		this.scaleY = 2;
		this.x = 360;
		this.y = 520;
		this.playAction("gongchangyunzuo",-1);
	}
}