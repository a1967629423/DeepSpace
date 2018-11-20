import GradeManage from "../Script/GradeManage";
import PorpObject from "./PropObject";

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
        this.character.health++;
        return super.Begin();
    }

    // update (dt) {}
}
