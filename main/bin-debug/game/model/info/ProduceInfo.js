var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 产品皮肤配置 (产品跟随工厂等级提升变换皮肤)
 * @author chenkai 2018/8/21
 */
var ProduceInfo = (function () {
    function ProduceInfo() {
        //配置
        this.config = {};
    }
    //保存配置
    ProduceInfo.prototype.saveConfig = function (data) {
        this.config = data;
    };
    /**
     * 根据规模和等级，获取皮肤ID
     * @param scale 工厂规模
     * @param level 工厂等级
     */
    ProduceInfo.prototype.getSkinID = function (scale, level) {
        for (var key in this.config) {
            //判断规模
            if (this.config[key].scale == scale) {
                //判断等级区间
                var skin_produce = this.config[key].skin_produce;
                for (var i = 0; i < skin_produce.length; i++) {
                    if (level >= skin_produce[i].lv_range[0] && level <= skin_produce[i].lv_range[1]) {
                        return skin_produce[i].skin_produce;
                    }
                }
            }
        }
    };
    return ProduceInfo;
}());
__reflect(ProduceInfo.prototype, "ProduceInfo");
