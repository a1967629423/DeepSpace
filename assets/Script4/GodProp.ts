import GradeManage from "../Script/GradeManage";
import PorpObject from "./PropObject";
import State_Fly from "./State_Fly";

const { ccclass, property } = cc._decorator;

@ccclass
//护盾道具
export default class GodtProp extends PorpObject {
    @property
    Grade: number = 100;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    Begin(): boolean {
        //默认加分
        //GradeManage.instance.addGrade(this.Grade);
        this.character.health++;
        return super.Begin();
    }

    // update (dt) {}
}
