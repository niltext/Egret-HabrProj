var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 资源常量
 * @author chenkai 2017/3/16
 */
var AssetConst = (function () {
    function AssetConst() {
    }
    //======================= 主包 =======================
    /**预加载界面 */
    AssetConst.Preload = "preload";
    /**登陆 */
    AssetConst.Home = "home";
    //========================= 分包 ======================
    /**大厅 */
    AssetConst.Game = "game";
    //======================= 其他 ========================
    /**声音*/
    AssetConst.Sound = "sound";
    return AssetConst;
}());
__reflect(AssetConst.prototype, "AssetConst");
