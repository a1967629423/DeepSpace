import CharacterState3 from "./State3";
import Spring from "./Spring";
import Porp from "./prop";

export default class State_Lunch3  extends CharacterState3 {
    lunchDir:cc.Vec2 = cc.v2(0,0);
    Start()
    {
        console.log("change Lunch");
        this.lunchDir = this.character.lunchDirect;
        this.character.body.applyForceToCenter(this.lunchDir.normalize().mul(12000),true);
    }
    onSpring(spring:Spring)
    {
        //此处先暂时不转移到相应状态
        spring.Begin();
    }
    onPorp(porp:Porp)
    {
        //此处先暂时不转移到相应状态
        if(!porp.Begin())
        {
            this.character.changeState(this.character.IdleState);
        }
    }

}
