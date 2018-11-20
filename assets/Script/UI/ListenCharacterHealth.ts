import Character4 from "../../Script4/Character4";

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
export default class ListenCharacterHealth extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    @property(Character4)
    ch4:Character4 = null;
    @property(cc.ProgressBar)
    bar:cc.ProgressBar = null;
    start () {
        if(this.ch4&&this.bar)
        {
            this.ch4.node.on("healthChange",(health:number)=>{
                this.bar.progress = health/this.ch4.healthMax;
            })
        }
    }

    // update (dt) {}
}
