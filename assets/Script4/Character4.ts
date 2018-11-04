import Character from "../Script/Character";
import Spring from "./Spring";
import Porp from "./prop";
import CharacterState3 from "./State3";
import State_Idle3 from "./State_Idle3";
import State_Lunch3 from "./State_Lunch3";
import State_Drag from "./State_Drag";
import State_PropApply from "./State_PropApply";
import State_SpringApply from "./State_SpringApply";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Character4 extends Character {
    @property({type:cc.Node,displayName:"取消Node"})
    CancelNode:cc.Node = null;
    private _nowState:CharacterState3 = null;
    public get nowState() : CharacterState3 {
        return this._nowState;
    }
    IdleState:State_Idle3 = null;
    LunchState:State_Lunch3 = null;
    DragState:State_Drag = null;
    PorpApply:State_PropApply = null;
    SpringApply:State_SpringApply = null;

    firstTouchPosition:cc.Vec2 = cc.v2(0,0);
    lunchDirect:cc.Vec2 = cc.v2(0,0);
    constructor()
    {
        super();
        this.IdleState = new State_Idle3(this);
        this.LunchState = new State_Lunch3(this);
        this.DragState = new State_Drag(this);
        this.PorpApply = new State_PropApply(this);
        this.SpringApply = new State_SpringApply(this);
    }
    /**
     * 改变状态
     * @param cs 状态
     */
    changeState(cs:CharacterState3)
    {
        if(this.nowState)this.nowState.Quit();
        cs.Start();
        this._nowState = cs;
    }
    onSpring(stype:Spring)
    {
        if(this.nowState)this.nowState.onSpring(stype);
    }
    onProp(ptype:Porp)
    {
        if(this.nowState)this.nowState.onPorp(ptype);
    }
    start()
    {
        super.start();
        this.changeState(this.IdleState);
    }
    update(dt)
    {
        if(this.nowState)this.nowState.update(dt);
    }
    onTouchV2(v2:cc.Vec2)
    {
        if(this.nowState)this.nowState.onTouchV2(v2);
    }
    onTouchLocal(v2:cc.Vec2)
    {
        if(this.nowState)this.nowState.onTouchLocal(v2);
    }
    endTouch()
    {
        if(this.nowState)this.nowState.endTouch();
    }


}
