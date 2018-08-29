/**
 * 排行榜
 * @author chenkai 2018/7/28
 */
class FriendRankPanel extends eui.Component{
	private rankScroller:eui.Scroller; //排名滚动容器
	private rankList:eui.List;   //排名列表
	private myRankList:eui.List; //自己排名

	public constructor() {
		super();
		this.skinName = "FriendRankPanelSkin";
		this.percentWidth = 100;
		this.percentHeight = 100;
	}

	protected childrenCreated(){
		this.rankList.itemRenderer = RankItem;
		this.myRankList.itemRenderer = RankItem;
	}

	//初始化 data格式  data:[{KVDataList:[{key:"rank",value: "{"wxgame":{"score":200,"update_time":1201},"cost_ms":0}"}], nickname:"",openid:"",avatarUrl:""}, ...]
	public init(data){
		console.log("Sub Main >> FriendRankPanel start init");
		//测试数据
		// for(let i=0;i<20;i++){
		// 	data[i] = {KVDataList:[{key:"rank",value: '{"wxgame":{"score":200,"update_time":1201},"cost_ms":0}'}], nickname:"陈凯",openid:"",avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLicm8mv3ia2H786MdictOnnQqCNflAPU1wza1iaDIF0hVic7A6uqyKsHIHAWKstibOXJDqSadZL6HV3xOQ/132"}
		// }

		//将data中的字符串的分数获取出来，赋值给新增动态属性score。并评判星级
		let len = data.length;
		let score;
		for(let i=len-1;i>=0;i--){
			if(data[i] && data[i].KVDataList[0]){
				score = JSON.parse(data[i].KVDataList[0].value).wxgame.score; 
				data[i].score = score; //测试分数
				data[i].star = Math.ceil(score/100);  //星级 100一星， 200二星，300 三星
			}else{
				data.splice(i,1);
			}
			if(data[i].openid == GameConst.openId){
				this.myRankList.dataProvider = new eui.ArrayCollection([data[i]]);
			}
		}
		//冒泡降序排列
		len = data.length;
		let temp;
		for(let i=0;i<len;i++){
			for(let j=i+1;j<len;j++){
				if(data[i].score < data[j].score){
					temp = data[i];
					data[i] = data[j];
					data[j] = temp;
				}
			}
		}
		//赋值新增动态属性排行
		for(let i=0;i<len;i++){
			data[i].rank = i+1;
		}
		//赋值给排行列表
		this.rankList.dataProvider = new eui.ArrayCollection(data);
	}

	//隐藏
	public hide(){
		this.parent && this.parent.removeChild(this);
		this.rankList.dataProvider = new eui.ArrayCollection([]);
		this.myRankList.dataProvider = new eui.ArrayCollection([]);
		this.rankScroller.stopAnimation();
		this.rankScroller.viewport.scrollV = 0;
		
	}
}