/**
 * 通讯接口
 * @author chenkai 2018/7/29
 */
class ProtoUrl {
	public static preUrl:string = "https://dc.gamehema.com:8443/hm-factory";

	//============================= 用户登录 ==============================
	/**获取openId */
	public static GET_OPENID:string ="/user/getOpenid";
	/**获取用户数据 */
	public static GET_USER_INFO:string = "/user/";
	/**获取离线收益 */
	public static OFF_LINE_EARNINGS:string = "/user/offLineEarnings/";
	/**清理用户数据 */
	public static CLEAR_USER_INFO:string = "/user/clear/";


	//============================== 工厂、工作台 ==========================
	/**工作台升级 */
	public static WORKBENCH_UPGRADE:string = "/workbench/upgrade";
	/**解锁工作台 */
	public static WORKBENCH_LOCK:string = "/workbench/unlock";
	/**工厂升级 */
	public static FACTORY_UPGRADE:string =  "/factory/upgrade";
	/**收钱 */
	public static COLLECT_MONEY:string =  "/user/collectMoney";
	/**同步用户信息 */
	public static SYNC_USER_INFO:string =  "/user/sync";

	//============================= 心跳 ===========================
	/**心跳 */
	public static USER_ONLINE:string =  "/user/online/";
}