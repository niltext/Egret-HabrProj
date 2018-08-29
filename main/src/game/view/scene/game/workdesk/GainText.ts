/**
 * 获得金币的飘动字体
 * @author chenkai 2018/8/10
 */
class GainText extends eui.Component{
	public numLab:eui.BitmapLabel;  //数字文本

	public constructor() {
		super();
		this.skinName = "GainTextSkin";
		this.touchEnabled = false;
		this.touchChildren = false;
	}

	/**
	 * 显示
	 * @param num 显示的数字
	 * @param doc 显示的容器
	 */
	public show(num:number, x:number, y:number, doc:egret.DisplayObjectContainer){
		this.numLab.text = "+" + NumberTool.formatMoney(num);
		this.x = x;
		this.y = y;
		doc.addChild(this);
		egret.Tween.get(this).to({y:y-50},1000).call(()=>{
			this.parent && this.parent.removeChild(this);
			App.ObjectPool.getPool(GainText).returnObject(this);
		})
	}
}