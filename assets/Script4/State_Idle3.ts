import CharacterState3 from "./State3";
import Until from "../Script/Tools/Until";

export default class State_Idle3 extends CharacterState3 {

    Start()
    {
        console.log("change Idle")

    }
    onTouchV2(v2:cc.Vec2)
    {
        if(this.character.nowState!==this.character.DragState&&Until.isTouch(this.character.node))
        {
            this.character.firstTouchPosition = v2;
            this.character.changeState(this.character.DragState);
        }
    }

}
