var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
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
var BaseMovieClip = (function (_super) {
    __extends(BaseMovieClip, _super);
    /**
     * 初始化
     * @param dataKey json配置文件
     * @param textureKey png纹理集
     * @param movieClipName 影片剪辑名
     */
    function BaseMovieClip(dataKey, textureKey, movieClipName) {
        var _this = _super.call(this) || this;
        var data = RES.getRes(dataKey);
        var texture = RES.getRes(textureKey);
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        _this.movieClipData = mcDataFactory.generateMovieClipData(movieClipName);
        return _this;
    }
    /**隐藏 */
    BaseMovieClip.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    /**销毁 */
    BaseMovieClip.prototype.destoryMe = function () {
        this.stop();
        this.hide();
    };
    return BaseMovieClip;
}(egret.MovieClip));
__reflect(BaseMovieClip.prototype, "BaseMovieClip");
