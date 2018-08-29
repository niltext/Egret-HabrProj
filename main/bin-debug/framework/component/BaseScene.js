var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 场景
 * @description 用于登录、大厅、游戏等场景界面
 * @author chenkai 2016/12/18
 */
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        var _this = _super.call(this) || this;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        return _this;
    }
    /**显示到舞台
     *@param data 传递参数
     */
    BaseScene.prototype.onEnable = function (data) {
        if (data === void 0) { data = null; }
    };
    /**从舞台移除*/
    BaseScene.prototype.onRemove = function () {
    };
    /**销毁 */
    BaseScene.prototype.onDestroy = function () {
        this.parent && this.parent.removeChild(this);
    };
    /**
     * 监听事件
     * @param type 事件类型
     * @param listener 回调函数
     * @param thisObject 回调执行对象
     */
    BaseScene.prototype.addEvent = function (type, listener, thisObject) {
        App.EventManager.addEvent(type, listener, thisObject);
    };
    /**
     * 移除事件
     * @param type 事件类型
     * @param listener 回调函数
     * @param thisObject 回调执行对象
     */
    BaseScene.prototype.removeEvent = function (type, listener, thisObject) {
        App.EventManager.removeEvent(type, listener, thisObject);
    };
    return BaseScene;
}(eui.Component));
__reflect(BaseScene.prototype, "BaseScene");
/*  复制粘贴用
    protected childrenCreated(){
        super.childrenCreated();
        
    }

    public onEnable(){
        super.onEnable();

    }

    public onRemove(){
        super.onRemove();

    }

    public onDestroy(){
        super.onDestroy();

    }

 */ 
