var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 工厂等级信息
 * @author chenkai 2018/8/9
 */
var FactoryInfo = (function () {
    function FactoryInfo() {
        //================ 工厂属性 =================
        this.id = 0; //工厂id
        this.name = ""; //名称
        this.curLevel = 1; //当前等级
        this.curMoney = 0; //当前拥有金币
        this.curExp = 0; //当前经验
        this.nextExp = 0; //下一级升级所需经验值
        this.maxLevel = 999; //最大等级
        //=============== 工厂相关配置 ==============
        this.config = {
            level: {},
            scale: {}
        };
    }
    /**
     * 保存json配置
     * @data json配置
     */
    FactoryInfo.prototype.saveConfig = function (data) {
        this.config.level = data.level.property;
        this.config.scale = data.scale.property;
    };
    /**
     * 保存工厂数据
     * @param data 工厂数据
     */
    FactoryInfo.prototype.saveData = function (data) {
        this.id = data.data.resFactoryVo.id;
        this.curLevel = data.data.resFactoryVo.level;
        this.curMoney = parseInt(data.data.baseUser.money);
        this.curExp = data.data.resFactoryVo.currentExp;
        this.nextExp = this.getNextLevelExp();
        this.name = this.getFactoryName();
    };
    /**根据等级获取工厂规模 */
    FactoryInfo.prototype.getFactoryScale = function () {
        var sConfig = this.config.scale;
        for (var key in sConfig) {
            if (this.curLevel >= sConfig[key].level_lower && this.curLevel <= sConfig[key].level_upper) {
                return key;
            }
        }
    };
    /**根据规模获取工厂名称 */
    FactoryInfo.prototype.getFactoryName = function () {
        var scale = this.getFactoryScale();
        return this.config.scale[scale].name;
    };
    /**根据当前等级获取下一级升级Exp */
    FactoryInfo.prototype.getNextLevelExp = function () {
        return this.config.level[this.curLevel + ""].EXP;
    };
    /**获取规模进阶进度  0-1*/
    FactoryInfo.prototype.getScalePro = function () {
        var sConfig = this.config.scale;
        for (var key in sConfig) {
            if (this.curLevel >= sConfig[key].level_lower && this.curLevel <= sConfig[key].level_upper) {
                return (this.curLevel - sConfig[key].level_lower) / (sConfig[key].level_upper - sConfig[key].level_lower);
            }
        }
    };
    //获取工厂的背景图片
    FactoryInfo.prototype.getFactoryBg = function () {
        var sConfig = this.config.scale;
        for (var key in sConfig) {
            if (this.curLevel >= sConfig[key].level_lower && this.curLevel <= sConfig[key].level_upper) {
                return sConfig[key].background;
            }
        }
    };
    return FactoryInfo;
}());
__reflect(FactoryInfo.prototype, "FactoryInfo");
