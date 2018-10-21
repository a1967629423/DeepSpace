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
    private _nowGrade:number;
    public get nowGrade() : number {
        return this._nowGrade;
    }
    addGrade(val:number)
    {
        this._nowGrade+= this._nowGrade;
    }
    

    

}
