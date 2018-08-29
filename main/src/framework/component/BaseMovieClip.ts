/**
 * 影片剪辑基类
 * @description 将factory工厂代码封装，复用创建代码
 * @author chenkai 2017/10/16
 * 
 * @example
 * 1. 子类继承  MC extends BaseMovieClip
 * 2. let mc:MCA = new MC();
 *    mc.play(-1);
 */
class BaseMovieClip extends egret.MovieClip{

	/**
	 * 初始化
	 * @param dataKey json配置文件
	 * @param textureKey png纹理集
	 * @param movieClipName 影片剪辑名
	 */
	public constructor(dataKey:string, textureKey:string, movieClipName:string) {
		super();
		let data = RES.getRes(dataKey);
		let texture = RES.getRes(textureKey);
		let mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
	    this.movieClipData = mcDataFactory.generateMovieClipData(movieClipName);
	}

	/**隐藏 */
	public hide(){
		this.parent && this.parent.removeChild(this);
	}

	/**销毁 */
	public destoryMe(){
		this.stop();
		this.hide();
	}
}