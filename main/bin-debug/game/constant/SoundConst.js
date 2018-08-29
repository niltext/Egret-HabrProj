var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 声音常量
 * @author chenkai 2017/3/16
 */
var SoundConst = (function () {
    function SoundConst() {
    }
    SoundConst.BGM = "bgm_mp3"; //背景音乐
    return SoundConst;
}());
__reflect(SoundConst.prototype, "SoundConst");
