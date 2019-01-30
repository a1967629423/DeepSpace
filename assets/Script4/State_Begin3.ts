import CharacterState3 from "./State3";
import GameInit from "../Script/GameInit";

export default class State_Begin3 extends CharacterState3 {

    Start() {
        this.character.Animation.play("characterBegin");
        setTimeout(async () => {
            await GameInit.instance.gameStart();
            this.character.lunchDirect = cc.v2(-1, 0.2).normalize();
            this.character.changeState(this.character.LunchState);
        }, 600);
    }

}
