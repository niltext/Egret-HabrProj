/**
 * 工人
 * @author chenkai 2018/8/20
 */
class WorkMan extends BaseBone{
	public constructor() {
		super();
		this.initBinary("gongchangren","gongchangren");
	}

	//播放工作
	public playWork(){
		this.armatureDisplay.animation.gotoAndPlayByTime("work",0.5, -1);
	}

	//播放工作完成
	public playWorkPush(){
		this.playAction("work_push",1);
	}

	//播放睡眠
	public playSleep(){
		this.playAction("sleep",-1);
	}

	//设置播放速率
	public setTimeScale(value:number){
		this.armatureDisplay.animation.timeScale = value;
	}

}