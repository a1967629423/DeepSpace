import GameInit from "../GameInit";

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
export default class ScenesChange extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property
    tagerScenes = "gamePlaying";
    @property
    changeTime:number = 1.0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    change(event,scenesname:string=null)
    {
        if(!scenesname)
        {
            scenesname = this.tagerScenes;
        }
        cc.director.getScene().runAction(cc.fadeOut(this.changeTime));
        setTimeout(()=>{
            //TODO:用GameInit取代change操作
            GameInit.instance.gameSceneChange();
            cc.director.loadScene(scenesname,()=>{
                cc.director.getScene().runAction(cc.fadeIn(1.0));
            })
        },this.changeTime*1000);
    }

    // update (dt) {}
}
