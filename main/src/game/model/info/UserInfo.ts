/**
 * 用户信息
 * @author chenkai 2018/7/29
 */
class UserInfo {
	public nickName:string;   //昵称
	public avatarUrl:string;  //头像
	public id:number;         //用户id
	
	public saveData(data){
		this.nickName = data.nickName;
		this.avatarUrl = data.avatarUrl;
	}

}