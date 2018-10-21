const {ccclass, property} = cc._decorator;
//分数管理类
//实现加分
//实现分数的获取
@ccclass
export default class GradeManage  {
    private static _inster:GradeManage = null;
    public static get inster() : GradeManage {
        if(this._inster)this._inster = new GradeManage();
        return this._inster;
    }
    nowGrade:number;
    addGrade(val:number)
    {
        this.nowGrade+= this.nowGrade;
    }

}
