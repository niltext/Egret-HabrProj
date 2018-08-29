var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 用户信息
 * @author chenkai 2018/7/29
 */
var UserInfo = (function () {
    function UserInfo() {
    }
    UserInfo.prototype.saveData = function (data) {
        this.nickName = data.nickName;
        this.avatarUrl = data.avatarUrl;
    };
    return UserInfo;
}());
__reflect(UserInfo.prototype, "UserInfo");
