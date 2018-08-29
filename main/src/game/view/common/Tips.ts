/**
 * 提示信息
 * @author chenkai 2018/7/28
 */
class Tips extends eui.Component{
	private msgLabel:eui.Label;

	public constructor() {
		super();
		this.skinName = "TipsSkin";
	}

	protected childrenCreated(){

	}

	//显示信息
	public showMsg(msg:string){
		let tips:Tips = new Tips();
		tips.msgLabel.text = msg;
		tips.x = App.StageUtils.stageWidth/2 - tips.width/2;
		tips.y = App.StageUtils.stageHeight/2 - tips.height/2;
		App.LayerManager.tipLayer.addChild(tips);
		let yPos:number = tips.y - 100;
		egret.Tween.get(tips).to({y:yPos},1500).call(()=>{
			tips.parent && tips.parent.removeChild(tips);
		},this);
	}

	//单例
	private static instance:Tips;
	public static getInstance():Tips{
		if(this.instance == null){
			this.instance = new Tips();
		}
		return this.instance;
	}
}