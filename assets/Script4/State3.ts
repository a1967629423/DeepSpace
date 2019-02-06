import Character4 from "./Character4";
import Wall from "./Wall";
import Porpp from "./PropObject";
import State, { OperatorStruct } from "./StateMachine/State";

export default class CharacterState3 extends State {
    /**
     * 附着在此状态上的状态
     */
    character:Character4 = null;
    /**
     * 被依附的状态
     */
    attachState:CharacterState3 = null
    constructor(ch:Character4)
    {
        super(ch);
        this.character = ch;
    }
    
    Start(){}
    onWall(stype:Wall,Op:OperatorStruct=OperatorStruct.getinstance()){
    }
    onProp(ptype:Porpp,Op:OperatorStruct=OperatorStruct.getinstance()){
    }
    update(dt:number,Op:OperatorStruct=OperatorStruct.getinstance()){
    }
    onClick(v2:cc.Vec2){}
    onTouchV2(v2:cc.Vec2){}
    onTouchLocal(v2:cc.Vec2){}
    endTouch(){}
    die():boolean{
        return true;
    }

}
