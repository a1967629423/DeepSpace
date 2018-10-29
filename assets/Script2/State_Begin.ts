import { CharacterState } from "./State";
//游戏开始状态
export default class State_Begin extends CharacterState {
    Start()
    {
        this.character.changeState(this.character.IdleState);
    }

}
