import GradeManage from "../GradeManage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class grade extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Label)
    valLabel:cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    start () {

    }

     update (dt) {
         if(this.valLabel)
         {
            this.valLabel.string = GradeManage.instance.nowGrade.toFixed(0).toString();
         }
     }
}
