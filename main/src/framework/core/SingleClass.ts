/** 
* 单例基类。
* @description 方便的继承单例基类即可实现单例，但是getInstance方法返回的是any，无法直接使用"."访问属性或方法。
* @author chenkai 2017/3/16
*/
class SingleClass {
    
    /**
     * 获取一个单例(支持<=3个参数)
     * @returns 单例
     */
    public static getInstance(...args: any[]): any {
        var Class: any = this;
        if(!Class._instance) {
            var argsLen: number = args.length;
            if(argsLen == 0) {
                Class._instance = new Class();
            } else if(argsLen == 1) {
                Class._instance = new Class(args[0]);
            } else if(argsLen == 2) {
                Class._instance = new Class(args[0],args[1]);
            } else if(argsLen == 3) {
                Class._instance = new Class(args[0],args[1],args[2]);
            }
        }
        return Class._instance;
    }
}