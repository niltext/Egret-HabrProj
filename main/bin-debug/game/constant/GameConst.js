var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏常量
 * @author chenkai 2018/7/26
 */
var GameConst = (function () {
    function GameConst() {
    }
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
/**工作台类型 */
var DeskType;
(function (DeskType) {
    DeskType[DeskType["Empty"] = 0] = "Empty";
    DeskType[DeskType["Work"] = 1] = "Work";
})(DeskType || (DeskType = {}));
/**桌子状态 */
var DeskState;
(function (DeskState) {
    DeskState[DeskState["Work"] = 0] = "Work";
    DeskState[DeskState["Work_Push"] = 1] = "Work_Push";
    DeskState[DeskState["Sleep"] = 2] = "Sleep"; //睡眠
})(DeskState || (DeskState = {}));
