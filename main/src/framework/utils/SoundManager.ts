/**
 * 声音管理类
 * @author chenkai  2016/12/26
 */
class SoundManager extends SingleClass {
    /**允许播放音效*/
    public allowEffect: boolean = true;
    /**允许播放背景音乐*/
    public allowBGM: boolean = true;
    /**声音列表*/
    private soundList = {};
    /**背景音乐声道*/
    private bgmChannel: egret.SoundChannel;
	
	/**
	 * 播放声音
	 * @param soundName 声音名
	 * @param loop 循环次数
	 */
    public playEffect(soundName: string,loop: number = 1) {
        //禁止播放音效，则返回
        if(this.allowEffect == false){
            return;
        }
        //播放音效
        let sound: egret.Sound = this.soundList[soundName];
        if(sound){
            sound.type = egret.Sound.EFFECT;
            sound.play(0,loop);
        //音效不存在
        }else{
            //从RES中获取
            sound = RES.getRes(soundName);
            if(sound){
                this.soundList[soundName] = sound;
                sound.type = egret.Sound.EFFECT;
                sound.play(0,loop);
            //从远程获取
            }else{
                let url:string = "resource/assets/music/" + soundName.replace("_mp3",".mp3");
                RES.getResByUrl(url, (sound:egret.Sound)=>{
                    this.soundList[soundName] = sound;
                    sound.type = egret.Sound.EFFECT;
                    sound.play(0,loop);
                }, this,RES.ResourceItem.TYPE_SOUND);
            }
        }
    }
	
	/**
	 * 播放背景音乐
	 * @soundName 声音名
	 */
    public playBGM(soundName: string) {
        //禁止播放背景音乐，则返回
        if(this.allowBGM == false){
            return;
        }
        //播放背景音乐
        var sound: egret.Sound = this.soundList[soundName];
        if(sound){
            sound.type = egret.Sound.MUSIC;
            if(this.bgmChannel == null) {
                this.bgmChannel = sound.play(0,Number.MAX_VALUE);
            }
        //背景音乐不存在
        }else{
            //从RES中获取
            sound = RES.getRes(soundName);
            if(sound){
                this.soundList[soundName] = sound;
                sound.type = egret.Sound.MUSIC;
                if(this.bgmChannel == null) {
                    this.bgmChannel = sound.play(0,Number.MAX_VALUE);
                }
            //从远程获取
            }else{
                let url:string = "resource/assets/music/" + soundName.replace("_mp3",".mp3");
                RES.getResByUrl(url, (sound:egret.Sound)=>{
                    this.soundList[soundName] = sound;
                    sound.type = egret.Sound.MUSIC;
                    if(this.bgmChannel == null) {
                        this.bgmChannel = sound.play(0,Number.MAX_VALUE);
                    }
                }, this,RES.ResourceItem.TYPE_SOUND);
            }
        }
    }
	
	/**
	 * 停止背景音乐
	 */
    public stopBGM() {
        if(this.bgmChannel) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
    }
}

















