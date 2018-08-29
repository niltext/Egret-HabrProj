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
 * 骨骼动画基类
 * @description 封装了factory创建部分，复用节约代码
 * @author chenkai  2017/11/15
 * @example
 * 1. 子类继承 Bone extends BaseBone
 * 2. let bone:Bone = new Bone();
 *    bone.initJson("a_ske_json","a_tex_json","a_tex_png","a");
 *    bone.playAction("stand");
 */
var BaseBone = (function (_super) {
    __extends(BaseBone, _super);
    function BaseBone() {
        return _super.call(this) || this;
    }
    /**
     * 初始化Json骨骼
     */
    BaseBone.prototype.initJson = function (boneName, name) {
        var factory = dragonBones.EgretFactory.factory;
        var dragonbonesData = RES.getRes(boneName + "_ske_json");
        var textureData = RES.getRes(boneName + "_tex_json");
        var texture = RES.getRes(boneName + "_tex_png");
        factory.parseDragonBonesData(dragonbonesData);
        factory.parseTextureAtlasData(textureData, texture);
        this.armatureDisplay = factory.buildArmatureDisplay(name);
        this.addChild(this.armatureDisplay);
    };
    //二进制格式
    BaseBone.prototype.initBinary = function (boneName, name) {
        var factory = dragonBones.EgretFactory.factory;
        factory.parseDragonBonesData(RES.getRes(boneName + "_ske_dbbin"));
        factory.parseTextureAtlasData(RES.getRes(boneName + "_tex_json"), RES.getRes(boneName + "_tex_png"));
        this.armatureDisplay = factory.buildArmatureDisplay(name);
        this.addChild(this.armatureDisplay);
    };
    /**
     * 播放动作
     * @param action  动作名
     * @param playTimes 播放次数
     */
    BaseBone.prototype.playAction = function (action, playTimes) {
        if (playTimes === void 0) { playTimes = 1; }
        if (this.armatureDisplay) {
            this.armatureDisplay.animation.play(action, playTimes);
        }
    };
    /**
     * 替换插槽
     * @param slotName 插槽名称 原材料
     * @param textureName 图片名  xxx_png
     * @param 偏移量
     */
    BaseBone.prototype.setNewSlot = function (slotName, textureName, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var slot = this.armatureDisplay.armature.getSlot(slotName);
        var b = new egret.Bitmap();
        b.texture = RES.getRes(textureName);
        b.x = slot.display.x;
        b.y = slot.display.y;
        b.anchorOffsetX = b.width / 2 + offsetX;
        b.anchorOffsetY = b.height / 2 + offsetY;
        slot.setDisplay(b);
    };
    /**
     * 销毁
     */
    BaseBone.prototype.destoryMe = function () {
        if (this.armatureDisplay) {
            this.armatureDisplay.animation.reset();
            this.armatureDisplay.dispose();
            this.armatureDisplay = null;
        }
    };
    return BaseBone;
}(egret.DisplayObjectContainer));
__reflect(BaseBone.prototype, "BaseBone");
