import { CharacterState } from "./State";
//在星球引力内部状态
export default class State_InStar extends CharacterState {
    timeout:number = 0;
    starPosition:cc.Vec2 = cc.v2(0,0);
    Start()
    {
        if(this.character.nowStar){
            this.starPosition = this.character.nowStar.node.getPosition();
        }
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
        
        if(this.character.body.linearVelocity.dot(this.character.node.getPosition().sub(this.starPosition))<-1)
        {
            this.character.adjustVec(this.character.node.getPosition().sub(this.starPosition).normalize());
        } 
        if(!this.character.nowStar){clearTimeout(this.timeout); this.character.changeState(this.character.IdleState)}
    }
    Quit()
    {
        super.Quit();
        this.timeout = 0;
        //不重置星球位置，防止出现星球不存在
    }
}
