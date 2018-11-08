import CharacterState3 from "./State3";
import Until from "../Script/Tools/Until";

export default class State_Drag extends CharacterState3 {

    firstTouch:cc.Vec2 = cc.v2(0,0);
    lunchdir:cc.Vec2 = cc.v2(0,0);
    nowRotato:number = 0;
    Start()
    {
        if(this.character.CancelNode){
            this.character.CancelNode.active = true;
        }
        this.nowRotato = this.character.node.rotation;
        this.firstTouch = this.character.firstTouchPosition;
    }
    onTouchV2(v2:cc.Vec2)
    {
        this.lunchdir = v2.sub(this.firstTouch).negSelf();
        this.character.node.rotation = this.lunchdir.signAngle(cc.v2(0,1))*180/Math.PI;
    }
    endTouch()
    {
        if(Until.isTouch(this.character.CancelNode))
        {
            this.character.changeState(this.character.IdleState);
        }
        else
        {
            this.character.lunchDirect = this.lunchdir;
            this.character.changeState(this.character.LunchState);
        }
    }
    Quit()
    {
        this.firstTouch = cc.v2(0,0);
        this.lunchdir = cc.v2(0,0);
        this.character.firstTouchPosition = cc.v2(0,0);
        this.character.node.rotation = this.nowRotato;
        this.nowRotato = 0;
        if(this.character.CancelNode)this.character.CancelNode.active = false;
    }

}