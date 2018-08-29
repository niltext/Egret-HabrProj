/**
 * 桌子数据
 * @author chenkai 2018/8/24
 */
class DeskVO {
	/**服务端桌子id */
	public id:number;
	/**等级 */
	public level:number;
	/**当前生产的金币 */
	public product:number;
	/**是否解锁 */
	public type:DeskType;
	/**桌子编号 1-9 */
	public workbenchNo:number;
}