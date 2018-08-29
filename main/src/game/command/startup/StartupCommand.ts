/**
 * 启动命令
 * @author chenkai 2018/8/28
 */
class StartupCommand extends puremvc.SimpleCommand{

	public execute(notification: puremvc.INotification): void{
		//初始化舞台
		let stage:egret.Stage =notification.getBody();
		App.StageUtils.stage =  stage;

        //小游戏组件初始化
        //common
        window["Tips"] = Tips;
        window["ScaleButton"] = ScaleButton;
        //game
        window["CollectionText"] = CollectionText;
        window["FootMenuUI"] = FootMenuUI;
        window["TopMenuUI"] = TopMenuUI;
        window["EffectMeterUI"] = EffectMeterUI;
        window["GainText"] = GainText;
        window["WorkAreaUI"] = WorkAreaUI;
        window["WorkDesk"] = WorkDesk;
        window["LevelUpItem"] = LevelUpItem;

        //小游戏平台初始化
        platform.updateShareMenu();   //更新转发属性


        //进入加载界面
        this.facade.registerMediator(new LoadMediator());
	}
}