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
export default class AnimationPlay extends cc.Component {
    @property(cc.Animation)
    tage:cc.Animation = null;
    @property
    AnimationName: string = '';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    play(event,data:string = null)
    {
        if(!data)data = this.AnimationName;
        this.tage.play(data);
    }


    // update (dt) {}
}
