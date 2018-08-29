var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 通讯接口
 * @author chenkai 2018/7/29
 */
var ProtoUrl = (function () {
    function ProtoUrl() {
    }
    ProtoUrl.preUrl = "https://dc.gamehema.com:8443/hm-factory";
    //============================= 用户登录 ==============================
    /**获取openId */
    ProtoUrl.GET_OPENID = "/user/getOpenid";
    /**获取用户数据 */
    ProtoUrl.GET_USER_INFO = "/user/";
    /**获取离线收益 */
    ProtoUrl.OFF_LINE_EARNINGS = "/user/offLineEarnings/";
    /**清理用户数据 */
    ProtoUrl.CLEAR_USER_INFO = "/user/clear/";
    //============================== 工厂、工作台 ==========================
    /**工作台升级 */
    ProtoUrl.WORKBENCH_UPGRADE = "/workbench/upgrade";
    /**解锁工作台 */
    ProtoUrl.WORKBENCH_LOCK = "/workbench/unlock";
    /**工厂升级 */
    ProtoUrl.FACTORY_UPGRADE = "/factory/upgrade";
    /**收钱 */
    ProtoUrl.COLLECT_MONEY = "/user/collectMoney";
    /**同步用户信息 */
    ProtoUrl.SYNC_USER_INFO = "/user/sync";
    //============================= 心跳 ===========================
    /**心跳 */
    ProtoUrl.USER_ONLINE = "/user/online/";
    return ProtoUrl;
}());
__reflect(ProtoUrl.prototype, "ProtoUrl");
