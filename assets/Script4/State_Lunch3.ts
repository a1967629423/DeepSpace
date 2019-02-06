import CharacterState3  from "./State3";
import Wall, { WallType } from "./Wall";
import PorpObject from "./PropObject";
import DieWall from "./DieWall";
import GlobalTime from "../Script/Tools/GlobalTime";
import { OperatorStruct } from "./StateMachine/State";

export default class State_Lunch3  extends CharacterState3 {
    lunchDir:cc.Vec2 = cc.v2(0,0);
    lineV:cc.Vec2 = cc.v2(0,0);
    relayLineV:cc.Vec2;
    Ignore:boolean;
    //false 左，true 右
    nowP:boolean = true;
    Start()
    {
        this.character.Animation.play("characterJump");
        this.Ignore = true;
        console.log("change Lunch");
        var dir = cc.v2(this.character.lunchSpeed,this.character.moveSpeed).mul(1/this.character.lunchSpeed);
        if(this.nowP)dir.x*=-1;
        this.character.node.scaleX = this.nowP?-1:1;
        // if(this.character.nowWall)
        // {
        //     if(this.character.nowWall.Type===WallType.Right)dir.x*=-1;
        // }        
        // else
        // {
        //     dir = this.character.lunchDirect;
        // }
        this.lunchDir = dir;
        setTimeout(()=>{this.Ignore = false;},100);
        if(this.character.body.type != cc.RigidBodyType.Animated)this.character.body.type = cc.RigidBodyType.Animated;
        this.lineV = this.lunchDir.mul(this.character.lunchSpeed);
        if(this.character.nowWall&&this.character.nowWall.Collider)this.character.nowWall.Collider.enabled = true;
        //GlobalTime.Instantiation.node.on("DtChange",this.calculatDt,this);

        //this.character.body.applyForceToCenter(this.lunchDir.normalize().mul(12000),true);
    }
    update(dt:number,op:OperatorStruct)
    {
        if(op.canOperator)
        {
            // if(this.nowP&&this.character.node.x<this.leftMax&&this.character.nowState!==this.character.IdleState)
            // {
            //     debugger;
            //     this.character.changeState(this.character.IdleState);
            //     this.nowP = false;
            //     this.lineV = cc.v2(this.leftMax-this.character.node.x,0);
            // }
            // if(!this.nowP&&this.character.node.x>this.rightMax&&this.character.nowState!==this.character.IdleState)
            // {
            //     debugger;
            //     this.character.changeState(this.character.IdleState);
            //     this.nowP = true;
            //     this.lineV = cc.v2(this.rightMax-this.character.node.x,0);
            // }
            if(Math.abs(this.character.node.x-200)>400)this.die();
            this.character.body.linearVelocity = this.lineV;
        }
        
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
                // if(this.character.lastWall&&this.character.lastWall.Collider)
                // {
                //     this.character.lastWall.Collider.enabled = true;
                // }
                //wall.getComponent(cc.PhysicsBoxCollider).enabled = true;
                //撞到墙壁反转方向
                this.nowP =!this.nowP;
                if(this.nowP)
                {
                    if(this.character.node.x<200)
                    {
                        this.nowP = false;
                    }
                }
                else if(this.character.node.x>200)
                {
                    this.nowP = true;
                }
                if(this.character.nowState!==this.character.IdleState)this.character.changeState(this.character.IdleState);

            }
        }
    }
    onProp(porp:PorpObject,op:OperatorStruct)
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
    Quit()
    {
        super.Quit();
    }

}
