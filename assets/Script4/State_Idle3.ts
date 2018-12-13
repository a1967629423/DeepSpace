import CharacterState3, { OperatorStruct } from "./State3";
import Wall, { WallType } from "./Wall";
import PorpObject from "./PropObject";

export default class State_Idle3 extends CharacterState3 {

    moveVec2:cc.Vec2 = cc.v2();
    Start()
    {
        console.log("change Idle")
        this.moveVec2.y = this.character.moveSpeed;
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
            wall.Begin();
        }
    }
    onPorp(p:PorpObject,op)
    {
        this.character.LunchState.onPorp(p,op);
    }
    update(dt,op:OperatorStruct)
    {
        if(op.canOperator)
        this.character.body.linearVelocity = this.moveVec2;
    }
    onClick(v2:cc.Vec2)
    {
        // var dir = cc.v2(this.character.lunchSpeed,this.character.moveSpeed).mul(1/this.character.lunchSpeed);
        // if(this.character.nowWall.Type===WallType.Right)dir.x*=-1;
        // this.character.lunchDirect = dir;
        this.character.body.linearVelocity = cc.v2(0,0);
        this.character.changeState(this.character.LunchState);
    }

}
