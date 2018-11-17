import Porp from "./prop";
import GradeManage from "../Script/GradeManage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DefaultProp extends Porp {
    @property
    Grade:number = 100;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    Begin():boolean
    {
        //默认加分
        GradeManage.instance.addGrade(this.Grade);
        this.node.destroy()
        return true;
    }

    // update (dt) {}
}
