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
 * 弹框面板加载类
 * @author chenkai 2016/12/23
 */
var PanelManager = (function (_super) {
    __extends(PanelManager, _super);
    function PanelManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**面板实例*/
        _this.panelMap = {};
        /**面板所需资源组*/
        _this.groupMap = {};
        return _this;
    }
    /**
     * @注册
     * @panelClass 弹框类定义
     * @panel      弹框实例
     * @groupName  弹框资源组
     */
    PanelManager.prototype.register = function (panelClass, panel) {
        this.panelMap[panelClass] = panel;
    };
    /**
     * 注销弹框
     * @panelClass 弹框类定义
     */
    PanelManager.prototype.unRegister = function (panelClass) {
        var panel = this.panelMap[panelClass];
        if (panel) {
            delete this.panelMap[panelClass];
        }
        return panel;
    };
    /**
     * 打开弹框面板。若不存在，则尝试创建一个；若需要实时加载资源，则加载完成后打开。
     * @panelClass 弹框类定义
     * @data 传入数据
     * @reutrn 返回打开的面板
     */
    PanelManager.prototype.open = function (panelClass, data) {
        var _this = this;
        if (data === void 0) { data = null; }
        var panel = this.panelMap[panelClass];
        //如果panel不存在，则尝试新建一个
        if (panel == null) {
            panel = new panelClass();
            this.register(panelClass, panel);
        }
        //如果panel存在，则打开
        if (panel) {
            //如果panel已经显示到舞台，则不再重复显示
            if (panel.parent == null) {
                //监听舞台事件
                panel.once(egret.Event.ADDED_TO_STAGE, function () {
                    panel.onEnable(data);
                }, this);
                panel.once(egret.Event.REMOVED_FROM_STAGE, function () {
                    panel.onRemove();
                }, this);
                //未加载资源组，则加载资源后打开
                var groupName = this.groupMap[panelClass];
                if (groupName != null && App.ResUtils.isGroupLoaded(groupName) == false) {
                    this.showLoadAnim();
                    App.ResUtils.loadGroup(groupName, null, function () {
                        _this.hideLoadAnim();
                        App.LayerManager.panelLayer.addChild(panel);
                    }, this);
                    //已加载资源组，直接打开
                }
                else {
                    App.LayerManager.panelLayer.addChild(panel);
                }
            }
            else {
                console.log("PanelManager >> 弹框已打开:", panelClass);
            }
            //设置当前面板
            this.curPanel = panel;
        }
        else {
            console.log("PanelManager >> 弹框不存在:", panelClass);
        }
        return panel;
    };
    /**
     * 关闭弹框
     * @panelClass 弹框类定义
    */
    PanelManager.prototype.close = function (panelClass) {
        var panel = this.panelMap[panelClass];
        if (panel) {
            panel.parent && panel.parent.removeChild(panel);
        }
    };
    /**关闭所有弹框*/
    PanelManager.prototype.closeAll = function () {
        for (var key in this.panelMap) {
            this.close(key);
        }
    };
    /**销毁Panel */
    PanelManager.prototype.destoryPanel = function (panelClass) {
        var panel = this.panelMap[panelClass];
        if (panel) {
            this.close(panelClass);
            delete this.panelMap[panelClass];
            delete this.groupMap[panelClass];
            if (panel == this.curPanel) {
                this.curPanel = null;
            }
            panel.onDestroy();
            console.log("销毁panel", panelClass);
        }
    };
    /**销毁所有Panel */
    PanelManager.prototype.destoryAllPanel = function () {
        for (var key in this.panelMap) {
            this.destoryPanel(key);
        }
    };
    /**显示加载动画 */
    PanelManager.prototype.showLoadAnim = function () {
        this.loadAnim && App.LayerManager.lockLayer.addChild(this.loadAnim);
    };
    /**隐藏加载动画 */
    PanelManager.prototype.hideLoadAnim = function () {
        this.loadAnim && this.loadAnim.parent && this.loadAnim.parent.removeChild(this.loadAnim);
    };
    return PanelManager;
}(SingleClass));
__reflect(PanelManager.prototype, "PanelManager");
