import Character from "../Script/Character";
import Wall from "./Wall";
import CharacterState3, { OperatorStruct } from "./State3";
import State_Idle3 from "./State_Idle3";
import State_Lunch3 from "./State_Lunch3";
import State_Drag from "./State_Drag";
import State_PropApply from "./State_PropApply";
import State_SpringApply from "./State_SpringApply";
import State_Die3 from "./State_Die3";
import PorpObject from "./PropObject";
import State_Begin3 from "./State_Begin3";
import State_Global from "./State_Global";
import Until from "../Script/Tools/Until";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Character4 extends Character {
    @property({type:cc.Node,displayName:"取消Node"})
    CancelNode:cc.Node = null;
    @property({type:cc.Node,displayName:"死亡后弹窗Node"})
    DieLayoutNode:cc.Node = null;
    @property({displayName:"最大生命值",step:1})
    healthMax:number = 3;
    @property({displayName:"在墙壁上的移动速度"})
    moveSpeed:number = 300;
    @property({displayName:"发射速度"})
    lunchSpeed:number = 900;
    
    pauseState:boolean = false;

    private _nowState:CharacterState3 = null;
    private _globalState:CharacterState3 = null;
    public get globalState():CharacterState3
    {
        return this._globalState;
    }
    public get nowState() : CharacterState3 {
        return this._nowState;
    }
    BeginState:State_Begin3 = null;
    IdleState:State_Idle3 = null;
    LunchState:State_Lunch3 = null;
    DragState:State_Drag = null;
    PorpApply:State_PropApply = null;
    SpringApply:State_SpringApply = null;
    DieState:State_Die3 = null;
    private GState:State_Global = null;
    firstTouchPosition:cc.Vec2 = cc.v2(0,0);
    lunchDirect:cc.Vec2 = cc.v2(0,0);
    private _nowWall:Wall = null;
    public get nowWall()
    {
        return this._nowWall;
    }
    private _health:number = 0;
    public get health():number
    {
        return this._health;
    }
    public set health(val)
    {
        if(val<=this.healthMax)
        {
            this.node.emit("healthChange",val,val-this._health);
            this._health = val;
        }
    }
    constructor()
    {
        super();
        this.IdleState = new State_Idle3(this);
        this.LunchState = new State_Lunch3(this);
        this.DragState = new State_Drag(this);
        this.PorpApply = new State_PropApply(this);
        this.SpringApply = new State_SpringApply(this);
        this.DieState = new State_Die3(this);
        this.BeginState = new State_Begin3(this);
        this.GState = new State_Global(this);
    }
    /**
     * 改变状态
     * @param cs 状态
     */
    changeState(cs:CharacterState3)
    {
        if(this.nowState)this.nowState.Quit();
        this._nowState = cs;
        cs.Start();
        
    }
    onWall(stype:Wall)
    {
        if(Until.isValid(stype.node,true))
        {
            this._nowWall = stype;
            let op = OperatorStruct.getinstance();
            if(this._globalState)this._globalState.onWall(stype,op)
            if(this.nowState)this.nowState.onWall(stype,op);
            op.destroy();
        }
    }
    onProp(ptype:PorpObject)
    {
        if(Until.isValid(ptype.node,true))
        {
            let op = OperatorStruct.getinstance();
            if(this.globalState)this.globalState.onPorp(ptype,op)
            if(this.nowState)this.nowState.onPorp(ptype,op);
            op.destroy();
        }
    }
    onLoad()
    {
        super.onLoad();
        this._globalState = this.GState;
        this._globalState.Start();
    }
    start()
    {
        super.start();
        this.changeState(this.BeginState);
        this.node.zIndex = 1;
    }
    update(dt)
    {
        if(!this.pauseState)
        {
            this.distance += Math.abs(this.node.y-this.lastY);
            this.lastY = this.node.y;
            let op = OperatorStruct.getinstance();
            if(this._globalState)this._globalState.update(dt,op);
            if(this.nowState)this.nowState.update(dt,op);
            op.destroy();
        }
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
    onClick(v2:cc.Vec2)
    {
        if(this.nowState)this.nowState.onClick(v2);
    }
    maskTouch()
    {

    }
    pause()
    {
        this.pauseState = true;
    }
    resume()
    {
        this.pauseState = false;
    }
    die()
    {
        if(this.nowState&&this._nowState!= this.DieState&&this.nowState.die())this.changeState(this.DieState);
    }


}
