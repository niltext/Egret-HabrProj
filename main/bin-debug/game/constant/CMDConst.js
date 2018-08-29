var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 命令常量
 * @author chenkai 2018/8/2
 */
var CMDConst = (function () {
    function CMDConst() {
    }
    //========== 启动 ===============
    CMDConst.START_UP = "START_UP";
    return CMDConst;
}());
__reflect(CMDConst.prototype, "CMDConst");
