/**
 * 工厂等级信息
 * @author chenkai 2018/8/9
 */
class FactoryInfo {
	//================ 工厂属性 =================
	public id:number = 0;          //工厂id
	public name:string = "";       //名称
	public curLevel:number = 1;    //当前等级
	public curMoney:number = 0;    //当前拥有金币
	public curExp:number = 0;      //当前经验
	public nextExp:number = 0;     //下一级升级所需经验值
	public maxLevel:number = 999;  //最大等级

	//=============== 工厂相关配置 ==============
	public config = {
		level:{}, 
		scale:{}  
	};  

	
	/**
	 * 保存json配置
	 * @data json配置
	 */
	public saveConfig(data){
		this.config.level = data.level.property;
		this.config.scale = data.scale.property;
	}

	/**
	 * 保存工厂数据
	 * @param data 工厂数据
	 */
	public saveData(data:any){
		this.id = data.data.resFactoryVo.id;
		this.curLevel = data.data.resFactoryVo.level;
		this.curMoney =  parseInt(data.data.baseUser.money);
		this.curExp = data.data.resFactoryVo.currentExp;
		this.nextExp = this.getNextLevelExp();
		this.name = this.getFactoryName();
	}

	/**根据等级获取工厂规模 */
	public getFactoryScale():string{
		let sConfig = this.config.scale;
		for (let key in sConfig){
			if(this.curLevel >= sConfig[key].level_lower && this.curLevel <= sConfig[key].level_upper){
				return key;
			}
		}
	}

	/**根据规模获取工厂名称 */
	public getFactoryName(){
		let scale:string = this.getFactoryScale();
		return this.config.scale[scale].name;
	}

	/**根据当前等级获取下一级升级Exp */
	public getNextLevelExp(){
		return this.config.level[this.curLevel + ""].EXP;
	}

	/**获取规模进阶进度  0-1*/
	public getScalePro(){
		let sConfig = this.config.scale;
		for (let key in sConfig){
			if(this.curLevel >= sConfig[key].level_lower && this.curLevel <= sConfig[key].level_upper){
				return (this.curLevel - sConfig[key].level_lower)/(sConfig[key].level_upper - sConfig[key].level_lower);
			}
		}
	}

	//获取工厂的背景图片
	public getFactoryBg(){
		let sConfig = this.config.scale;
		for (let key in sConfig){
			if(this.curLevel >= sConfig[key].level_lower && this.curLevel <= sConfig[key].level_upper){
				return sConfig[key].background;
			}
		}
	}
}