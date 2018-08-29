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
 * 场景管理类
 * @author chenkai 2016/12/23
 */
var SceneManager = (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        var _this = _super.call(this) || this;
        /**面板实例*/
        _this.sceneMap = {};
        return _this;
    }
    /**
     * 注册场景
     * @sceneClass 场景类定义
     * @scene      场景实例
     */
    SceneManager.prototype.register = function (sceneClass, scene) {
        if (this.sceneMap[sceneClass] != null) {
            console.log("SceneManager >> 场景已存在:", sceneClass);
            return;
        }
        this.sceneMap[sceneClass] = scene;
    };
    /**
     * 注销场景
     * @sceneClass 场景类定义
     */
    SceneManager.prototype.unRegister = function (sceneClass) {
        var scene = this.sceneMap[sceneClass];
        if (scene != null) {
            delete this.sceneMap[sceneClass];
        }
        return scene;
    };
    /**
     * 打开场景
     * @sceneName 场景类定义
     * @data 传入数据
     */
    SceneManager.prototype.open = function (sceneClass, data) {
        if (data === void 0) { data = null; }
        var scene = this.sceneMap[sceneClass];
        //如果scene不存在，则尝试新建一个
        if (scene == null) {
            scene = new sceneClass();
            this.register(sceneClass, scene);
        }
        //如果scene存在，则打开
        if (scene) {
            //如果scene已经显示到舞台，则不重复显示
            if (scene.parent == null) {
                //保存场景
                var removeScene = this.curScene;
                this.curScene = scene;
                //移除当前场景
                if (removeScene) {
                    removeScene.parent && removeScene.parent.removeChild(removeScene);
                }
                //监听事件
                scene.once(egret.Event.ADDED_TO_STAGE, function () {
                    scene.onEnable(data);
                }, this);
                scene.once(egret.Event.REMOVED_FROM_STAGE, function () {
                    scene.onRemove();
                }, this);
                //显示open的场景
                App.LayerManager.sceneLayer.addChild(scene);
            }
            else {
                console.error("SceneManager >> 场景重复打开:", sceneClass);
            }
        }
        else {
            console.error("SceneManager >> 场景不存在:", sceneClass);
        }
        return scene;
    };
    /**
     * 获取场景
     * @sceneClass 场景类定义
     */
    SceneManager.prototype.getScene = function (sceneClass) {
        return this.sceneMap[sceneClass];
    };
    /**
     * 获取当前场景
     */
    SceneManager.prototype.getCurScene = function () {
        return this.curScene;
    };
    /**销毁场景 */
    SceneManager.prototype.destoryScene = function (sceneClass) {
        var scene = this.sceneMap[sceneClass];
        if (scene) {
            scene.parent && scene.parent.removeChild(scene);
            scene.onDestroy();
            delete this.sceneMap[sceneClass];
            if (scene == this.curScene) {
                this.curScene = null;
            }
        }
    };
    /**销毁所有场景 */
    SceneManager.prototype.destoryAllScene = function () {
        for (var key in this.sceneMap) {
            this.destoryScene(key);
        }
        this.curScene = null;
    };
    return SceneManager;
}(SingleClass));
__reflect(SceneManager.prototype, "SceneManager");
