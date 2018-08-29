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
 * 对象池
 * @author chenkai 2016/12/23
 *
 * @example
 * //获取对象池
 * var pool:Pool = App.ObjectPool.getPool("Ball",10);
 * //获取一个Ball
 * var ball:Ball = pool.getObject();
 * //回收一个Ball
 * pool.returnObject(ball);
*/
var ObjectPool = (function (_super) {
    __extends(ObjectPool, _super);
    function ObjectPool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**存储对象池的Object*/
        _this.poolList = {};
        return _this;
    }
    /**
     * 获取对象池，如果不存在则新建一个
     * @param clz 对象类定义
     * @param initNum 初始化对象池数量
     */
    ObjectPool.prototype.getPool = function (clz, initNum) {
        if (initNum === void 0) { initNum = 0; }
        if (!this.poolList[clz]) {
            this.poolList[clz] = new Pool(clz);
            if (initNum != 0) {
                var pool = this.poolList[clz];
                for (var i = 0; i < initNum; i++) {
                    pool.returnObject(new clz());
                }
            }
        }
        return this.poolList[clz];
    };
    return ObjectPool;
}(SingleClass));
__reflect(ObjectPool.prototype, "ObjectPool");
/**对象池*/
var Pool = (function () {
    function Pool(clz) {
        this.clz = clz;
        this.list = [];
    }
    /**获取对象*/
    Pool.prototype.getObject = function () {
        if (this.list.length > 0) {
            return this.list.pop();
        }
        var clz = this.clz;
        return new clz();
    };
    /**回收对象*/
    Pool.prototype.returnObject = function (obj) {
        this.list.push(obj);
    };
    Object.defineProperty(Pool.prototype, "length", {
        /**获取对象池长度*/
        get: function () {
            var count = 0;
            for (var key in this.list) {
                count++;
            }
            return count;
        },
        enumerable: true,
        configurable: true
    });
    return Pool;
}());
__reflect(Pool.prototype, "Pool");
