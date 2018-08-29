/**按钮类型 */
enum ComBtnType{
    /**普通点击 */
    Click, 
    /**关闭、退出*/   
    Close,  
    /**换页*/   
    SwitchPage
}

/**
 * 按钮工具类
 * @description 监听按钮点击事件，统一播放按钮动画和声音
 * @author chenkai  2017/10/14
 * @example
 * CommonBtn.addClick(btn, cb, this, 1);
 * CommonBtn.removeClick(btn, cb, this);
 */
class CommonBtn {
    //事件列表
    private static eventList = {};

    /**
     * 注册按钮点击事件 
     * @param target 按钮
     * @param cb     点击回调
     * @param thisObject 执行对象
     * @param type 声音播放类型
     */
    public static addClick(target:egret.DisplayObject, cb:Function, thisObject:any, type:number = ComBtnType.Click) {
        let list:Array<any> = this.eventList[target.hashCode + ""];

        if(list == null){
            list = new Array<any>();
            this.eventList[target.hashCode + ""] = list;
        }
        let len = list.length;
        for(var i=0;i<len;i++){
            if(list[i][0] == cb && list[i][1] == thisObject){
                return;
            }
        }
        var btnClick:BtnClick = new BtnClick(target, cb, thisObject, type);
        list.push([cb, thisObject, btnClick]);
    }

    /**
     * 移除按钮点击事件
     * @param target 按钮
     * @param cb 点击回调
     * @param thisObject 执行对象
     */
    public static removeClick(target:any, cb:Function, thisObject:any){
        let list:Array<any> = this.eventList[target.hashCode + ""];
        if(list != null){
            let len = list.length;
            for(let i=len-1;i>=0;i--){
                if(list[i][0] == cb && list[i][1] == thisObject){
                    let btnClick:BtnClick = list[i][2];
                    btnClick.destoryMe();
                    list[i].length = 0;
                    list.splice(i,1);
                }
            }
        }
    }

    /**移除所有事件 */
    public static removeAllListeners(){
        for(let key in this.eventList){
            let list:Array<any> = this.eventList[key];
            if(list != null){
                let len = list.length;
                for(let i=0;i<len;i++){
                    let btnClick:BtnClick = list[i][2];
                    btnClick.destoryMe();
                    list[i].length = 0;
                }
                 list.length = 0;
            }
            delete this.eventList[key];
        }

    }
}


/**
 * 单个按钮监听类
 */
class BtnClick{
    private type:number;     //声音播放类型
    private target:egret.DisplayObject;  //按钮
    private thisObject:any;  //回调执行对象
    private cb:Function;     //回调函数

    /**
     * 初始化
     * @param target 按钮
     * @param cb 回调
     * @param thisObject 回调执行对象
     * @param type 声音类型
     */
    public constructor(target:egret.DisplayObject, cb:Function, thisObject:any, type:number = ComBtnType.Click){
        this.target = target;
        this.cb = cb;
        this.thisObject = thisObject;
        this.type = type;

        this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    /**触摸开始，播放声音和扩展动画 */
    private onTouchBegin(){
        if(this.target.touchEnabled == false){
            return;
        }

        App.StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.initAnchorOffset();
        this.playSound();
        this.playOutAnim(); 
    }

    /**点击，执行回调 */
    private onTouchTap(){
        if(this.target.touchEnabled == false){
            return;
        }
        this.cb.apply(this.thisObject);
    }

    /**触摸释放，播放收缩动画 */
    private onTouchEnd(){
        if(this.target.touchEnabled == false){
            return;
        }
        this.playBackAnim();
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    /**播放声音 */
    private playSound(){
        // switch (this.type) {
        //     case ComBtnType.Click:
        //         App.SoundManager.playEffect(SoundConst.btnClick);
        //         break;
        //     case ComBtnType.Close:
        //         App.SoundManager.playEffect(SoundConst.btnBack);
        //         break;
        //     case ComBtnType.SwitchPage:
        //         App.SoundManager.playEffect(SoundConst.switchPage);
        //         break;
        // }
    }

    /**播放扩展动画 */
    private playOutAnim(){
        egret.Tween.get(this.target).set({ scaleX: 1, scaleY: 1 }).to({ scaleX: 1.05, scaleY: 1.05 },30);
    }

    /**播放收缩动画 */
    private playBackAnim(){
        egret.Tween.get(this.target).to({ scaleX: 1, scaleY: 1 },30);
    }

    /**设置锚点为中心 */
    private initAnchorOffset(){
        if(this.target.anchorOffsetX != this.target.width/2 && this.target.anchorOffsetY != this.target.height/2){
            this.target.anchorOffsetX = this.target.width / 2;
            this.target.anchorOffsetY = this.target.height / 2;
            this.target.x = this.target.x + this.target.width / 2;
            this.target.y = this.target.y + this.target.height / 2;
        }
    }

    /**销毁 */
    public destoryMe(){
        //还原按钮大小
        this.target.scaleX = 1;
        this.target.scaleY = 1;

        //移除监听
        egret.Tween.removeTweens(this.target);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

        //删除引用
        this.target = null;
        this.cb = null;
        this.thisObject = null;
    }
}