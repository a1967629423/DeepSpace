import { CharacterState } from "./State";
//发射状态
export default class State_Lunch extends CharacterState {
    lunch:cc.Vec2=cc.v2(0,0);
    timeout:number=0;
    Start()
    {
        //从上下文中获取引擎推力向量并保存
        this.lunch = this.character.dv2;
        //切换刚体状态让其能够受力
        if(this.character.body.type !== cc.RigidBodyType.Dynamic){this.character.body.type = cc.RigidBodyType.Dynamic}
        //应用推力
        this.character.body.applyForceToCenter(this.lunch,true);
        //三秒引擎完成充能
        this.timeout = setTimeout(() => {
            this.character.changeState(this.character.IdleState);
        }, 3000);
    }
    update()
    {
        //进入星球引力范围切换状态
        if(this.character.nowStar){clearTimeout(this.timeout);this.character.changeState(this.character.InStarState)}
    }
    Quit()
    {
        super.Quit();
    }

}
