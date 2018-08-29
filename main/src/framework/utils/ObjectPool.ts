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
class ObjectPool extends SingleClass{
    /**存储对象池的Object*/
    private poolList: Object = {};
    
    /**          
     * 获取对象池，如果不存在则新建一个          
     * @param clz 对象类定义       
     * @param initNum 初始化对象池数量          
     */
    public getPool(clz: any,initNum: number = 0): Pool {
        if(!this.poolList[clz]) {
            this.poolList[clz] = new Pool(clz);
            if(initNum != 0) {
                var pool: Pool = this.poolList[clz];
                for(var i: number = 0;i < initNum;i++) {
                    pool.returnObject(new clz());
                }
            }
        }
        return this.poolList[clz];
    }
}

/**对象池*/
class Pool{
    /**存储对象的数组*/
    private list: Array<any>;
    /**对象类型*/
    private clz: any;
    
    public constructor(clz: any) {
        this.clz = clz;
        this.list = [];
    }

    /**获取对象*/
    public getObject(): any {
        if(this.list.length > 0) {
            return this.list.pop();
        }
        let clz = this.clz;
        return new clz();

    }

    /**回收对象*/
    public returnObject(obj: any): void {
        this.list.push(obj);
    }
    
    /**获取对象池长度*/
    public get length(){
        var count:number = 0;
        for(var key in this.list){
            count ++;
        }
        return count;
    }
}