/**
 * 工作台信息
 * @author chenkai 2018/8/9
 */
class DeskInfo {
	public effectTime:number = 16.6;  //效率，每帧消耗的制作时间
	public maxProduct:number = 5;     //可堆叠的产品数量上限
	public maxLevel:number = 300;     //最高等级
	public cosList = [];              //开启消耗
	public offLineTotal:number = 0;   //离线收益总和
	public workTimeScale:number = 5;  //点击工作动作加速
	public pushTimeScale:number = 5;  //点击推送动作加速

	public config = {};               //桌子配置
	public deskData:Array<DeskVO>;    //桌子数据

	//保存配置
	public saveConfig(data){
		this.config = data;
	}

	//保存数据
	public saveData(data){
		this.deskData = [];
		//保存解锁的桌子数据
		let dataList = data.data.resFactoryVo.resWorkbenchVos;
		for(let i=0;i<dataList.length;i++){
			let value = dataList[i];
			let deskVO:DeskVO = new DeskVO();
			deskVO.id = value.id;
			deskVO.type = value.status;
			deskVO.level = value.level;
			deskVO.product = value.producedMoney;
			deskVO.workbenchNo = value.workbenchNo;
			this.deskData.push(deskVO);
		}
	}

	//保存离线收益
	public saveOffLine(data){
		for(let value of data.data){
			this.deskData[value.workbenchNo-1].product += value.offLineMoney;  //服务端桌子id从1开始
			this.offLineTotal += value.offLineMoney;
		}
	}

	//新增的开启桌子配置，又换了个一个配置文件写..
	public saveOpenConfig(data){
		for(let i=1;i<=9;i++){
			this.cosList.push(data["B00" + i].coin_need);
		}
	}

	//根据等级获取工厂经验
	public getFactoryExp(workbenchNo:number, level:number){
		return this.config["B00" + workbenchNo].level[level-1].property[0].exp_factory;
	}

	//根据等级获取阶段
	public getStar(workbenchNo:number, level:number){
		let rank = this.config["B00" + workbenchNo].rank;
		for(let key in rank){
			if(level >= rank[key].level_lower && level <= rank[key].level_upper){
				return rank[key].rank;
			}
		}
	}

	//根据等级获取当前升星阶的进度 0-1
	public getLevelUpPro(workbenchNo:number, level:number){
		let rank = this.config["B00" + workbenchNo].rank;
		for(let key in rank){
			if(level >= rank[key].level_lower && level <= rank[key].level_upper){
				return (level -rank[key].level_lower)/(rank[key].level_upper - rank[key].level_lower);
			}
		}
	}

	//根据等级获取工作台的升级消耗
	public getUpdateCos(workbenchNo:number, level:number){
		return parseInt(this.config["B00" + workbenchNo].level[level-1].property[0].coin_upgrade);  //id+1是因为id从0开始，level-1是应为level是从1开始
	}

	//根据等级获取工作台单次的产出
	public getOnceCoin(workbenchNo:number, level:number){
		return parseInt(this.config["B00" + workbenchNo].level[level-1].produce[0].coin_once);
	}

	//根据等级获取工作台单次生产的时间
	public getOnceTime(workbenchNo:number, level:number){
		return this.config["B00" + workbenchNo].level[level-1].produce[0].time_once;
	}

}

