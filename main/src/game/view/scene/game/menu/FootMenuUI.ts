/**
 * 底部菜单按钮
 * @author chenkai 2018/8/10
 */
class FootMenuUI extends eui.Component{
	public levelUpBtn:eui.RadioButton;
	public picBtn:eui.RadioButton;
	public taskBtn:eui.RadioButton;
	public colBtn:eui.Button;
	public goldLab:eui.BitmapLabel;
	public taskGroup:eui.Group;
	public taskLab:eui.BitmapLabel;

	public constructor() {
		super();
		this.skinName = "FootMenuUISkin";
	}

	protected childrenCreated(){
		
	}


	public downAllBtn(){
		this.levelUpBtn.selected = false;
		this.picBtn.selected = false;
		this.taskBtn.selected = false;
	}

	//设置金币显示
	public setGoldLab(gold:number){
		this.goldLab.text =  NumberTool.formatMoney(gold);
	}

	//设置任务提示
	public setTaskLab(num:number){
		
	}
}