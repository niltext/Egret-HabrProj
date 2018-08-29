/**
 * 产品
 * @author chenkai 2018/8/8
 */
class Product extends eui.Image{
	public constructor() {
		super();
		this.texture = RES.getRes("game_product_png");
	}

	public hide(){
		this.parent && this.parent.removeChild(this);
		App.ObjectPool.getPool(Product).returnObject(this)
	}
}