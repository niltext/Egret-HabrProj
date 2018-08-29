/**
 * 设备工具类
 * @author chenkai  2016/12/18
 */
class DeviceUtils extends SingleClass{
    
    /**是否Native*/
	public get IsNative(){
    	  return (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE);
	}

	/**是否Web*/
	public get IsWeb(){
    	  return (egret.Capabilities.runtimeType == egret.RuntimeType.WEB);
	}

	/**是否移动端*/
	public get IsMobile(){
		return egret.Capabilities.isMobile;
	}

	/**是否PC端*/
	public get IsPC(){
		return !egret.Capabilities.isMobile;
	}
	
    /**是否Android系统*/
    public get IsAndroid() {
        return egret.Capabilities.os == "Android";
    }
	
    /**是否ios系统*/
    public get IsIos() {
        return egret.Capabilities.os == "iOS";
    }

    /**是否iPad */
    public get IsiPad(){
        if(navigator.userAgent.indexOf("iPad") > -1){
            return true;
        }
        return false;
    }

	/**是否在微信浏览器中打开*/
    public get isWx(): boolean {
        let ua: string = navigator.userAgent.toLowerCase();
        if(/micromessenger/.test(ua)) {
            return true;
        }
        return false;
    }

    /**判断是否ipx，当高宽比大于2时，都认为是全面屏刘海机 */
    public get IsiPhoneX(){
        if(App.StageUtils.stageHeight/App.StageUtils.stageWidth > 2){
            return true;
        }
        return false;
    }
	
}
