import Character4 from "./Character4";
import Wall from "./Wall";
import Porpp from "./PropObject";
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
export default class CharacterState3 {
    /**
     * 附着在此状态上的状态
     */
    attachment:{[idx:string]:{ch:CharacterState3[],construct:{prototype:CharacterState3}}} = {};
    sqs:CharacterState3[] = [];
    character:Character4 = null;
    /**
     * 被依附的状态
     */
    attachState:CharacterState3 = null
    constructor(ch:Character4)
    {
        this.character = ch;
    }
    QuitEvent:Function = null;
    /**
     * 使状态附着在此状态上
     * 后面添加的状态执行优先级大于前面
     * @param cs 附着在此状态上的状态类型
     */
    
    attaching<T extends CharacterState3>(type: {prototype: T,apply:Function}):T
    {
        //创建实例
        var cs:T = type.apply({__proto__:type.prototype},[this.character])
        cs.QuitEvent = this.attachQuit.bind(this);
        var typestr = typeof cs;
        if(!this.attachment[typestr])
        {
            this.attachment[typestr]= {ch:Array<CharacterState3>(cs),construct:type};
            this.sqs.push(cs);
        }
        else
        {
            this.attachment[typestr].ch.push(cs);
            this.sqs.push(cs);
        }
        setTimeout(()=>{
            cs.Start();
        })
        return cs;
        
    }
    attachQuit(CS:CharacterState3){
        let typestr = typeof CS;
        let index = this.attachment[typestr].ch.findIndex((value:CharacterState3)=>{
            if(value===CS)return true;
        });
        let index2 = this.sqs.findIndex((value:CharacterState3)=>{
            if(value===CS)return true;
        });
        this.attachment[typestr].ch.splice(index,1);
        this.sqs.splice(index2,1);
        if(this.attachment[typestr].ch.length<1)delete this.attachment[typestr];
    }
    /**
     * 修改一个附加状态的执行顺序
     */
    changAttachStateOrder()
    {

    }
    unattach(cs:CharacterState3)
    {
        cs.Quit();  
    }
    getAttachs(type: {prototype: CharacterState3,apply:Function})
    {
        for(let val in this.attachment)
        {
            if(this.attachment[val].construct === type)return this.attachment[val].ch;
        }
        return null;
    }
    getAttach(type: {prototype: CharacterState3,apply:Function})
    {
        let ats = this.getAttachs(type);
        return ats?ats[0]:ats;
    }
    
    Start(){}
    onWall(stype:Wall,Op:OperatorStruct=OperatorStruct.getinstance()){
        for(var i = this.sqs.length-1;i>=0;i--)
        {
            this.sqs[i].onWall(stype,Op);
        }
        // for(let val in this.attachment)
        // {
            
        //     let nch = this.attachment[val].ch;
        //     for(let i = nch.length-1;i>=0;i--)
        //     {
        //         nch[i].onWall(stype,Op);
        //     }
        // }
    }
    onPorp(ptype:Porpp,Op:OperatorStruct=OperatorStruct.getinstance()){
        for(var i = this.sqs.length-1;i>=0;i--)
        {
            this.sqs[i].onPorp(ptype,Op);
        }
        // for(let val in this.attachment)
        // {
        //     let nch = this.attachment[val].ch;
        //     for(let i = nch.length-1;i>=0;i--)
        //     {
        //         nch[i].onPorp(ptype,Op);
        //     }
        // }
    }
    update(dt:number,Op:OperatorStruct=OperatorStruct.getinstance()){
        for(var i = this.sqs.length-1;i>=0;i--)
        {
            this.sqs[i].update(dt,Op);
        }
        // for(let val in this.attachment)
        // {
        //     let nch = this.attachment[val].ch;
        //     for(let i = nch.length-1;i>=0;i--)
        //     {
        //         nch[i].update(dt,Op);
        //     }
        // }
    }
    onClick(v2:cc.Vec2){}
    onTouchV2(v2:cc.Vec2){}
    onTouchLocal(v2:cc.Vec2){}
    endTouch(){}
    die():boolean{
        for(let val in this.attachment)
        {
            this.attachment[val].ch.forEach((value:CharacterState3)=>{
                if(!value.die())return false;
            })
        }
        return true;
    }
    Quit(){if(this.QuitEvent){this.QuitEvent(this);}}

}
