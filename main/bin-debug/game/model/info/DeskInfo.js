var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 工作台信息
 * @author chenkai 2018/8/9
 */
var DeskInfo = (function () {
    function DeskInfo() {
        this.effectTime = 16.6; //效率，每帧消耗的制作时间
        this.maxProduct = 5; //可堆叠的产品数量上限
        this.maxLevel = 300; //最高等级
        this.cosList = []; //开启消耗
        this.offLineTotal = 0; //离线收益总和
        this.workTimeScale = 5; //点击工作动作加速
        this.pushTimeScale = 5; //点击推送动作加速
        this.config = {}; //桌子配置
    }
    //保存配置
    DeskInfo.prototype.saveConfig = function (data) {
        this.config = data;
    };
    //保存数据
    DeskInfo.prototype.saveData = function (data) {
        this.deskData = [];
        //保存解锁的桌子数据
        var dataList = data.data.resFactoryVo.resWorkbenchVos;
        for (var i = 0; i < dataList.length; i++) {
            var value = dataList[i];
            var deskVO = new DeskVO();
            deskVO.id = value.id;
            deskVO.type = value.status;
            deskVO.level = value.level;
            deskVO.product = value.producedMoney;
            deskVO.workbenchNo = value.workbenchNo;
            this.deskData.push(deskVO);
        }
    };
    //保存离线收益
    DeskInfo.prototype.saveOffLine = function (data) {
        for (var _i = 0, _a = data.data; _i < _a.length; _i++) {
            var value = _a[_i];
            this.deskData[value.workbenchNo - 1].product += value.offLineMoney; //服务端桌子id从1开始
            this.offLineTotal += value.offLineMoney;
        }
    };
    //新增的开启桌子配置，又换了个一个配置文件写..
    DeskInfo.prototype.saveOpenConfig = function (data) {
        for (var i = 1; i <= 9; i++) {
            this.cosList.push(data["B00" + i].coin_need);
        }
    };
    //根据等级获取工厂经验
    DeskInfo.prototype.getFactoryExp = function (workbenchNo, level) {
        return this.config["B00" + workbenchNo].level[level - 1].property[0].exp_factory;
    };
    //根据等级获取阶段
    DeskInfo.prototype.getStar = function (workbenchNo, level) {
        var rank = this.config["B00" + workbenchNo].rank;
        for (var key in rank) {
            if (level >= rank[key].level_lower && level <= rank[key].level_upper) {
                return rank[key].rank;
            }
        }
    };
    //根据等级获取当前升星阶的进度 0-1
    DeskInfo.prototype.getLevelUpPro = function (workbenchNo, level) {
        var rank = this.config["B00" + workbenchNo].rank;
        for (var key in rank) {
            if (level >= rank[key].level_lower && level <= rank[key].level_upper) {
                return (level - rank[key].level_lower) / (rank[key].level_upper - rank[key].level_lower);
            }
        }
    };
    //根据等级获取工作台的升级消耗
    DeskInfo.prototype.getUpdateCos = function (workbenchNo, level) {
        return parseInt(this.config["B00" + workbenchNo].level[level - 1].property[0].coin_upgrade); //id+1是因为id从0开始，level-1是应为level是从1开始
    };
    //根据等级获取工作台单次的产出
    DeskInfo.prototype.getOnceCoin = function (workbenchNo, level) {
        return parseInt(this.config["B00" + workbenchNo].level[level - 1].produce[0].coin_once);
    };
    //根据等级获取工作台单次生产的时间
    DeskInfo.prototype.getOnceTime = function (workbenchNo, level) {
        return this.config["B00" + workbenchNo].level[level - 1].produce[0].time_once;
    };
    return DeskInfo;
}());
__reflect(DeskInfo.prototype, "DeskInfo");
