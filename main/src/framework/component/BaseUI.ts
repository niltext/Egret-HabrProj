/**
 * UI基类
 * @description 普通UI基类，主要用于scene或panel内的ui组件
 * @author chenkai 2017/11/16
 */
class BaseUI extends eui.Component{
	public constructor() {
      super();
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onEnable, this);
      this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}

    /**添加到场景中*/
    public onEnable() {
        
    }

    /**从场景中移除*/
    public onRemove() {
        
    }

    /**隐藏*/
    public hide() {
        this.parent && this.parent.removeChild(this);
    }

    /**销毁*/
    public onDestory() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onEnable, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }

    
}
