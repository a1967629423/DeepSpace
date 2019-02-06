import GradeManage from "../Script/GradeManage";
import PorpObject from "./PropObject";
import State_Fly from "./State_Fly";

const { ccclass, property } = cc._decorator;
//死亡道具
@ccclass
export default class DieProp extends PorpObject {
    @property
    Grade: number = 100;
    die:boolean = true;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    Begin(): boolean {
        this.character.die();
        return super.Begin();
    }

    // update (dt) {}
}
