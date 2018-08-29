var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 事件常量
 * @author chenkai 2017/4/17
 */
var EventConst = (function () {
    function EventConst() {
    }
    /**Http 发送错误 */
    EventConst.HTTP_ERROR = "HTTP_ERROR";
    //================== 收集区域 =========================
    /**收集产品 */
    EventConst.COLLECTION_PRODUCT = "COLLECTION_PRODUCT";
    //================== 工作区域 =======================
    /**更新金币显示 */
    EventConst.UPDATE_MONEY = "UPDATE_MONEY";
    //================== 增益计 ====================
    /**改变计量状态 */
    EventConst.METER_STATE = "METER_STATE";
    //================== 工厂经验 ===================
    /**刷新工厂经验 */
    EventConst.UPDATE_FACTORY_EXP = "UPDATE_FACTORY_EXP";
    //================== 菜单UI ====================
    /**底部菜单所有按钮下缩 */
    EventConst.DOWN_FOOT_BTN = "DOWN_FOOT_BTN";
    /**生产了新的商品，刷新收集按钮 */
    EventConst.UPDATE_COL_BTN = "UPDATE_COL_BTN";
    //================== 远程通讯 =====================
    /**升级桌子 */
    EventConst.LEVEL_UP_DESK = "LEVEL_UP_DESK";
    /**解锁桌子 */
    EventConst.UNLOCK_DESK = "UNLOCK_DESK";
    /**工厂升级 */
    EventConst.FACTORY_UPGRADE = "FACTORY_UPGRADE";
    return EventConst;
}());
__reflect(EventConst.prototype, "EventConst");
