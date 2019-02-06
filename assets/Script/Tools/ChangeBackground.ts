import GameInit from "../GameInit";
import GlobalTime, { CoroutinesType } from "./GlobalTime";
import SceneSystem2 from "../../Script4/SceneSystem2";
import ShowBackground from "../../Script4/ShowBackground";
import AssetsSystem from "../System/AssestSystem";

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
            GameInit.instance.node.on("styleChangeComplete",()=>{
                //获得当前的组，准备切换背景
                var group = SceneSystem2.Instance.nowGroup;
                var _this = this;
                GlobalTime.Instantiation.Coroutines((function*(){
                    var time = 0;
                    var dt =0;
                    while(time<3)
                    {
                        
                        time = Math.min(time,3);
                        _this.mask.opacity = 255*time/3;
                        time+=dt;
                        dt =yield CoroutinesType.frame;
                        
                    }
                    dt =yield CoroutinesType.frame;
                    time = 0;
                    dt = 0;
                    //更换资源
                    _this.getComponentInChildren(ShowBackground).destroy();
                    _this.node.addChild(AssetsSystem.instance.getAssest(AssetsSystem.instance.nowGroup,"background"));
                    //
                    dt = yield CoroutinesType.SleepTime(1);
                    GlobalTime.Instantiation.Coroutines((function*(){
                        while(time<3)
                        {
                            time = Math.min(time,3);
                            _this.mask.opacity = 255+(-255)*time/3;
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
