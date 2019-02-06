import GradeManage from "../Script/GradeManage";
import PorpObject from "./PropObject";
import State_Fly from "./State_Fly";

const { ccclass, property } = cc._decorator;
//飞行道具
@ccclass
export default class FlyProp extends PorpObject {
    @property
    Grade: number = 100;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    Begin(): boolean {
        //默认加分


        GradeManage.instance.addGrade(this.Grade);
        this.character.attachState(State_Fly);
        return super.Begin();
    }

    // update (dt) {}
}
