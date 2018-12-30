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
export default class CanvasOnReSize extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    mainPosition:cc.Vec2;
    start () {
        GameInit.instance.node.on("resize",this.resize,this);
        this.resize();
        this.mainPosition = cc.Camera.main.node.position.clone();
    }
    resize()
    {
        this.node.children.forEach((value:cc.Node)=>{
            value.active = false;
        });
        this.node.position  = cc.Canvas.instance.node.position;
        this.node.children.forEach((value:cc.Node)=>{
            value.active = true;
        });
        if(this.mainPosition)cc.Camera.main.node.x = this.mainPosition.x;
    }
    onDestroy()
    {
        GameInit.instance.node.off("resize",this.resize,this);
    }

    // update (dt) {}
}
