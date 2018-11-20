import CharacterState3 from "./State3";
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
        // }
        var dir = cc.v2(1,0.5);
        if(this.character.nowWall.Type===WallType.Right)dir.x*=-1;
        this.character.lunchDirect = dir;
        this.character.body.linearVelocity = cc.v2(0,0);
        this.character.changeState(this.character.LunchState);
    }
    onWall(wall:Wall)
    {
        this.character.LunchState.onWall(wall);
    }
    onPorp(p:PorpObject)
    {
        this.character.LunchState.onPorp(p);
    }
    update()
    {
        this.character.body.linearVelocity = cc.v2(0,1).mul(300);
    }

}
