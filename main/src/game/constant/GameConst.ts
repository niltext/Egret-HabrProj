/**
 * 游戏常量
 * @author chenkai 2018/7/26
 */
class GameConst {

	
}


/**工作台类型 */
enum DeskType{
	Empty = 0,
	Work = 1
}

/**桌子状态 */
enum DeskState{
	Work,                     //工作
	Work_Push,                //推送动作
	Sleep                     //睡眠
}