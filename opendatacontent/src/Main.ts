//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

    
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

    }

    private async onThemeLoadComplete(){
        console.log("Sub Main >> 子项目加载皮肤完成");

        //监听主域来的消息
        wx.onMessage(data=>{
            console.log("主域发送来的消息：",data);   //消息格式  data = {data:{cmd:"", ...}}
            switch(data.data.cmd){
                case "openid":      //保存openid
                    this.saveOpenId(data);
                break;
                case "rankFriend":   //好友排行
                    this.showRankFriend(data);
                break;
                case "hideRankFriend":   //隐藏好友排行
                    this.hideRankFriend();
                break;
                case "rankGroup":    //群排行  data格式 data = {data:{cmd:"",shareTicket:""}}
                    this.showRankGroup(data);
                break;
                case "saveScore":    //保存分数 data格式 {data:{cmd:"saveScore", score:99}}
                    this.saveScore(data);
                break;
                case "heartPanel":   //复活界面，显示超越好友
                    this.showHeartPanel(data);  //data格式 {data:{cmd:"heartPanel", score:99}}
                break;
                case "hideHeartPanel": //隐藏复活界面
                    this.hideHeartPanel();
                break;
            }
        });
    }

    //保存openid
    private saveOpenId(data){
        console.log("Sub Main >> 保存openid:", data.data.openid);
        GameConst.openId = data.data.openid;
    }

    //显示好友排行
    private friendRankPanel:FriendRankPanel;
    private showRankFriend(data){
        //读取好友关系链数据
        wx.getFriendCloudStorage({
            keyList:["rank"],
            success:(res)=>{  //res格式 {errMsg:"", data:[{KVDataList:[{key:"rank",value:"wxgame:xxx"}], nickname:"",openid:"",avatarUrl:""}, ...]}
                console.log("Sub Main >> getFriendCloudStorage:",res);
                this.friendRankPanel || (this.friendRankPanel = new FriendRankPanel());
                this.addChild(this.friendRankPanel);
                this.friendRankPanel.init(res.data);
            },
            fail:(err) => {
                console.log(err);
            },
            complete:() => {
                
            }
        });
    }

    //隐藏好友排行
    private hideRankFriend(){
        if(this.friendRankPanel){
            this.friendRankPanel.hide();
        }
    }

    //显示群排行
    private showRankGroup(data){
        console.log("Sub Main >> 准备显示群排行榜");
        wx.getGroupCloudStorage({
            shareTicket:data.data.shareTicket,
            keyList:["rank"],
            success:(res)=>{
                console.log("Sub Main >> getGroupCloudStorage success:",res);
                this.friendRankPanel || (this.friendRankPanel = new FriendRankPanel());
                this.addChild(this.friendRankPanel);
                this.friendRankPanel.init(res.data);
            },
            fail:(res)=>{

            },
            complete:(res)=>{

            }
        })
    }

    //保存分数
    private async saveScore(data){
        let curScore = data.data.score;  //当前玩家分数

        //如果分数大于上一次，才进行保存。减少服务器通讯。
        if(curScore > GameConst.maxScore){
            //获取我的分数
            let cloudInfo:any = await this.getUserCloudStorage();
            //如果已保存过我的分数，则当本次分数大于上一次，才进行保存
            if(cloudInfo.KVDataList && cloudInfo.KVDataList[0]){
                let lastScore =  JSON.parse(cloudInfo.KVDataList[0].value).wxgame.score;
                if(curScore > lastScore){
                    GameConst.maxScore = curScore;
                    this.setUserCloudStorage(curScore);
                }
            //如果未保存过我的分数，则直接保存
            }else{
                GameConst.maxScore = curScore;
                this.setUserCloudStorage(curScore);
            }
        }
    }

    //获取好友数据链
    private getUserCloudStorage(){
        return new Promise((resolve, reject) => {
             wx.getUserCloudStorage({
                keyList:["rank"],
                success:(res)=>{
                    console.log("Sub Main >> getUserCloudStorage:", res);
                    resolve(res);
                },
                fail:(res)=>{

                },
                complete:(res)=>{

                }
            });
        });
       
    }
    

    //保存分数到微信服务器
    private setUserCloudStorage(score){
        let KVDataList = [{
            key:"",
            value:""
        }];
        
        KVDataList[0].key = "rank";
        KVDataList[0].value = JSON.stringify({
            "wxgame": {
                "score": score,
                "update_time": new Date().getTime()
            },
            "cost_ms": 0
        });
        wx.setUserCloudStorage({KVDataList, success:(res)=>{
            console.log("Sub Main >> setUserCloudStorage success",res);
        },fail:(res)=>{
            console.log("Sub Main >> setUserCloudStorage fail");
        },complete:(res)=>{
            console.log("Sub Main >> setUserCloudStorage complete");
        }});
    }

    //显示复活界面
    private heartPanel:HeartPanel;
    private showHeartPanel(data){
        //读取好友关系数据链
        wx.getFriendCloudStorage({
            keyList:["rank"],
            success:(res)=>{  //res格式 {errMsg:"", data:[{KVDataList:[{key:"rank",value:"wxgame:xxx"}], nickname:"",openid:"",avatarUrl:""}, ...]}
                console.log("Sub Main >> getFriendCloudStorage:",res);
                //我当前分数
                let myScore = data.data.score;  
                //冒泡降序排列
                let rankList = res.data;
                let len = rankList.length;
                let temp;
                for(let i=0;i<len;i++){
                    for(let j=i+1;j<len;j++){
                        if(rankList[i].score < rankList[j].score){
                            temp = rankList[i];
                            rankList[i] = rankList[j];
                            rankList[j] = temp;
                        }
                    }
                }
                //获取第一个比我大的好友分数，逆序访问
                let index = -1;
                let friendScore;
                for(let i=len-1;i>=0;i--){
                    if(rankList[i].openid != GameConst.openId){
                        friendScore = JSON.parse(rankList[i].KVDataList[0].value).wxgame.score;
                        if(friendScore > myScore){
                            index = i;
                            break;
                        }
                    }
                }
                //如果有比我大的分数，则显示超越好友
                if(index != -1){
                    this.heartPanel || (this.heartPanel = new HeartPanel());
                    this.addChild(this.heartPanel);
                    this.heartPanel.init(rankList[index]);
                }
            },
            fail:(err) => {
                console.log(err);
            },
            complete:() => {
                
            }
        });
    }

    //隐藏复活界面
    private hideHeartPanel(){
        this.heartPanel && this.heartPanel.hide();
    }

}
