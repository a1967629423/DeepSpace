import { CharacterState } from "./State";
//闲置状态
export default class State_Idle extends CharacterState {
    lunch:cc.Vec2 = cc.v2(0,0);
    Start()
    {

    }
    update(dt:number)
    {
        if(this.character.nowStar){this.character.changeState(this.character.InStarState)}
    }
    onTouch(v2:cc.Vec2)
    {
        var fv2 = v2.mul(-1);
        var ro =  fv2.signAngle(cc.v2(0,1))*180/3.14;
        this.character.node.rotation = ro;
        this.lunch = v2.neg();
    }
    endTouch()
    {
        this.character.dv2 = this.lunch;
        this.character.changeState(this.character.LunchState);
    }
}
