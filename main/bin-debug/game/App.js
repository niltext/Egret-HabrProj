var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * App主类
 * @author chenkai  2018/6/14
 */
var App = (function () {
    function App() {
    }
    Object.defineProperty(App, "ResUtils", {
        /**资源加载类 */
        get: function () {
            return ResUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "StageUtils", {
        /**舞台管理类*/
        get: function () {
            return StageUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "PanelManager", {
        /**弹框管理类*/
        get: function () {
            return PanelManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "SceneManager", {
        /**场景管理类*/
        get: function () {
            return SceneManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "LayerManager", {
        /**图层管理类*/
        get: function () {
            return LayerManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "SoundManager", {
        /**声音管理类*/
        get: function () {
            return SoundManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "DeviceUtils", {
        /**设备管理类*/
        get: function () {
            return DeviceUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "EventManager", {
        /**全局事件类 */
        get: function () {
            return EventMananger.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "DataCenter", {
        /**数据中心*/
        get: function () {
            return DataCenter.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Http", {
        /**Http请求*/
        get: function () {
            return Http.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ObjectPool", {
        /**对象池 */
        get: function () {
            return ObjectPool.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Tips", {
        /**提示信息 */
        get: function () {
            return Tips.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ScreeLock", {
        /**屏幕锁定 */
        get: function () {
            return ScreenLock.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    return App;
}());
__reflect(App.prototype, "App");
