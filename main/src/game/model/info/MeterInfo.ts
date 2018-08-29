/**
 * 增益计信息
 * @author chenkai 2018/8/9
 */
class MeterInfo {
	public clickStep:number = 0;      //每一次点击增益计增加的数值
	public holdStep:number = 0;       //按住不动得增益增加数值
	public reduceStep:number = 0;     //每一帧减少的值
	public maxMeterValue:number = 0;  //增益计的最大值
	public FastestValue:number = 0;   //最快速度，当max状态时最高速度
	
	public curMeterValue:number = 0;  //增益计的值
	public state:MeterState = MeterState.Normal; //增益计状态
	public bHolding:boolean = false;  //是否长按状态

	public clickReduceTime:number = 0;//每一次点击减少的制造时间，单位S


	public config = {};  //配置文件
	
	public saveConfig(data){
		this.clickStep = data.clickStep;
		this.holdStep = data.holdStep;
		this.reduceStep = data.reduceStep;
		this.maxMeterValue = data.maxMeterValue;
		this.FastestValue = data.FastestValue;
		this.clickReduceTime = data.clickReduceTime; 
	}

	//改变增益计状态
	public changeState(state:MeterState){
		this.state = state;
		App.EventManager.sendEvent(EventConst.METER_STATE, this.state);
	}

	//点击舞台，增加效率
	public clickAddEffect(addStep:number){
		//增加效率
		let maxMeterValue = App.DataCenter.meterInfo.maxMeterValue;
		if(this.curMeterValue < maxMeterValue){
			this.curMeterValue += addStep;
			if(this.curMeterValue > maxMeterValue){
				this.curMeterValue = maxMeterValue;
				//最大值时，MAX状态
				this.changeState(MeterState.MAX);
			}
		}
	}

	//降低效率
	public reduceEffect(){
		if(this.bHolding){
			return;
		}
		if(this.curMeterValue > 0){
			this.curMeterValue -= App.DataCenter.meterInfo.reduceStep;
		}else{
			//降低到零时
			this.curMeterValue = 0;

			//如果是强化状态，则进入睡眠
			if(this.state == MeterState.MAX){
				this.changeState(MeterState.Sleep);
			}
		}
	}
}

/**增益计状态 */
enum MeterState{
	Normal = 0,   //正常
	MAX = 1,      //最大值
	Sleep = 2     //休眠
}