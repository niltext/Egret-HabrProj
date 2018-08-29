/**
 * 升级选项
 * @author chenkai 2018/8/15
 */
class LevelUpItem extends eui.Component{
	public levelUpGroup:eui.Group;      //升级Group
	public starLab:eui.BitmapLabel;     //星阶
	public levelLab:eui.BitmapLabel;    //等级
	public goldLab:eui.BitmapLabel;     //金币
	public bar:eui.Image;               //进度条
	public barMask:eui.Rect;            //进度条遮罩

	public unlockGroup:eui.Group;       //解锁Group
	public cosLab:eui.BitmapLabel;      //消耗文本

	public id:number = 0;               //id
	public workbenchNo:number = 0;      //桌子编号
	public level:number = 0;            //等级

	public constructor() {
		super();
		this.skinName = "LevelUpItemSkin";
		this.touchChildren = false;
	}

	protected childrenCreated(){
		this.bar.mask = this.barMask;
	}	

	//设置显示
	public setView(id:number, workbenchNo:number,level:number, cos:number){
		this.id = id;
		this.workbenchNo = workbenchNo;
		this.level = level;
		
		if(level == 0){
			this.levelUpGroup.visible = false;
			this.unlockGroup.visible = true;
			this.cosLab.text =  NumberTool.formatMoney(cos);
		}else{
			this.levelUpGroup.visible = true;
			this.unlockGroup.visible = false;
			this.starLab.text = App.DataCenter.deskInfo.getStar(workbenchNo, level) + "";
			this.levelLab.text = level + "";
			this.goldLab.text =  NumberTool.formatMoney(App.DataCenter.deskInfo.getUpdateCos(workbenchNo, level));
			this.setProgress(App.DataCenter.deskInfo.getLevelUpPro(workbenchNo, level));
		}
	}

	//设置进度 0-1
	public setProgress(value:number){
		this.barMask.scaleX = value;
	}

}