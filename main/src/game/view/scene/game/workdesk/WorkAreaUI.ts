/**
 * 工作区域
 * @author chenkai 2018/8/10
 */
class WorkAreaUI extends eui.Component {
	public deskGroup:eui.Group;                //工作台Group
	public deskList:Array<BaseDesk> = [];      //工作台数组
	public workDeskList:Array<WorkDesk> = [];  //运转中工作台数组

	public levelUpGroup:eui.Group;             //升级Group
	public rect:eui.Rect;                      //升级蒙版
	public leveUpList:Array<LevelUpItem> = []; //升级数组

	public constructor() {
		super();
		this.skinName = "WorkAreaUISkin";
		this.touchEnabled = false;
	}

	protected childrenCreated(){
		
	}

	//初始化工作台
	public initDesk(){
		//保存工作台对象到数组
		let len = this.deskGroup.numChildren;
		let desk:BaseDesk;
		for(let i=0;i<len;i++){
			desk = this.deskGroup.getChildAt(i) as BaseDesk;
			this.deskList.push(desk);
		}

		//设置工作台属性
		let deskData = App.DataCenter.deskInfo.deskData;
		for(let i=0;i<deskData.length;i++){
			this.setDesk(deskData[i]);
		}

		//设置工作台皮肤
		this.setProductSkin();
	}

	//设置工作台
	public setDesk(deskVO:DeskVO){
		//移除原有工作台
		let desk:BaseDesk = this.deskList[deskVO.workbenchNo - 1];  //workbenchNo从1开始，数组索引从0开始
		desk.hide();
		//新建未解锁工作台
		if(deskVO.type == DeskType.Empty){
			let emptyDesk:EmptyDesk = new EmptyDesk();
			emptyDesk.id = deskVO.id;
			emptyDesk.x = desk.x;
			emptyDesk.y = desk.y;
			this.deskGroup.addChild(emptyDesk);
			this.deskList[deskVO.workbenchNo - 1] = emptyDesk;
			emptyDesk.workbenchNo = deskVO.workbenchNo;
			emptyDesk.type = deskVO.type;
			emptyDesk.cos = App.DataCenter.deskInfo.cosList[deskVO.workbenchNo - 1]; 
			
		//新建已解锁工作台
		}else if(deskVO.type == DeskType.Work){
			let workDesk:WorkDesk = new WorkDesk();
			workDesk.id = deskVO.id;
			workDesk.x = desk.x;
			workDesk.y = desk.y;
			this.deskGroup.addChild(workDesk);
			this.deskGroup.setChildIndex(workDesk, deskVO.workbenchNo - 1);
			this.deskList[deskVO.workbenchNo - 1] = workDesk;
			workDesk.workbenchNo = deskVO.workbenchNo;
			workDesk.type = deskVO.type;
			workDesk.level = deskVO.level;
			this.workDeskList.push(workDesk);
			workDesk.updateView();
			this.setProductSkin();
			this.setManSkin(deskVO.workbenchNo - 1);
			workDesk.addProduct(deskVO.product, false);
		}
	}

	//工作台渲染
	public workRender(){
		let len = this.workDeskList.length;
		for(let i=0;i<len;i++){
			this.workDeskList[i].workRender();
		}
	}

	//解锁桌子
	public sendUnLockDesk(workbenchNo:number){
		//获取未解锁桌子
		let emptyDesk:EmptyDesk = this.deskList[workbenchNo - 1] as EmptyDesk;
		//判断金币是否足够
		if(App.DataCenter.factoryInfo.curMoney < emptyDesk.cos){
			App.Tips.showMsg("金币不足");
			return;
		}

		//派发解锁事件
		App.EventManager.sendEvent(EventConst.UNLOCK_DESK, emptyDesk.workbenchNo);
	}

	//接收解锁桌子
	public revUnLockDesk(id:number){
		let workbenchNo:number = this.getDeskByID(id).workbenchNo;
		let emptyDesk:EmptyDesk = this.deskList[workbenchNo - 1] as EmptyDesk;
		//刷新金币
		App.DataCenter.factoryInfo.curMoney -= emptyDesk.cos;
		App.EventManager.sendEvent(EventConst.UPDATE_MONEY);
		App.Tips.showMsg("解锁成功");

		//刷新解锁的levelupItem图标
		let levelupItem:LevelUpItem = this.leveUpList[workbenchNo - 1];
		levelupItem.setView(emptyDesk.id, workbenchNo, 1, 0);

		//创建运转中工作台
		let deskVO:DeskVO = new DeskVO();
		deskVO.workbenchNo = workbenchNo;
		deskVO.type = DeskType.Work;
		deskVO.level = 1;
		deskVO.product = 0;
		deskVO.id = emptyDesk.id;
		this.setDesk(deskVO);
	}

	//初始化升级界面
	public initLevelUpItem(){
		let len = this.levelUpGroup.numChildren;
		for(let i=0;i<len;i++){
			this.leveUpList.push(this.levelUpGroup.getChildAt(i) as LevelUpItem);
		}
	}

	//显示升级界面
	public showLevelUp(){
		//显示蒙版
		this.rect.width = App.StageUtils.stageWidth;
		this.rect.height = App.StageUtils.stageHeight;
		App.LayerManager.panelLayer.addChild(this.rect);
		//显示升级图标
		let len = this.leveUpList.length;
		for(let i=0;i<len;i++){
			let desk:BaseDesk = this.deskList[i];
			let levelUpItem:LevelUpItem = this.leveUpList[i];
			if(desk.type == DeskType.Work){
				let workDesk:WorkDesk = desk as WorkDesk;
				levelUpItem.setView(workDesk.id, workDesk.workbenchNo, workDesk.level, 0);
			}else if(desk.type == DeskType.Empty){
				let emptyDesk:EmptyDesk = desk as EmptyDesk;
				levelUpItem.setView(emptyDesk.id, emptyDesk.workbenchNo, 0, emptyDesk.cos);
			}
		}
		let p:egret.Point = this.deskGroup.parent.localToGlobal(this.deskGroup.x, this.deskGroup.y);
		this.levelUpGroup.x = p.x;
		this.levelUpGroup.y = p.y;
		App.LayerManager.panelLayer.addChild(this.levelUpGroup);


		//监听
		this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideLevelUp, this);
		this.levelUpGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLevelUpTap, this);
		this.levelUpGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onLevelUpBegin, this);
	}

	//隐藏升级的界面
	public hideLevelUp(){
		this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideLevelUp, this);
		this.levelUpGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLevelUpTap, this);
		this.levelUpGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onLevelUpBegin, this);
		this.levelUpGroup.parent && this.levelUpGroup.parent.removeChild(this.levelUpGroup);
		this.rect.parent && this.rect.parent.removeChild(this.rect);
		App.EventManager.sendEvent(EventConst.DOWN_FOOT_BTN);
	}

	//点击升级
	public onLevelUpTap(e:egret.TouchEvent){
		if((e.target instanceof LevelUpItem) == false){
			return;
		}
		let levelUpItem:LevelUpItem = e.target;
		//已解锁，则升级
		if(levelUpItem.level > 0){
			this.sendLevelUpDesk(levelUpItem.workbenchNo);
		//未解锁，则解锁
		}else{
			//判断解锁顺序
			if(levelUpItem.workbenchNo == (this.workDeskList.length + 1)){
				this.sendUnLockDesk(levelUpItem.workbenchNo);
			}
		}
	}

	//长按判断
	private onLevelUpBegin(e:egret.TouchEvent){
		//长按的不是升级按钮，则退出
		if((e.target instanceof LevelUpItem) == false){
			return;
		}
		//未解锁，则退出
		let levelUpItem:LevelUpItem = e.target;
		if(levelUpItem.level <= 0){
			return;
		}
		//长按升级
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onLevelUpEnd, this);
		egret.Tween.get(this.levelUpGroup).wait(500).call(()=>{
			egret.Tween.get(this.levelUpGroup,{loop:true}).wait(100).call(()=>{
				this.sendLevelUpDesk(levelUpItem.workbenchNo);
			},this);
		},this);
	}

	//长按释放
	private onLevelUpEnd(){
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onLevelUpEnd, this);
		egret.Tween.removeTweens(this.levelUpGroup);
	}

	//发送升级桌子
	public sendLevelUpDesk(workbenchNo:number){
		let workDesk:WorkDesk = this.deskList[workbenchNo - 1] as WorkDesk;
		let levelUpItem:LevelUpItem = this.leveUpList[workbenchNo - 1];
		if(workDesk){
			let cos = App.DataCenter.deskInfo.getUpdateCos(workDesk.workbenchNo, workDesk.level);
			let myMoney = App.DataCenter.factoryInfo.curMoney;
			//判断等级上线
			if(workDesk.level >= App.DataCenter.deskInfo.maxLevel){
				this.onLevelUpEnd();
				App.Tips.showMsg("等级已达上限");
				return;
			}
			//判断金币
			if(myMoney < cos){
				this.onLevelUpEnd();
				App.Tips.showMsg("金币不足");
				return;
			}
			
			//发送请求
			App.EventManager.sendEvent(EventConst.LEVEL_UP_DESK, levelUpItem.workbenchNo);

			//因为升级会连续快速升级，不需要等待服务端反馈，就升级桌子
			this.revLevelUpDesk(workDesk.id);
		}
	}

	//接收升级桌子
	public revLevelUpDesk(id:number){
		let workbenchNo:number = this.getDeskByID(id).workbenchNo;
		let workDesk:WorkDesk = this.deskList[workbenchNo - 1] as WorkDesk;
		let levelUpItem:LevelUpItem = this.leveUpList[workbenchNo - 1];
		let cos = App.DataCenter.deskInfo.getUpdateCos(workDesk.workbenchNo, workDesk.level);
		let myMoney = App.DataCenter.factoryInfo.curMoney;
		//刷新金币
		App.DataCenter.factoryInfo.curMoney -= cos;
		App.EventManager.sendEvent(EventConst.UPDATE_MONEY);
		
		//增加等级，刷新工作台数据
		workDesk.level += 1;
		workDesk.updateView();
		//刷新升级图标
		levelUpItem.setView(workDesk.id, workDesk.workbenchNo, workDesk.level, 0);
		//升级飘动字体
		let gainText:GainText = App.ObjectPool.getPool(GainText).getObject();
		let p = levelUpItem.parent.localToGlobal(levelUpItem.x, levelUpItem.y);
		gainText.show(1, p.x + 50, p.y, App.StageUtils.stage);
		//增加工厂经验
		let exp = App.DataCenter.deskInfo.getFactoryExp(workDesk.workbenchNo, workDesk.level);
		App.EventManager.sendEvent(EventConst.UPDATE_FACTORY_EXP, exp);
		console.log("工作台升级成功，当前金币:", App.DataCenter.factoryInfo.curMoney,"工作台等级:",workDesk.level,"本次升级提供工厂经验:", exp);
	}

	//设置工作台产品皮肤
	public setProductSkin(){
		let scale = parseInt(App.DataCenter.factoryInfo.getFactoryScale());
		let level = App.DataCenter.factoryInfo.curLevel;
		let skinID:string = App.DataCenter.produceInfo.getSkinID(scale, level);
		let desk:WorkDesk;
		for(let i=0;i<this.workDeskList.length;i++){
			//重置龙骨动画
			desk = this.workDeskList[i];
			desk.man.setNewSlot("原材料", skinID + "_0_png");
			desk.man.setNewSlot("原材料1", skinID + "_0_png");
			desk.man.setNewSlot("鸭子", skinID + "_png");
			desk.productSkin = skinID + "_png";
			//重置桌子上产品
			let len = desk.productGroup.numChildren;
			for(let i=len-1;i>=0;i--){
				let product:Product = desk.productGroup.getChildAt(i) as Product;
				product.texture = RES.getRes(skinID + "_png");
				product.anchorOffsetX = product.width/2;
				product.anchorOffsetY = product.height/2;
			}
		}
	}

	//设置人物皮肤
	public setManSkin(id:number){
		let desk:WorkDesk = this.workDeskList[id];
		if(desk){
			desk.man.setNewSlot("人", "man" + id + "_0_png");
			desk.man.setNewSlot("头1", "man" + id + "_1_png");
			desk.man.setNewSlot("头2", "man" + id + "_2_png");
			desk.man.setNewSlot("sleep", "man" + id + "_3_png");
			desk.man.setNewSlot("手", "man" + id + "_4_png");
			desk.man.setNewSlot("手2", "man" + id + "_4_png");
			desk.man.setNewSlot("拿工具手", "man" + id + "_5_png");
		}
	}

	//显示火
	public showFire(){
		let len = this.workDeskList.length;
		for(let i=0;i<len;i++){
			this.workDeskList[i].showFire();
		}
	}

	//隐藏火
	public hideFire(){
		let len = this.workDeskList.length;
		for(let i=0;i<len;i++){
			this.workDeskList[i].hideFire();
		}
	}

	//点击减少制作时间
	public clickReduceTime(){
		let len = this.workDeskList.length;
		let desk:WorkDesk;
		let clickReduceTime:number = App.DataCenter.meterInfo.clickReduceTime;
		for(let i=0;i<len;i++){
			desk = this.workDeskList[i];
			//只有工作状态才能加速
			if(desk.state == DeskState.Work){
				//减少制作时间
				desk.curTime += clickReduceTime*1000;
				//工作状态加速
				desk.man.armatureDisplay.animation.timeScale = App.DataCenter.deskInfo.workTimeScale;  //加速
			}else if(desk.state == DeskState.Work_Push){
				desk.man.armatureDisplay.animation.timeScale = App.DataCenter.deskInfo.pushTimeScale;  //加速
			}
		}
	}

	//桌子休眠
	public allDeskSleep(){
		let len = this.workDeskList.length;
		for(let i=0;i<len;i++){
			this.workDeskList[i].changeState(DeskState.Sleep);
		}
	}

	//桌子工作
	public allDeskWork(){
		let len = this.workDeskList.length;
		for(let i=0;i<len;i++){
			this.workDeskList[i].changeState(DeskState.Work);
		}
	}

	//根据ID获取桌子
	public getDeskByID(id:number){
		let len = this.deskList.length;
		for(let i=0;i<len;i++){
			if(this.deskList[i].id == id){
				return this.deskList[i];
			}
		}
		return null;
	}
}