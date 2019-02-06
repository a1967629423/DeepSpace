import GradeManage from "../Script/GradeManage";
import PorpObject from "./PropObject";
import State_Fly from "./State_Fly";
import GameInit from "../Script/GameInit";

const { ccclass, property } = cc._decorator;
//幸运抽奖道具
@ccclass
export default class FlyProp extends PorpObject {
    @property
    Grade: number = 100;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    Begin(): boolean {
        //默认加分


        //GradeManage.instance.addGrade(this.Grade);
        //this.character.globalState.attaching(State_Fly);
        try {
            GameServer.game_getBox(GameInit.instance.GameId);
        } catch (error) {
            console.error(error);
        }
        
        GradeManage.instance.nowSpecial++;
        return super.Begin();
    }

    // update (dt) {}
}
