/**
 * 增益计
 * @author chenkai 2018/8/9
 */
class EffectMeterUI extends eui.Component{
	public proBar:eui.Image;       //进度条
	public proMask:eui.Image;      //进度条遮罩
	public maxIcon:eui.Image;      //max

	public constructor() {
		super();
		this.skinName = "EffectBufferUISkin";
	}

	protected childrenCreated(){
		this.proBar.mask = this.proMask;
		this.setMaxIcon(false);
	}

	//设置进度条 0-100
	public setProgress(value:number){
		this.proMask.scaleY = value;
	}

	//增益计每帧渲染
	public workRender(){
		//每帧降低效率
		App.DataCenter.meterInfo.reduceEffect();
		//更新进度条
		this.setProgress(App.DataCenter.meterInfo.curMeterValue/App.DataCenter.meterInfo.maxMeterValue);
	}

	//设置最大值icon显示
	public setMaxIcon(value:boolean){
		this.maxIcon.visible = value;
	}

}