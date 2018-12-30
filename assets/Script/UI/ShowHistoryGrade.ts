import GameInit from "../GameInit";
import DataSave from "../DataSave";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShowHistoryGrade extends cc.Component {
    @property(cc.Label)
    showLabe:cc.Label = null;
    start()
    {
        if(this.showLabe)
        {
            this.showLabe.string = DataSave.getDataFromLocal("grade")?DataSave.getDataFromLocal("grade"):"0";
        }
    }

    // update (dt) {}
}
