/**
 * 加载场景
 * @author chenkai 2018/8/8
 */
class LoadScene extends BaseScene{
	public progressLab:eui.Label;   //进度文本

	public constructor() {
		super();
		this.skinName = "LoadSceneSkin";
	}

	protected childrenCreated(){
		super.childrenCreated();
	}

	public onEnable(){
		super.onEnable();
	}

	public onRemove(){
		super.onRemove();
	}

	public dispose(){
		super.dispose();
	}

	/**
	 * 设置进度文本
	 * @param value 进度值 0-100
	 */
	public setProgress(value:number){
		this.progressLab.text = value + "%";
	}

}