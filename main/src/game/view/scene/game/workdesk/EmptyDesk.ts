/**
 * 空的工作台
 * @author chenkai 2018/8/8
 */
class EmptyDesk extends BaseDesk{
	public cos:number = 0;      //解锁所需金币

	public constructor() {
		super();
		this.skinName = "EmptyDeskSkin";
		this.touchChildren = false;
		this.touchEnabled = false;
	}

	protected childrenCreated(){
		
	}
}