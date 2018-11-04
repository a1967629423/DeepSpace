import { CharacterState } from "./State";
//发射状态
export default class State_Lunch extends CharacterState {
    lunch:cc.Vec2=cc.v2(0,0);
    LunchTime:number = 0;
    timeout:number=0;
    engineState:boolean = false;
    Start()
    {
        //从上下文中获取引擎推力向量并保存
        this.lunch = this.character.dv2;
        this.LunchTime = this.character.lunchTime;
        //切换刚体状态让其能够受力
        if(this.character.body.type !== cc.RigidBodyType.Dynamic){this.character.body.type = cc.RigidBodyType.Dynamic}

        //三秒引擎完成充能
        this.timeout = setTimeout(() => {
            this.character.changeState(this.character.IdleState);
        }, 3000);
    }
    update(dt:number)
    {
        this.LunchTime = Math.max(this.LunchTime-dt,0);
        //应用推力
        if(this.LunchTime)
        {
            this.character.body.linearVelocity = cc.v2(Math.max(Math.min(this.character.body.linearVelocity.x,this.character.maxSpeed) ,-this.character.maxSpeed),Math.max(Math.min(this.character.body.linearVelocity.y,this.character.maxSpeed),-this.character.maxSpeed));
            this.character.body.applyForceToCenter(this.lunch,true);
            if(!this.engineState){this.character.changeEngineState(true);this.engineState = true;}
        }
        else
        {
            if(this.engineState){this.character.changeEngineState(false);this.engineState = false}
        }
        //进入星球引力范围切换状态
        if(this.character.nowStar&&!this.LunchTime){clearTimeout(this.timeout);this.character.changeState(this.character.InStarState)}
    }
    Quit()
    {
        this.lunch = cc.v2(0,0);
        this.LunchTime = 0;
        clearTimeout(this.timeout);
        this.timeout = 0;
        this.engineState = false;
        this.character.changeEngineState(false);
        super.Quit();
    }
    die()
    {
        super.die();
        this.character.changeEngineState(false);
    }

}
