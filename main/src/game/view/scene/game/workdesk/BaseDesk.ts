/**
 * 工作台基类
 * @author chenkai 2018/8/8
 */
class BaseDesk extends eui.Component{
	public id:number = 0;            //桌子id
	public workbenchNo:number = 0;   //桌子编号
	public type:number = 0;          //桌子类型 0空的工作台 1运转中工作台
	
	 
	public constructor() {
		super();
		this.touchChildren = false;
	}

	public hide(){
		this.parent && this.parent.removeChild(this);
	}
}