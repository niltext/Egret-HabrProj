/**
 * 排行列表
 * @author chenkai 2018/7/28
 */
class RankItem extends eui.ItemRenderer{
	private rankTitle:eui.Image;    //称号背景
	private rankItemBg:eui.Image;   //背景
	private rankLabel:eui.Label;    //排名文本
	private rankNoImg:eui.Image;    //排名背景
	private headImg:eui.Image;      //头像
	private nameLabel:eui.Label;    //昵称
	private titleLabel:eui.Label;   //称号
	private scoreLabel:eui.Label;   //分数
	private star0:eui.Image;        //星星
	private star1:eui.Image;
	private star2:eui.Image;

	public constructor() {
		super();
		this.skinName = "RankItemSkin";
	}

	protected childrenCreated(){
		super.childrenCreated();

		this.rankItemBg.source = "resource/assets/game/rank_item_bg0.png";
		this.rankNoImg.source = "resource/assets/game/rank_no_bg.png";
		this.rankTitle.source = "resource/assets/game/rank_title.png";
	}

	//data格式 data:[{KVDataList:[{key:"rank",value:"wxgame:xxx"}], nickname:"",openid:"",avatarUrl:""}, ...]
	protected dataChanged(){
		//排名
		this.rankLabel.text = "";
		if(this.data.rank == 1){
			this.rankNoImg.source = "resource/assets/game/rank_no1.png";
		}else if(this.data.rank == 2){
			this.rankNoImg.source = "resource/assets/game/rank_no2.png";
		}else if(this.data.rank == 3){
			this.rankNoImg.source = "resource/assets/game/rank_no3.png";
		}else{
			this.rankNoImg.source = "resource/assets/game/rank_no_bg.png";
			this.rankLabel.text = this.data.rank;
		}
		//头像和昵称
		this.headImg.source = this.data.avatarUrl;
		this.nameLabel.text = this.data.nickname;
		//称号
		this.rankTitle.source = "resource/assets/game/rank_title.png";
		this.titleLabel.text = GameConst.getScoreTitle(this.data.score);
		//自己分数，特殊背景
		if(GameConst.openId == this.data.openId){
			this.rankItemBg.source = "resource/assets/game/rank_item_bg1.png";
		}else{
			this.rankItemBg.source = "resource/assets/game/rank_item_bg0.png";
		}
		this.scoreLabel.text = this.data.score + "米";
		//星星
		if(this.data.star <= 1){
			this.star0.source = "resource/assets/game/rank_star_yellow.png";
			this.star1.source = "resource/assets/game/rank_star_blue.png";
			this.star2.source = "resource/assets/game/rank_star_blue.png";
		}else if(this.data.star == 2){
			this.star0.source = "resource/assets/game/rank_star_yellow.png";
			this.star1.source = "resource/assets/game/rank_star_yellow.png";
			this.star2.source = "resource/assets/game/rank_star_blue.png";
		}else if(this.data.star){
			this.star0.source = "resource/assets/game/rank_star_yellow.png";
			this.star1.source = "resource/assets/game/rank_star_yellow.png";
			this.star2.source = "resource/assets/game/rank_star_yellow.png";
		}
	}
}