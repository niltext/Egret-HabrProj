/**
 * 游戏场景
 */
class GameScene extends BaseScene{
	//==================== 通用 ======================
	public topGroup:eui.Group;                 //顶层Group
	public bg:eui.Image;                       //背景
	
	//===================== UI =======================
	public topMenuUI:TopMenuUI;                //顶部菜单UI
	public footMenuUI:FootMenuUI;              //底部菜单UI

	//==================== 生产 ========================
	public workAreaUI:WorkAreaUI;              //工作台UI
	public meterUI:EffectMeterUI;              //增益表UI

	//==================== 动画 ========================
	public factoryBoneGroup:eui.Group;         //工厂动画Group
	public factoryBones:FactoryBones;          //工厂动画

	//==================== 同步计时器 ==================
	public syncTimer:egret.Timer;              //同步工作台金币计时器
	

	public totalProduct:number = 0;            //当前所有工作台囤积金币数

	public constructor() {
		super();
		this.skinName = "GameSceneSkin";
	}

	protected childrenCreated(){
		super.childrenCreated();
		//初始化游戏界面
		this.init();
	}

	public onEnable(){
		super.onEnable();
		//监听
		this.configListeners();    
	}

	public onRemove(){
		super.onRemove();
		//取消监听
		this.deConfigListeners(); 
	}

	public dispose(){
		super.dispose();
	}

	/**初始化游戏界面 */
	private init(){
		//iphonex适配，UI下移
		if(App.DeviceUtils.IsiPhoneX){
			this.topGroup.y += 60;
		}
		
		//初始化顶部UI  
		this.topMenuUI.updateView();     

		//工厂动画
		this.factoryBones = new FactoryBones();
		this.factoryBones.show(this.factoryBoneGroup);
		this.factoryBoneGroup.visible = false;

		//工厂背景图
		this.bg.source = RES.getRes(App.DataCenter.factoryInfo.getFactoryBg() + "_jpg");

		//初始化工作台
		this.workAreaUI.initDesk();
		this.workAreaUI.initLevelUpItem();
		this.workAreaUI.hideLevelUp();

		//离线收益
		if(App.DataCenter.deskInfo.offLineTotal > 0){
			App.Tips.showMsg("离线收益：" +  NumberTool.formatMoney(App.DataCenter.deskInfo.offLineTotal));
		}

		//测试用
		this.topMenuUI.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			let data = {
				openid:App.DataCenter.loginInfo.openId,
				money:100000000,
				ids:[App.DataCenter.deskInfo.deskData[0].id]
			}
			App.Http.doPost(ProtoUrl.COLLECT_MONEY, data, (res)=>{
				if(res.status == 200){
					App.DataCenter.factoryInfo.curMoney += 100000000;
					this.topMenuUI.updateMoney();
					console.log("调试增加金币成功:", res.data);
				}else{
					console.log("调试增加金币失败:", res.msg);
				}
			},this,false);
		},this);	
	}

	//============================= 事件处理 ====================================
	
	/**监听 */
	private configListeners(){
		//模块内
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);         //每帧执行
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);        //点击事件
		this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgTap, this);        //背景点击
		this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBgBegin, this);    //背景长按
		//模块间
		this.addEvent(EventConst.COLLECTION_PRODUCT,this.onCollectionProduct, this);     //收集产品
		this.addEvent(EventConst.UPDATE_MONEY, this.updateMoney, this);                  //刷新金币
		this.addEvent(EventConst.METER_STATE, this.onMeterState, this);                  //改变增益状态
		this.addEvent(EventConst.UPDATE_FACTORY_EXP, this.onUpdateFactoryExp, this);     //刷新工厂经验
		this.addEvent(EventConst.DOWN_FOOT_BTN, this.onFootBtnDown, this);               //底部菜单
		this.addEvent(EventConst.UPDATE_COL_BTN, this.onUpdateColBtn, this);     //生成了新的产品
		//远程通讯
		this.addEvent(EventConst.LEVEL_UP_DESK,this.onLevelUpDesk, this);                //升级桌子
		this.addEvent(EventConst.UNLOCK_DESK, this.onUnlockDesk, this);                  //解锁桌子
	}

	/**取消监听 */
	private deConfigListeners(){
		//模块内
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
		this.bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgTap, this);
		this.bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBgBegin, this);
		//模块间
		this.removeEvent(EventConst.COLLECTION_PRODUCT,this.onCollectionProduct, this);
		this.removeEvent(EventConst.UPDATE_MONEY, this.updateMoney, this);
		this.removeEvent(EventConst.METER_STATE, this.onMeterState, this);
		this.removeEvent(EventConst.UPDATE_FACTORY_EXP, this.onUpdateFactoryExp, this);
		this.removeEvent(EventConst.DOWN_FOOT_BTN, this.onFootBtnDown, this);
		//远程通讯
		this.removeEvent(EventConst.LEVEL_UP_DESK,this.onLevelUpDesk, this);
		this.removeEvent(EventConst.UNLOCK_DESK, this.onUnlockDesk, this);
		//点击背景的收集
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBgEnd, this);
		egret.Tween.removeTweens(this.bg);
	}

	//每帧执行
	private onEnterFrame(){
		this.workAreaUI.workRender();   //工作台渲染
		this.meterUI.workRender();      //增益计渲染
	}

	//点击
	private onTouchTap(e:egret.TouchEvent){
		switch(e.target){
			case this.footMenuUI.levelUpBtn:     //升级
				this.onLevelUpTap();
			break;
			case this.footMenuUI.picBtn:         //图鉴
				this.onMatchTap();
			break;
			case this.footMenuUI.colBtn:         //收集
				this.onColTap();
			break;
			case this.footMenuUI.taskBtn:        //任务
				this.onTaskTap();
			break;
		}
	}

	//点击升级
	private onLevelUpTap(){
		this.workAreaUI.showLevelUp();
	}

	//点击循环赛
	private onMatchTap(){

	}

	//点击收集按钮
	private onColTap(){
		this.footMenuUI.downAllBtn();
		this.onCollectionProduct();
	}

	//点击任务
	private onTaskTap(){

	}

	/**点击背景，增加工作效率 */
	private onBgTap(e:egret.TouchEvent){
		if(App.DataCenter.meterInfo.state == MeterState.Normal){
			App.DataCenter.meterInfo.clickAddEffect(App.DataCenter.meterInfo.clickStep);
			this.workAreaUI.clickReduceTime();
		}else if(App.DataCenter.meterInfo.state == MeterState.Sleep){
			App.DataCenter.meterInfo.changeState(MeterState.Normal);
		}
	}

	/**按住背景，则以一定频率增加工作效率 */
	private onBgBegin(e:egret.TouchEvent){
		if(App.DataCenter.meterInfo.state == MeterState.Normal){
			let meterInfo:MeterInfo = App.DataCenter.meterInfo;
			this.bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgTap, this);
			this.bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBgBegin, this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onBgEnd, this);
			meterInfo.bHolding = true;
			egret.Tween.get(this.bg,{loop:true}).wait(17).call(()=>{
				meterInfo.clickAddEffect(meterInfo.holdStep);
			},this);
		}
	}

	/**释放按住背景 */
	private onBgEnd(e:egret.TouchEvent){
		egret.Tween.removeTweens(this.bg);
		App.DataCenter.meterInfo.bHolding = false;
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBgEnd, this);
		this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBgBegin, this);
		this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgTap, this);
	}

	/**点击收集，收集产品 */
	private onCollectionProduct(){
		let deskList = this.workAreaUI.workDeskList;
		let len = deskList.length;
		let workDesk:WorkDesk;
		let sum:number = 0;
		let ids = [];
		for(let i=0;i<len;i++){
			//金币总和
			workDesk = deskList[i];
			sum += workDesk.curProduct;
			//金币收集效果
			if(workDesk.type == DeskType.Work && workDesk.curProduct > 0){
				let goldBones:GoldBones = App.ObjectPool.getPool(GoldBones).getObject();
				goldBones.gold = workDesk.curProduct;
				let startP:egret.Point = workDesk.parent.localToGlobal(workDesk.x, workDesk.y);
				goldBones.x = startP.x + workDesk.width/2 + 60;
				goldBones.y = startP.y + workDesk.height/2 + 20;
				let endP:egret.Point = this.topMenuUI.parent.localToGlobal(this.topMenuUI.x, this.topMenuUI.y);
				egret.Tween.get(goldBones).to({scaleX:1.2,scaleY:1.2},200).to({x:endP.x+100,y:endP.y+30,scaleX:1,scaleY:1},500,egret.Ease.cubicIn).call((gold)=>{
					App.DataCenter.factoryInfo.curMoney += goldBones.gold;
					goldBones.recyle();
					this.topMenuUI.updateMoney();
					this.topMenuUI.playGoldAnim();
				},this);
				App.LayerManager.topLayer.addChild(goldBones);
				ids.push(workDesk.id);
			}
			//清理工作台金币
			workDesk.clearProduct();
		}
		//设置收集按钮
		this.totalProduct = 0;
		this.footMenuUI.setGoldLab(0);
		
		//派发收集消息
		if(sum > 0){
			let data = {
				openid:App.DataCenter.loginInfo.openId,
				money:sum,
				ids:ids
			}
			App.getInstance().sendNotification(GameMediator.SEND_COLLECTION_PRODUCT, data);
		}
	}

	//设置底部金币
	public setFootGoldLab(gold:number){
		this.footMenuUI.setGoldLab(gold);
	}

	/**刷新顶部UI */
	public updateTopMenu(){
		this.topMenuUI.updateView();
	}

	/**刷新金币 */
	public updateMoney(){
		this.topMenuUI.updateMoney();
	}

	//增益计状态变化
	public onMeterState(state:MeterState){
		if(state == MeterState.MAX){
			this.meterUI.setMaxIcon(true);
			this.workAreaUI.showFire();
		}else if(state == MeterState.Normal){
			this.meterUI.setMaxIcon(false);
			this.workAreaUI.hideFire();
			this.workAreaUI.allDeskWork();
		}else if(state == MeterState.Sleep){
			this.meterUI.setMaxIcon(false);
			this.workAreaUI.hideFire();
			this.workAreaUI.allDeskSleep();
		}
	}

	
	//刷新工厂经验
	public onUpdateFactoryExp(exp:number){
		let factoryInfo:FactoryInfo = App.DataCenter.factoryInfo;
		//判断等级上限
		if(factoryInfo.curLevel >= factoryInfo.maxLevel){
			App.Tips.showMsg("工厂等级已达上限");
			return;
		}
		//增加经验
		factoryInfo.curExp += exp;
		//判断是否升级
		if(factoryInfo.curExp >= factoryInfo.nextExp){
			App.Http.doPost(ProtoUrl.FACTORY_UPGRADE, {openid:App.DataCenter.loginInfo.openId, id:App.DataCenter.factoryInfo.id}, ()=>{
				factoryInfo.curLevel+=1;
				factoryInfo.curExp -= factoryInfo.nextExp;
				factoryInfo.nextExp = factoryInfo.getNextLevelExp();
				factoryInfo.name = factoryInfo.getFactoryName();
				this.workAreaUI.setProductSkin();
				this.topMenuUI.updateView();
				//工厂背景图
				this.bg.source = RES.getRes(App.DataCenter.factoryInfo.getFactoryBg() + "_jpg");
				console.log("工厂升级成功，" + "当前工厂规模:",factoryInfo.getFactoryScale(), "当前工厂等级:",factoryInfo.curLevel, "当前工厂经验:",factoryInfo.curExp, "下一级工厂经验:",factoryInfo.nextExp);
			},this,false);
			
		}
		//刷新等级、规模、进度条等
		this.topMenuUI.updateView();
	}	

	//底部菜单的按钮下缩
	public onFootBtnDown(){
		this.footMenuUI.downAllBtn();
	}

	//升级桌子
	public onLevelUpDesk(workbenchNo:number){
		//获取桌子id
		let id:number = this.workAreaUI.deskList[workbenchNo-1].id;
		let data = {openid:App.DataCenter.loginInfo.openId, id:id};
		App.Http.doPost(ProtoUrl.WORKBENCH_UPGRADE, data, (res)=>{
			if(res.status == 200){
				// this.workAreaUI.revLevelUpDesk(res.data.id);
			}else{
				App.Tips.showMsg(res.msg);
			}
		},this,false);
	}

	//解锁桌子
	public onUnlockDesk(workbenchNo:number){
		//获取桌子id
		let id:number = this.workAreaUI.deskList[workbenchNo-1].id;
		let data = {openid:App.DataCenter.loginInfo.openId, id:id};
		App.Http.doPost(ProtoUrl.WORKBENCH_LOCK, data, (res)=>{
			if(res.status == 200){
				this.workAreaUI.revUnLockDesk(res.data);
			}else{
				App.Tips.showMsg(res.msg);
			}
		},this);
	}

	//开启同步计时器
	public startSyncTimer(){
		this.syncTimer || (this.syncTimer = new egret.Timer(10000));
		this.syncTimer.addEventListener(egret.TimerEvent.TIMER, this.onSyncTimer, this);
		this.syncTimer.start();
	}

	//同步计时器
	private onSyncTimer(){
		let data = {
			id:App.DataCenter.userInfo.id,
			openid:App.DataCenter.loginInfo.openId,
			money:App.DataCenter.factoryInfo.curMoney,
			workbenchs:[]
		};
		let deskList:Array<WorkDesk> = this.workAreaUI.workDeskList;
		for(let i=0;i<deskList.length;i++){
			let obj = {workbenchId:deskList[i].id, producedMoney:deskList[i].curProduct};
			data.workbenchs.push(obj);
		}

		App.Http.doPost(ProtoUrl.SYNC_USER_INFO, data, (res)=>{
			if(res.status == 200){
				console.log("同步数据成功");
			}
		},this,false);
	}

	//停止同步计时器
	private stopSyncTimer(){
		if(this.syncTimer){
			this.syncTimer.stop();
			this.syncTimer.removeEventListener(egret.TimerEvent.TIMER, this.onSyncTimer, this);
			this.syncTimer = null;
		}
	}



	//刷新收集按钮 num生成的产品
	public onUpdateColBtn(num:number){
		this.totalProduct += num;
		this.footMenuUI.setGoldLab(this.totalProduct);
	}
}