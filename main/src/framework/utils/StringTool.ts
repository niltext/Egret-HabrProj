/**
 * 字符串工具
 * @author chenkai 2016/12/18
 */
class StringTool extends SingleClass{

    /**
	 * 字符串大于一定长度时，进行换行(增加换行符"\n")
	 * @param str 字符串
	 * @param num 限制长度
	 */
	public static formatWrap(str:string, num:number){
		let result = "";
		let row = Math.ceil(str.length/num); //有几行

		//大于1行时，进行换行处理
		if(row > 1){
			let i;
			for(i=0; i<row; i++){
				if(i < row-1){
					result += str.substr(i*num, num) + "\n";  //"123456" substr(0,3) =>"123"
				}else{
					//最后一行
					result += str.substr(i*num, str.length);
				}
			}
		}else{
			result = str;
		}
		return result;
	}

    /**
	 * 删除左右两端的空格.   " abc " - > "abc"
	 * @str 待处理字符串
	 * @is_global 是否处理中间空格
	 * @return 处理后字符串
	 */
	public static trim(str, bGloal:boolean = false){
		let result;
		result = str.replace(/(^\s+)|(\s+$)/g,"");
		if(bGloal){
			result = result.replace(/\s/g,"");
		}
		return result;
　　 }

	/**
     * 由A-Z,0-9随机组成一个指定长度验证码
     * @param n 验证码位数
     */ 
    public  getVerificationCode(n:number):string{
        var str:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var len:number = str.length;
        var code:string = "";
        for(var i:number=0;i<n;i++){
            code += str.charAt(NumberTool.getRandInt(0,len));
        }
        return code;
    }

    /**
     * 用"..."代替超出指定长度的字符串
     * @param str 源字符串
     * @param len 字符串可显示的长度
     * @returns 
     */
    public cutString(str:string, len:number):string{
        if(str.length > len){
            str = str.substr(0,len);
            str += "...";
        }
        return str;
    }

    /**
     * 检查字符串是否为空
     * @param str 源字符串
     * @return 是否为空
     */
    public checkEmpty(str:string):boolean{
        if(str.length == 0){
            return true;
        }
        return false;
    }
}
