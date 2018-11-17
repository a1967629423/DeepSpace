import CharacterState3 from "./State3";
import Wall from "./Wall";
import Porp from "./prop";

export default class State_Lunch3  extends CharacterState3 {
    lunchDir:cc.Vec2 = cc.v2(0,0);
    Ignore:boolean;
    Start()
    {
        this.Ignore = true;
        console.log("change Lunch");
        this.lunchDir = this.character.lunchDirect;
        setTimeout(()=>{this.Ignore = false;},100);
        if(this.character.body.type != cc.RigidBodyType.Animated)this.character.body.type = cc.RigidBodyType.Animated;
        
        //this.character.body.applyForceToCenter(this.lunchDir.normalize().mul(12000),true);
    }
    update(dt:number)
    {
        this.character.body.linearVelocity = this.lunchDir.mul(900);
    }

    onWall(spring:Wall)
    {
        //此处先暂时不转移到相应状态
        if(!this.Ignore)
        {
            spring.Begin();
            this.character.body.linearVelocity  = cc.v2(0,0);
            this.character.changeState(this.character.IdleState);
        }
    }
    onPorp(porp:Porp)
    {
        //此处先暂时不转移到相应状态
        if(!porp.Begin())
        {
            this.character.changeState(this.character.IdleState);
        }
    }
    die()
    {
        return super.die();
    }


}
