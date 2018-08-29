/**
 * 登陆信息
 * @author chenkai 2018/7/29
 */
class LoginInfo {
	public code:string;     //code，用来换取token和openid
	public token:string;    //token,向游戏服务器请求时携带
	public openId:string;   //openId
	public wxuid:string;    //wxuid，服务端生成的微信id


	
}