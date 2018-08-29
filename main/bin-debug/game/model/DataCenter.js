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
 * 数据中心
 * @author chenkai  2016/12/18
 */
var DataCenter = (function (_super) {
    __extends(DataCenter, _super);
    function DataCenter() {
        var _this = _super.call(this) || this;
        _this.loginInfo = new LoginInfo();
        _this.userInfo = new UserInfo();
        _this.factoryInfo = new FactoryInfo();
        _this.meterInfo = new MeterInfo();
        _this.deskInfo = new DeskInfo();
        _this.produceInfo = new ProduceInfo();
        return _this;
    }
    return DataCenter;
}(SingleClass));
__reflect(DataCenter.prototype, "DataCenter");
