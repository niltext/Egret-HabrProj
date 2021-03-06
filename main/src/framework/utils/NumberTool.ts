/**
 * 数字工具类
 * @author chenkai 2016/12/18
 */
class NumberTool extends SingleClass{
	/**
     * 获取范围内随机整数 getRandInt(1,3)随机获取1,2,3
     * @start 起始整数 
     * @end 终止整数
     */
    public static getRandInt(start: number,end: number) {
        return start + Math.round(Math.random() * (end - start));
    }

    /**
     * 将数字格式化为时间数字, 例 5 -> "05"
     * @param num 待格式化数字
     * @returns 格式化后的数字字符串
     */ 
    public static formatTime(num:number):string{
    	  if(num >=0 && num < 10){
        	  return "0" + num;
    	  }else{
        	  return num + "";
    	  }
	}

    /**
	 * 获取数字1~9对应的"一"~"九"
	 * @num 阿拉伯数字
	 * @return 大写数字
	 */
	public static formatCapital(num:number):string{
		if(num <=0 || num >=10){
			return "";
		}
		return (["一","二","三","四","五","六","七","八","九"])[num-1];
	}

	/**
	 * 格式化金币  保留两位小数，例如1004，就显示为：1.00K
	 * 单位	换算1	换算2
		K	x1000	x10^3
		M	x1000K	x10^6
		B	x1000M	x10^9
		T	x1000B	x10^12
		aa	x1000T	x10^15
		bb	x1000aa	x10^18
		cc	x1000bb	x10^21
		dd	x1000cc	x10^24
		ee	x1000dd	x10^27
		ff	x1000ee	x10^30
		gg	x1000ff	x10^33
		hh	x1000gg	x10^36
		ii	x1000hh	x10^39
		jj	x1000ii	x10^42
		kk	x1000jj	x10^45
	 */
	public static formatMoney(value:number, fixed:number = 2){
		let moneyUnit =  NumberTool.moneyUnit;
		let len = moneyUnit.length;
		let result:string;
		for(let i=len-1;i>=0;i--){
			if(value >= Math.pow(10,(i+1)*3)){
				result = (value/Math.pow(10,(i+1)*3)).toFixed(fixed) + moneyUnit[i];
				return result;
			}
		}
		return value + "";
	}
    public static moneyUnit = ["K","M","B","T","aa","bb","cc","dd","ee","ff","gg","hh","ii","jj","kk"];

}
