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
 * 图层管理类
 * @author chenkai 2016/12/23
 */
var LayerManager = (function (_super) {
    __extends(LayerManager, _super);
    function LayerManager() {
        var _this = _super.call(this) || this;
        var stage = App.StageUtils.stage;
        _this.sceneLayer = new eui.UILayer();
        _this.sceneLayer.percentWidth = 100;
        _this.sceneLayer.percentHeight = 100;
        _this.sceneLayer.touchEnabled = false;
        stage.addChild(_this.sceneLayer);
        _this.panelLayer = new eui.UILayer();
        _this.panelLayer.percentWidth = 100;
        _this.panelLayer.percentHeight = 100;
        _this.panelLayer.touchEnabled = false;
        stage.addChild(_this.panelLayer);
        _this.dialogLayer = new eui.UILayer();
        _this.dialogLayer.percentWidth = 100;
        _this.dialogLayer.percentHeight = 100;
        _this.dialogLayer.touchEnabled = false;
        stage.addChild(_this.dialogLayer);
        _this.lockLayer = new eui.UILayer();
        _this.lockLayer.percentWidth = 100;
        _this.lockLayer.percentHeight = 100;
        _this.lockLayer.touchEnabled = false;
        stage.addChild(_this.lockLayer);
        _this.tipLayer = new eui.UILayer();
        _this.tipLayer.percentWidth = 100;
        _this.tipLayer.percentHeight = 100;
        _this.tipLayer.touchEnabled = false;
        stage.addChild(_this.tipLayer);
        _this.topLayer = new eui.UILayer();
        _this.topLayer.percentWidth = 100;
        _this.topLayer.percentHeight = 100;
        _this.topLayer.touchEnabled = false;
        stage.addChild(_this.topLayer);
        return _this;
    }
    return LayerManager;
}(SingleClass));
__reflect(LayerManager.prototype, "LayerManager");
