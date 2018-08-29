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
 * 声音管理类
 * @author chenkai  2016/12/26
 */
var SoundManager = (function (_super) {
    __extends(SoundManager, _super);
    function SoundManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**允许播放音效*/
        _this.allowEffect = true;
        /**允许播放背景音乐*/
        _this.allowBGM = true;
        /**声音列表*/
        _this.soundList = {};
        return _this;
    }
    /**
     * 播放声音
     * @param soundName 声音名
     * @param loop 循环次数
     */
    SoundManager.prototype.playEffect = function (soundName, loop) {
        var _this = this;
        if (loop === void 0) { loop = 1; }
        //禁止播放音效，则返回
        if (this.allowEffect == false) {
            return;
        }
        //播放音效
        var sound = this.soundList[soundName];
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            sound.play(0, loop);
            //音效不存在
        }
        else {
            //从RES中获取
            sound = RES.getRes(soundName);
            if (sound) {
                this.soundList[soundName] = sound;
                sound.type = egret.Sound.EFFECT;
                sound.play(0, loop);
                //从远程获取
            }
            else {
                var url = "resource/assets/music/" + soundName.replace("_mp3", ".mp3");
                RES.getResByUrl(url, function (sound) {
                    _this.soundList[soundName] = sound;
                    sound.type = egret.Sound.EFFECT;
                    sound.play(0, loop);
                }, this, RES.ResourceItem.TYPE_SOUND);
            }
        }
    };
    /**
     * 播放背景音乐
     * @soundName 声音名
     */
    SoundManager.prototype.playBGM = function (soundName) {
        var _this = this;
        //禁止播放背景音乐，则返回
        if (this.allowBGM == false) {
            return;
        }
        //播放背景音乐
        var sound = this.soundList[soundName];
        if (sound) {
            sound.type = egret.Sound.MUSIC;
            if (this.bgmChannel == null) {
                this.bgmChannel = sound.play(0, Number.MAX_VALUE);
            }
            //背景音乐不存在
        }
        else {
            //从RES中获取
            sound = RES.getRes(soundName);
            if (sound) {
                this.soundList[soundName] = sound;
                sound.type = egret.Sound.MUSIC;
                if (this.bgmChannel == null) {
                    this.bgmChannel = sound.play(0, Number.MAX_VALUE);
                }
                //从远程获取
            }
            else {
                var url = "resource/assets/music/" + soundName.replace("_mp3", ".mp3");
                RES.getResByUrl(url, function (sound) {
                    _this.soundList[soundName] = sound;
                    sound.type = egret.Sound.MUSIC;
                    if (_this.bgmChannel == null) {
                        _this.bgmChannel = sound.play(0, Number.MAX_VALUE);
                    }
                }, this, RES.ResourceItem.TYPE_SOUND);
            }
        }
    };
    /**
     * 停止背景音乐
     */
    SoundManager.prototype.stopBGM = function () {
        if (this.bgmChannel) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
    };
    return SoundManager;
}(SingleClass));
__reflect(SoundManager.prototype, "SoundManager");
