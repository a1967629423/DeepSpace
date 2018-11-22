import CharacterState3 from "./State3";
import Wall from "./Wall";
import PorpObject from "./PropObject";
import DieWall from "./DieWall";

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
        this.character.body.linearVelocity = this.lunchDir.mul(this.character.lunchSpeed);
    }

    onWall(spring:Wall)
    {
        //此处先暂时不转移到相应状态
        if((<DieWall>spring).die===undefined)
        {
            if(!this.Ignore)
            {
                spring.Begin();
                this.character.body.linearVelocity  = cc.v2(0,0);
                this.character.changeState(this.character.IdleState);
            }
        }
        else
        {
            if(cc.isValid(spring,true))
            {
                if(this.character.health<=0)
                {
                    spring.Begin();
                }
                else
                {
                    spring.node.destroy();
                    spring.destroy();
                    this.character.health--;
                }
            }
            
        }
    }
    onPorp(porp:PorpObject)
    {
        //此处先暂时不转移到相应状态
        if(cc.isValid(porp,true))
        {
            if(!porp.Begin())
            {
                this.character.changeState(this.character.IdleState);
            }
        }
    }
    die()
    {
        return super.die();
    }


}
