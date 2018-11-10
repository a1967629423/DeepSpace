import CharacterState3 from "./State3";
import Until from "../Script/Tools/Until";

export default class State_Drag extends CharacterState3 {

    firstTouch: cc.Vec2 = cc.v2(0, 0);
    lunchdir: cc.Vec2 = cc.v2(0, 0);
    nowRotato: number = 0;
    Start() {
        if (this.character.CancelNode) {
            this.character.CancelNode.active = true;
        }
        this.nowRotato = this.character.node.rotation;
        console.log(this.nowRotato);
        this.firstTouch = this.character.firstTouchPosition;
        if(this.character.body.type != cc.RigidBodyType.Static)this.character.body.type = cc.RigidBodyType.Static;
    }
    onTouchV2(v2: cc.Vec2) {

        this.lunchdir = v2.sub(this.firstTouch).negSelf();
        var rotation = this.lunchdir.signAngle(cc.v2(0, 1)) * 180 / Math.PI;
        this.character.node.rotation = rotation;

        

    }
    changeToLunch()
    {
        this.character.lunchDirect = this.lunchdir.normalize();   
        this.character.changeState(this.character.LunchState);
    }
    endTouch() {
        if(this.character.nowWall)
        {
            if(this.character.nowWall.node.name === "Left"&&this.lunchdir.x>0)
            {
                this.changeToLunch();
            } else if(this.character.nowWall.node.name === "Right"&&this.lunchdir.x<0)
            {
                this.changeToLunch();
            } else
            {
                this.character.node.rotation = this.nowRotato;
                this.character.changeState(this.character.IdleState);
            }
        }
        else
        {
            this.changeToLunch();
        }

        if (Until.isTouch(this.character.CancelNode)) {
            this.character.node.rotation = this.nowRotato;
            this.character.changeState(this.character.IdleState);     
        }
    }
    Quit() {
        this.firstTouch = cc.v2(0, 0);
        this.lunchdir = cc.v2(0, 0);
        this.character.firstTouchPosition = cc.v2(0, 0);
        //this.character.node.rotation = this.nowRotato;
        
        this.nowRotato = 0;
        if (this.character.CancelNode) this.character.CancelNode.active = false;
    }

}
