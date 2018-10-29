import { CharacterState } from "./State";
//发射状态
export default class State_Lunch extends CharacterState {
    lunch:cc.Vec2=cc.v2(0,0);
    timeout:number=0;
    Start()
    {
        this.lunch = this.character.dv2;
        if(this.character.body.type !== cc.RigidBodyType.Dynamic){this.character.body.type = cc.RigidBodyType.Dynamic}
        this.character.body.applyForceToCenter(this.lunch.mul(30),true);
        this.timeout = setTimeout(() => {
            this.character.changeState(this.character.IdleState);
        }, 3000);
    }
    update()
    {
        if(this.character.nowStar){clearTimeout(this.timeout);this.character.changeState(this.character.InStarState)}
    }

}
