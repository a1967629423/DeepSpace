import { CharacterState } from "./State";
//在星球引力内部状态
export default class State_InStar extends CharacterState {
    timeout:number = 0;
    Start()
    {
        this.timeout = setTimeout(() => {
            this.character.changeState(this.character.RoundState);
        }, 2000);
    }
    die()
    {
        clearTimeout(this.timeout);
        this.character.changeState(this.character.DieState);
    }
    update()
    {
        //施加阻力,需要判断是飞出还是飞入
        //this.character.adjustVec(this.character.body.linearVelocity.neg().normalize());
        if(!this.character.nowStar){clearTimeout(this.timeout); this.character.changeState(this.character.IdleState)}
    }
}
