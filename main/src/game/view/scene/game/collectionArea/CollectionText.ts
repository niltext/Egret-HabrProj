/**
 * 收集的文本
 * @author chenkai 2018/8/9
 */
class CollectionText extends eui.Component{
	public numLab:eui.Label;

	public constructor() {
		super();
		this.skinName = "CollectionTextSkin";
	}

	//飞行 
	public fly(startX:number, startY:number , endX:number ,endY:number, doc:egret.DisplayObjectContainer){
		this.x = startX;
		this.y = startY;
		doc.addChild(this);
		egret.Tween.get(this).to({x:endX, y:endY}, 1000).call(()=>{
			this.parent && this.parent.removeChild(this);
			App.ObjectPool.getPool(CollectionText).returnObject(this);
		});
	}

	public setNumLab(gold:number){
		this.numLab.text = NumberTool.formatMoney(gold);
	}
}