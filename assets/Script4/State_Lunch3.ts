import CharacterState3, { OperatorStruct } from "./State3";
import Wall, { WallType } from "./Wall";
import PorpObject from "./PropObject";
import DieWall from "./DieWall";

export default class State_Lunch3  extends CharacterState3 {
    lunchDir:cc.Vec2 = cc.v2(0,0);
    Ignore:boolean;
    Start()
    {
        
        this.Ignore = true;
        console.log("change Lunch");
        var dir = cc.v2(this.character.lunchSpeed,this.character.moveSpeed).mul(1/this.character.lunchSpeed);
        if(this.character.nowWall)
        {
            if(this.character.nowWall.Type===WallType.Right)dir.x*=-1;
        }        
        else
        {
            dir = this.character.lunchDirect;
        }
        
        this.lunchDir = dir;
        setTimeout(()=>{this.Ignore = false;},100);
        if(this.character.body.type != cc.RigidBodyType.Animated)this.character.body.type = cc.RigidBodyType.Animated;
        
        //this.character.body.applyForceToCenter(this.lunchDir.normalize().mul(12000),true);
    }
    update(dt:number,op:OperatorStruct)
    {
        if(op.canOperator)
        this.character.body.linearVelocity = this.lunchDir.mul(this.character.lunchSpeed);
    }

    onWall(wall:Wall,op:OperatorStruct)
    {
        //此处先暂时不转移到相应状态
        if(op.canOperator)
        {
            if((<DieWall>wall).die!==undefined)
            {
                wall.Begin();
            }
            else if(!this.Ignore)
            {
                wall.Begin();
                this.character.body.linearVelocity  = cc.v2(0,0);
                if(this.character.nowState!==this.character.IdleState)this.character.changeState(this.character.IdleState);
               
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
