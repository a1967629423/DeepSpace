import Character from "../Script/Character";
import Wall from "./Wall";
import Porp from "./prop";
import CharacterState3 from "./State3";
import State_Idle3 from "./State_Idle3";
import State_Lunch3 from "./State_Lunch3";
import State_Drag from "./State_Drag";
import State_PropApply from "./State_PropApply";
import State_SpringApply from "./State_SpringApply";
import State_Die3 from "./State_Die3";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Character4 extends Character {
    @property({type:cc.Node,displayName:"取消Node"})
    CancelNode:cc.Node = null;
    @property({type:cc.Node,displayName:"死亡后弹窗Node"})
    DieLayoutNode:cc.Node = null;
    private _nowState:CharacterState3 = null;
    public get nowState() : CharacterState3 {
        return this._nowState;
    }
    IdleState:State_Idle3 = null;
    LunchState:State_Lunch3 = null;
    DragState:State_Drag = null;
    PorpApply:State_PropApply = null;
    SpringApply:State_SpringApply = null;
    DieState:State_Die3 = null;
    firstTouchPosition:cc.Vec2 = cc.v2(0,0);
    lunchDirect:cc.Vec2 = cc.v2(0,0);
    nowWall:Wall = null;
    constructor()
    {
        super();
        this.IdleState = new State_Idle3(this);
        this.LunchState = new State_Lunch3(this);
        this.DragState = new State_Drag(this);
        this.PorpApply = new State_PropApply(this);
        this.SpringApply = new State_SpringApply(this);
        this.DieState = new State_Die3(this);
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
    onWall(stype:Wall)
    {
        this.nowWall = stype;
        if(this.nowState)this.nowState.onWall(stype);
    }
    onProp(ptype:Porp)
    {
        if(this.nowState)this.nowState.onPorp(ptype);
    }
    start()
    {
        super.start();
        this.changeState(this.IdleState);
        this.node.zIndex = 1;
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
    maskTouch()
    {

    }
    die()
    {
        if(this.nowState&&this._nowState!= this.DieState&&this.nowState.die())this.changeState(this.DieState);
    }


}
