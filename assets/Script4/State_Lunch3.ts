import CharacterState3 from "./State3";

export default class State_Lunch3  extends CharacterState3 {
    lunchDir:cc.Vec2 = cc.v2(0,0);
    Start()
    {
        console.log("change Lunch");
        this.lunchDir = this.character.lunchDirect;
        this.character.body.applyForceToCenter(this.lunchDir.normalize().mul(12000),true);
    }

}
