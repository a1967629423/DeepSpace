import Character4 from "../../Script4/Character4";
import GlobalTime from "../Tools/GlobalTime";

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
export default class Pause extends cc.Component {
    @property(Character4)
    ch4:Character4 = null;
    nowState:boolean = true;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    Run()
    {
        if(!this.ch4)
        {
            if(this.nowState)
            cc.director.pause();
            else
            cc.director.resume();
            this.nowState = !this.nowState;
        }
        else
        {
            if(this.nowState)
            {
                this.ch4.pause();
                GlobalTime.Instantiation.pause();
            }
            else
            {
                this.ch4.resume();
                GlobalTime.Instantiation.resume();
            }
            this.nowState = !this.nowState;
        }
    }

    // update (dt) {}
}
