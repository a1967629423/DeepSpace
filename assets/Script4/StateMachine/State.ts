import StateMachine from "./StateMachine";

export class OperatorStruct
{
    public canOperator:boolean = true;
    public operatorInformation:any = Object.create(null);
    public static cachesOperator = null;
    public static getinstance()
    {
        //角色只有一个，所以只有一个Operator
        let op;
        if(!this.cachesOperator)op = new OperatorStruct();
        else
        {
            op = this.cachesOperator;
            this.cachesOperator = null;
        }
        return op;
    }
    constructor()
    {
        if(!OperatorStruct.cachesOperator)OperatorStruct.cachesOperator = this;
    }
    destroy()
    {
        this.canOperator = true;
        this.operatorInformation = Object.create(null);
        OperatorStruct.cachesOperator = this;
    }
}
export default class State  {
    quitEvent:Function = null;
    context:StateMachine = null;
    constructor(cxt:StateMachine)
    {
        this.context = cxt;
    }
    Start () {

    }
    update(dt:number,op:OperatorStruct)
    {

    }
    Quit()
    {
        if(this.quitEvent)this.quitEvent(this);
    }
}
