import GameInit from "../GameInit";
import GlobalTime, { CoroutinesType } from "./GlobalTime";

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
export default class ChangeBackground extends cc.Component {

    @property(cc.Node)
    mask:cc.Node = null;

    start () {
        if(this.mask)
        {
            GameInit.instance.node.on("changeBackground",()=>{
                var _this = this;
                GlobalTime.Instantiation.Coroutines((function*(){
                    var time = 0;
                    var dt =0;
                    while(time<1)
                    {
                        
                        time = Math.min(time,1);
                        _this.mask.opacity = 255*time;
                        time+=dt;
                        dt =yield CoroutinesType.frame;
                        
                    }
                    dt =yield CoroutinesType.frame;
                    time = 0;
                    dt = 0;
                    //更换资源
                    //
                    GlobalTime.Instantiation.Coroutines((function*(){
                        while(time<1)
                        {
                            time = Math.min(time,1);
                            _this.mask.opacity = 255+(-255)*time;
                            time+=dt;
                            dt =yield CoroutinesType.frame;
                        }
                    })())

                })())
            });
        }
    }

    // update (dt) {}
}
