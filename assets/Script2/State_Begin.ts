import { CharacterState } from "./State";
//游戏开始状态
//计划：直接进入发射状态，进入一定高度的轨道
export default class State_Begin extends CharacterState {
    Start()
    {
        this.character.changeState(this.character.IdleState);
    }

}
