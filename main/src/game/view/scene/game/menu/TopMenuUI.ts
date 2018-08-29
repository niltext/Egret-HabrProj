/**
 * 工厂UI
 * @author chenkai 2018/8/9
 */
class TopMenuUI extends eui.Component{
	public headImg:eui.Image;        //头像
	public headMask:eui.Image;       //头像遮罩

	public goldImg:eui.Image;        //金币图片
	public goldLab:eui.BitmapLabel;  //金币

	public factoryNameImg:eui.Image; //工厂名

	public factoryBar:eui.Image;     //工厂等级进度条
	public factoryBarMask:eui.Rect;  //工厂等级进度条遮罩
	public factoryLevelLab:eui.BitmapLabel;  //工厂等级

	public curPt:eui.Image;          //当前、上一个、下一个产品
	public lastPt:eui.Image;
	public nextPt:eui.Image;

	public constructor() {
		super();
		this.skinName = "TopMenuUISkin";
	}

	protected childrenCreated(){
		//头像
		this.headImg.mask = this.headMask;
		this.headImg.source = App.DataCenter.userInfo.avatarUrl;
		//工厂等级进度条
		this.factoryBar.mask = this.factoryBarMask;
	}

	/**刷新视图 金币、等级等 */
	public updateView(){
		let factoryInfo:FactoryInfo = App.DataCenter.factoryInfo;
		//金币
		this.goldLab.text = NumberTool.formatMoney(factoryInfo.curMoney);
		//名称
		this.factoryNameImg.source = RES.getRes("topmenu_name" + factoryInfo.getFactoryScale() + "_png");
		//工厂等级进度
		this.factoryBarMask.scaleX = factoryInfo.curExp/factoryInfo.nextExp;
		this.factoryLevelLab.text = factoryInfo.curLevel + "";
	}

	/**刷新金币 */
	public updateMoney(){
		let factoryInfo:FactoryInfo = App.DataCenter.factoryInfo;
		this.goldLab.text = NumberTool.formatMoney(factoryInfo.curMoney);
	}

	/**播放金币缩放动画 */
	public playGoldAnim(){
		this.goldImg.scaleX = 1;
		this.goldImg.scaleY = 1;
		egret.Tween.get(this.goldImg).to({scaleX:1.2, scaleY:1.2},200).to({scaleX:1, scaleY:1},200);
	}
}