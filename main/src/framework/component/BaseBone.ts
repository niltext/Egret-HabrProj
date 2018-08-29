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
class BaseBone extends egret.DisplayObjectContainer{
    /**骨骼动画 */
    public armatureDisplay:dragonBones.EgretArmatureDisplay;
    
    public constructor() {
		super();	
    }

    /**
     * 初始化Json骨骼
     */
    public initJson(boneName:string, name:string){
        let factory = dragonBones.EgretFactory.factory;
        let dragonbonesData = RES.getRes(boneName + "_ske_json");
        let textureData = RES.getRes(boneName + "_tex_json");
        let texture = RES.getRes(boneName + "_tex_png");
        factory.parseDragonBonesData(dragonbonesData);  
        factory.parseTextureAtlasData(textureData, texture);
		this.armatureDisplay = factory.buildArmatureDisplay(name);
        this.addChild(this.armatureDisplay);
    }

    //二进制格式
    public initBinary(boneName:string, name:string){
        let factory = dragonBones.EgretFactory.factory;
		factory.parseDragonBonesData(RES.getRes(boneName + "_ske_dbbin"));
		factory.parseTextureAtlasData(RES.getRes(boneName + "_tex_json"), RES.getRes(boneName + "_tex_png"));
		this.armatureDisplay = factory.buildArmatureDisplay(name);
		this.addChild(this.armatureDisplay);
    }


    /**
     * 播放动作
     * @param action  动作名
     * @param playTimes 播放次数
     */
    public playAction(action:string, playTimes:number = 1){
        if(this.armatureDisplay){
            this.armatureDisplay.animation.play(action, playTimes);
        }
	}

    /**
     * 替换插槽
     * @param slotName 插槽名称 原材料
     * @param textureName 图片名  xxx_png
     * @param 偏移量
     */
    public setNewSlot( slotName:string, textureName:string ,offsetX:number=0, offsetY:number=0){
        var slot:dragonBones.Slot = this.armatureDisplay.armature.getSlot(slotName);
        var b:egret.Bitmap = new egret.Bitmap();
        b.texture = RES.getRes(textureName);
        b.x = slot.display.x;
        b.y = slot.display.y;
        b.anchorOffsetX = b.width/2 + offsetX;
        b.anchorOffsetY = b.height/2 + offsetY;
        slot.setDisplay( b );
    }

    /**
     * 销毁
     */
    public destoryMe(){
        if(this.armatureDisplay){
            this.armatureDisplay.animation.reset();
            this.armatureDisplay.dispose();
            this.armatureDisplay = null;
        }
    }
}
