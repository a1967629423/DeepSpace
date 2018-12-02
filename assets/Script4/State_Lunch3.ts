import CharacterState3, { OperatorStruct } from "./State3";
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

    onWall(wall:Wall,op:OperatorStruct)
    {
        //此处先暂时不转移到相应状态
        if(op.canOperator)
        {
            if(!this.Ignore)
            {
                wall.Begin();
                this.character.body.linearVelocity  = cc.v2(0,0);
                if((<DieWall>wall).die===undefined)
                {
                    if(this.character.nowState!==this.character.IdleState)this.character.changeState(this.character.IdleState);
                }
               
            }
        }
    }
    onPorp(porp:PorpObject,op:OperatorStruct)
    {
        //此处先暂时不转移到相应状态
        if(op.canOperator)
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
