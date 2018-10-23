import GradeManage from "../GradeManage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Label)
    valLabel:cc.Label;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    start () {

    }

     update (dt) {
         if(this.valLabel)
         {
            this.valLabel.string = GradeManage.instance.nowGrade.toFixed(1).toString();
         }
     }
}