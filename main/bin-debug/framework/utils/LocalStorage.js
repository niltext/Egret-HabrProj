var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 本地数据保存
 */
var LocalStorage = (function () {
    function LocalStorage() {
        //临时用户数据   调试阶段在点击收集和升级、解锁时保存一次
        this.userInfo = {
            factoryLvl: 1,
            factoryExp: 0,
            factoryMoney: 0,
            workDeskList: [
                { id: 0, type: 1, level: 1, product: 0 },
                { id: 1, type: 0, level: 1, product: 0 },
                { id: 2, type: 0, level: 1, product: 0 },
                { id: 3, type: 0, level: 1, product: 0 },
                { id: 4, type: 0, level: 1, product: 0 },
                { id: 5, type: 0, level: 1, product: 0 },
                { id: 6, type: 0, level: 1, product: 0 },
                { id: 7, type: 0, level: 1, product: 0 },
                { id: 8, type: 0, level: 1, product: 0 }
            ]
        };
    }
    LocalStorage.getInstance = function () {
        if (this.instance == null) {
            this.instance = new LocalStorage();
        }
        return this.instance;
    };
    //保存用户数据
    LocalStorage.prototype.saveUserInfo = function (userInfo) {
        console.log("LocalStorage >> 保存用户数据:", userInfo);
        egret.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    };
    //获取用户数据
    LocalStorage.prototype.getUserInfo = function () {
        var userInfo = egret.localStorage.getItem("userInfo");
        if (userInfo == null || userInfo == "") {
            console.log("LocalStorage >> 获取用户数据:", null);
            return this.userInfo;
        }
        else {
            console.log("LocalStorage >> 获取用户数据:", JSON.parse(userInfo));
            return JSON.parse(egret.localStorage.getItem("userInfo"));
        }
    };
    //清理本地数据
    LocalStorage.prototype.clearUserInfo = function () {
        console.log("LocalStorage >> 清理用户数据");
        egret.localStorage.setItem("userInfo", "");
    };
    return LocalStorage;
}());
__reflect(LocalStorage.prototype, "LocalStorage");
