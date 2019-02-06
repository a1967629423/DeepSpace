import CharacterState3 from "./State3";
import Wall, { WallType } from "./Wall";
import PorpObject from "./PropObject";
import { OperatorStruct } from "./StateMachine/State";

export default class State_Idle3 extends CharacterState3 {

    moveVec2:cc.Vec2 = cc.v2();
    relayVec:cc.Vec2;
    isInit:boolean = false;
    Start()
    {
        console.log("change Idle")
        this.character.Animation.play("characterIdle");
        this.moveVec2.y = this.character.moveSpeed;
        //this.relayVec = this.moveVec2.mul(GlobalTime.DefaultDt);
        if(!this.isInit)this.init();
    }
    init()
    {
        this.character.node.on("moveSpeedChange",this.moveSpeedChange,this);
        this.isInit = true;
    }
    moveSpeedChange(val:number)
    {
        this.moveVec2.y = this.character.moveSpeed+val;
    }
    calculateRelay(dt)
    {
        this.relayVec = this.moveVec2.mul(dt);
    }
    onTouchV2(v2:cc.Vec2)
    {
        //项目改动，现在只要点击屏幕就来回跳跃
        // if(this.character.nowState!==this.character.DragState&&Until.isTouch(this.character.node))
        // {
        //     this.character.firstTouchPosition = v2;
        //     this.character.changeState(this.character.DragState);
        //

    }
    onWall(wall:Wall,op:OperatorStruct)
    {
        //this.character.LunchState.onWall(wall,op);
        if(op.canOperator)
        {
            if(wall === this.character.nowWall&&wall.Collider)
            {
                wall.Collider.enabled = false;
            }
            wall.Begin();
        }
    }
    onProp(p:PorpObject,op)
    {
        this.character.LunchState.onProp(p,op);
    }
    update(dt,op:OperatorStruct)
    {
        if(op.canOperator)
        {
            this.character.body.linearVelocity = this.moveVec2;
        }
        
    }
    onClick(v2:cc.Vec2)
    {
        // var dir = cc.v2(this.character.lunchSpeed,this.character.moveSpeed).mul(1/this.character.lunchSpeed);
        // if(this.character.nowWall.Type===WallType.Right)dir.x*=-1;
        // this.character.lunchDirect = dir;
        this.character.body.linearVelocity = cc.v2(0,0);
        this.character.changeState(this.character.LunchState);
    }
    Quit()
    {
        super.Quit();

    }
}
