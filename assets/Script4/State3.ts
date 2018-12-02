import Character4 from "./Character4";
import Wall from "./Wall";
import Porpp from "./PropObject";
export class OperatorStruct
{
    public canOperator:boolean = true;
    public operatorInformation:any = Object.create(null);
    public static getinstance()
    {
        return new OperatorStruct();
    }
}
export default class CharacterState3 {
    /**
     * 附着在此状态上的状态
     */
    attachment:{[idx:string]:{ch:CharacterState3,construct:{prototype:CharacterState3}}} = {};
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
     * @param cs 附着在此状态上的状态类型
     */
    attaching(type: {prototype: CharacterState3,apply:Function}):CharacterState3
    {
        //创建实例
        var cs:CharacterState3 = type.apply({__proto__:type.prototype},[this.character])
        cs.QuitEvent = this.attachQuit.bind(this);
        var typestr = typeof cs;
        if(!this.attachment[typestr])
        {
            this.attachment[typestr]= {ch:cs,construct:type};
        }
        else
        {
            this.attachment[typestr].ch.Quit();
            this.attachment[typestr].ch = cs;
        }
        
        cs.Start();
        return cs;
        
    }
    attachQuit(CS:CharacterState3){
        let typestr = typeof CS;
        this.attachment[typestr] = null;
        delete this.attachment[typestr];
    }
    unattach(cs:CharacterState3)
    {
        cs.Quit();  
    }
    getAttach(type: {prototype: CharacterState3,apply:Function})
    {
        for(let val in this.attachment)
        {
            if(this.attachment[val].construct === type)return this.attachment[val].ch;
        }
        return null;
    }
    Start(){}
    onWall(stype:Wall,Op:OperatorStruct=OperatorStruct.getinstance()){
        for(let val in this.attachment)
        {
            this.attachment[val].ch.onWall(stype,Op);
        }
    }
    onPorp(ptype:Porpp,Op:OperatorStruct=OperatorStruct.getinstance()){
        for(let val in this.attachment)
        {
            this.attachment[val].ch.onPorp(ptype,Op);
        }
    }
    update(dt:number){
        for(let val in this.attachment)
        {
            this.attachment[val].ch.update(dt);
        }
    }
    onClick(v2:cc.Vec2){}
    onTouchV2(v2:cc.Vec2){}
    onTouchLocal(v2:cc.Vec2){}
    endTouch(){}
    die():boolean{
        for(let val in this.attachment)
        {
            if(!this.attachment[val].ch.die())return false;
        }
        return true;
    }
    Quit(){if(this.QuitEvent){this.QuitEvent(this);}}

}
