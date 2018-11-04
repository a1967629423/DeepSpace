import GlobalTime, { CoroutinesType } from "../Script/Tools/GlobalTime";
import { CharacterState2 } from "./State2";
//游戏开始状态
//计划：直接进入发射状态，进入一定高度的轨道
export default class State_Begin2 extends CharacterState2 {
    Start()
    {
        this.character.dv2 = cc.v2(0,200);
        this.character.lunchTime = 1.1;
        this.character.changeState(this.character.LunchState);
    }

}
