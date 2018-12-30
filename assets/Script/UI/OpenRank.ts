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
export default class OpenRank extends cc.Component {
    @property(cc.Prefab)
    RankPrefab:cc.Prefab = null;
    @property(cc.Node)
    tagerNode:cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    open()
    {
        if(this.RankPrefab&&this.tagerNode)
        {
            this.tagerNode.addChild(cc.instantiate(this.RankPrefab));
        }
    }

    // update (dt) {}
}
