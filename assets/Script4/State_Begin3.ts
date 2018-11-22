import CharacterState3 from "./State3";
import Until from "../Script/Tools/Until";
import Wall from "./Wall";

export default class State_Begin3 extends CharacterState3 {

    Start()
    {
        setTimeout(()=>{
            this.character.lunchDirect = cc.v2(-1,0.2).normalize();
            this.character.changeState(this.character.LunchState);
        },600)
    }

}
