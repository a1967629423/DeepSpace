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
export default class NodeSync extends cc.Component {
    @property(cc.Node)
    tageNode:cc.Node = null;
    @property
    Synclocation:boolean = true;
    @property
    SyncSize:boolean = false;
    @property
    workInStart:boolean = false;
    start()
    {
        // var _this = this;
        
        // GlobalTime.Instantiation.Coroutines((function*(){
        //     while(_this.tageNode)
        //     {
        //         _this.node.position =  _this.node.getParent().convertToNodeSpaceAR(_this.tageNode.getParent().convertToWorldSpaceAR(_this.tageNode.position));
        //         yield CoroutinesType.frame;
        //     }
        // })())
        if(this.workInStart)
        {
            if(this.Synclocation)
            {
               this.node.position =  this.node.getParent().convertToNodeSpaceAR(this.tageNode.getParent().convertToWorldSpaceAR(this.tageNode.position));
            }
            if(this.SyncSize)
            {
                this.node.setContentSize(this.tageNode.getContentSize());
            }
        }
    }
     update (dt) {
         if(this.tageNode&&!this.workInStart)
         {
             if(this.Synclocation)
             {
                this.node.position =  this.node.getParent().convertToNodeSpaceAR(this.tageNode.getParent().convertToWorldSpaceAR(this.tageNode.position));
             }
             if(this.SyncSize)
             {
                 this.node.setContentSize(this.tageNode.getContentSize());
             }
            
         }
     }
}
