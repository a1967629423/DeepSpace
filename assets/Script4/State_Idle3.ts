import CharacterState3, { OperatorStruct } from "./State3";
import Until from "../Script/Tools/Until";
import Wall, { WallType } from "./Wall";
import PorpObject from "./PropObject";

export default class State_Idle3 extends CharacterState3 {

    Start()
    {
        console.log("change Idle")
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
    update()
    {
        this.character.body.linearVelocity = cc.v2(0,1).mul(this.character.moveSpeed);
    }
    onClick(v2:cc.Vec2)
    {
        var dir = cc.v2(this.character.lunchSpeed,this.character.moveSpeed).mul(1/this.character.lunchSpeed);
        if(this.character.nowWall.Type===WallType.Right)dir.x*=-1;
        this.character.lunchDirect = dir;
        this.character.body.linearVelocity = cc.v2(0,0);
        this.character.changeState(this.character.LunchState);
    }

}
