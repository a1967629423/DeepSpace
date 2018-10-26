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
//实现背景图变化接口
//实现无限大功能
@ccclass
export default class BackGround2 extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property({visible:false})
    ground:BackGround2[] =  Array<BackGround2>(9);
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    backgroundChange()
    {
        
    }

    // update (dt) {}
}
