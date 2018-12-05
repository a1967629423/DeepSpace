const {ccclass, property} = cc._decorator;
//分数管理类
//实现加分
//实现分数的获取
@ccclass
export default class GradeManage  {
    private static _instance:GradeManage = null;
    public static get instance() : GradeManage {
        if(!this._instance)this._instance = new GradeManage();
        return this._instance;
    }
    private _nowGrade:number = 0;
    private _lastGrade:number = 0;
    private _nowSpecial:number = 0;
    public get nowGrade() : number {
        return this._nowGrade;
    }
    
    public get lastGrade() : number {
        return this._lastGrade;
    }
    public 
    public get nowSpecial() : number {
        return this._nowGrade;
    }
    public set nowSpecial(val : number) {
        this._nowGrade = val;
    }
    
    
    
    
    constructor()
    {
        if (window.localStorage.grade)
        {
            this._lastGrade = window.localStorage.grade;
        }
    }
    addGrade(val:number)
    {
        this._nowGrade+= val;
    }
    saveGrade()
    {
        window.localStorage.grads = this._nowGrade;
    }
    clearGrade()
    {
        this._nowGrade = 0;
    }

    

    

}
