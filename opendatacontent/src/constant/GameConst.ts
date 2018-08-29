/**
 * 游戏常量
 * @author chenkai 2018/7/29
 */
class GameConst {
	//============================= 用户信息 ==============================
	public static openId:string = "";   //openId
	public static maxScore:number = 0;  //好友排行榜中我的最高分数


	//============================== 等级 ===================================
	//等级名称
	//public static levelName = ["飞跃","乘风","米格","暴龙","子弹","雷诺","锐速","狂风","圣徒","幻想","冰魄","刀锋","雷霆","光速"];
	public static levelName = ["头盔哥","隔壁老王","单身汪","绿帽哥","夜猫君","全村的希望","包治百病","天生萌货","国民女流氓","限量版逗比","超级小正太","富家子弟","奔跑吧奶奶","小猪佩奇"];

	//根据分数获取等级  50分一个等级
	public static getLevel(score:number){
		let level:number = Math.ceil(score/50);
		level = level<=14?level:14;  
		return level;
	}

	//根据分数获取等级称号
	public static getScoreTitle(score:number):string{
		let level = GameConst.getLevel(score);
		return GameConst.levelName[level - 1];
	}
}