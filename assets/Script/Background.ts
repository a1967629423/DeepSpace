import Character, { ITouchEvent } from "./Character";

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
export default class BackGround extends cc.Component {
    
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    @property(Character)
    tager:ITouchEvent = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var _self:BackGround = this;
        this.node.on(cc.Node.EventType.TOUCH_START,function(touch:cc.Event.EventTouch){
            _self.touchFun(touch);
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(touch:cc.Event.EventTouch){
            _self.touchFun(touch);
        });
    }
    touchFun(touch:cc.Event.EventTouch)
    {
        if(touch&&this.tager != null)
        {
            if(this.tager.getNode().getParent()!= this.node)
            {
                this.tager.getNode().setParent(this.node);
                this.node.setSiblingIndex(999);
                
            }
            let tageposition = this.node.convertToNodeSpace(touch.getLocation());
            this.tager.onTouch(touch,this.node);
        }
    }

    // update (dt) {}
}
