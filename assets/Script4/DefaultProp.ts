import GradeManage from "../Script/GradeManage";
import PorpObject from "./PropObject";
import State_Fly from "./State_Fly";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DefaultProp extends PorpObject {
    @property
    Grade: number = 100;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    Begin(): boolean {
        //默认加分


        GradeManage.instance.addGrade(this.Grade);
        //this.character.health++;
        this.character.globalState.attaching(State_Fly);
        return super.Begin();
    }

    // update (dt) {}
}
