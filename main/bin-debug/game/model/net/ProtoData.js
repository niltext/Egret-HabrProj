var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 通讯数据
 * @author chenkai 2018/7/29
 */
var ProtoData = (function () {
    function ProtoData() {
    }
    return ProtoData;
}());
__reflect(ProtoData.prototype, "ProtoData");
