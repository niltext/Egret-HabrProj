/**
 * 产品皮肤配置 (产品跟随工厂等级提升变换皮肤)
 * @author chenkai 2018/8/21
 */
class ProduceInfo {
	
	//配置
	public config = {};

	//保存配置
	public saveConfig(data){
		this.config = data;
	}

	/**
	 * 根据规模和等级，获取皮肤ID
	 * @param scale 工厂规模
	 * @param level 工厂等级
	 */
	public getSkinID(scale:number, level:number){
		for(let key in this.config){
			//判断规模
			if(this.config[key].scale == scale){
				//判断等级区间
				let skin_produce = this.config[key].skin_produce;
				for(let i=0;i<skin_produce.length;i++){
					if( level >= skin_produce[i].lv_range[0] && level <= skin_produce[i].lv_range[1]){
						return skin_produce[i].skin_produce;
					}
				}
			}
		}
	}
}