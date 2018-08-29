/**
 * 数据中心
 * @author chenkai  2016/12/18
 */
class DataCenter extends SingleClass{
	public loginInfo:LoginInfo;     //登录信息
    public userInfo:UserInfo;       //用户信息
	public factoryInfo:FactoryInfo; //工厂信息
	public meterInfo:MeterInfo;     //增益计信息
	public deskInfo:DeskInfo;       //工作台信息
	public produceInfo:ProduceInfo; //产品皮肤配置

	public constructor() {
    	  super();
		  this.loginInfo = new LoginInfo();
		  this.userInfo = new UserInfo();
		  this.factoryInfo = new FactoryInfo();
		  this.meterInfo = new MeterInfo();
		  this.deskInfo = new DeskInfo();
		  this.produceInfo = new ProduceInfo();
	}
}