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
 * 字符串工具
 * @author chenkai 2016/12/18
 */
var StringTool = (function (_super) {
    __extends(StringTool, _super);
    function StringTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 字符串大于一定长度时，进行换行(增加换行符"\n")
     * @param str 字符串
     * @param num 限制长度
     */
    StringTool.formatWrap = function (str, num) {
        var result = "";
        var row = Math.ceil(str.length / num); //有几行
        //大于1行时，进行换行处理
        if (row > 1) {
            var i = void 0;
            for (i = 0; i < row; i++) {
                if (i < row - 1) {
                    result += str.substr(i * num, num) + "\n"; //"123456" substr(0,3) =>"123"
                }
                else {
                    //最后一行
                    result += str.substr(i * num, str.length);
                }
            }
        }
        else {
            result = str;
        }
        return result;
    };
    /**
     * 删除左右两端的空格.   " abc " - > "abc"
     * @str 待处理字符串
     * @is_global 是否处理中间空格
     * @return 处理后字符串
     */
    StringTool.trim = function (str, bGloal) {
        if (bGloal === void 0) { bGloal = false; }
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g, "");
        if (bGloal) {
            result = result.replace(/\s/g, "");
        }
        return result;
    };
    /**
     * 由A-Z,0-9随机组成一个指定长度验证码
     * @param n 验证码位数
     */
    StringTool.prototype.getVerificationCode = function (n) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var len = str.length;
        var code = "";
        for (var i = 0; i < n; i++) {
            code += str.charAt(NumberTool.getRandInt(0, len));
        }
        return code;
    };
    /**
     * 用"..."代替超出指定长度的字符串
     * @param str 源字符串
     * @param len 字符串可显示的长度
     * @returns
     */
    StringTool.prototype.cutString = function (str, len) {
        if (str.length > len) {
            str = str.substr(0, len);
            str += "...";
        }
        return str;
    };
    /**
     * 检查字符串是否为空
     * @param str 源字符串
     * @return 是否为空
     */
    StringTool.prototype.checkEmpty = function (str) {
        if (str.length == 0) {
            return true;
        }
        return false;
    };
    return StringTool;
}(SingleClass));
__reflect(StringTool.prototype, "StringTool");
