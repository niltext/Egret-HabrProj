/**
 * 复活界面
 * @author chenkai 2018/7/30
 */
class HeartPanel extends eui.Component{
	private overBg:eui.Image;
	private headImg:eui.Image;     //头像
	private scoreLabel:eui.Label;  //分数

	public constructor() {
		super();
		this.skinName = "HeartPanelSkin";
	}

	//初始化
	public init(data){   //data格式 data = {KVDataList:[{key:"rank",value:"wxgame:xxx"}], nickname:"",openid:"",avatarUrl:""}
		this.overBg.source = "resource/assets/game/rank_over_bg.png";
		this.headImg.source = data.avatarUrl;
		this.scoreLabel.text = JSON.parse(data.KVDataList[0].value).wxgame.score + "米";
	}

	//隐藏
	public hide(){
		this.parent && this.parent.removeChild(this);
		this.headImg.source = "";
		this.scoreLabel.text = "";
	}
}