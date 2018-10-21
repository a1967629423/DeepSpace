import Until from "./Tools/Until";

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
export default class Character extends cc.Component implements ITouchEvent {
    onTouch(touch: cc.Event.EventTouch,sourceNode:cc.Node) {
        var vect2:cc.Vec2 = new cc.Vec2();
        var a = cc.Camera.findCamera(this.node).getCameraToWorldPoint(touch.getLocation(),vect2);
        this.node.position =   sourceNode.convertToNodeSpace(vect2);
    }
    getNode():cc.Node
    {
        return this.node;
    }

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    @property({displayName:"最大速度",range:[0,400,10],slide:false})
    maxSpeend:number = 40;
    // LIFE-CYCLE CALLBACKS:
    body:cc.RigidBody = null;
    // onLoad () {}
    onLoad()
    {
        cc.director.getPhysicsManager().enabled = true;
    }
    start () {
        cc.director.getPhysicsManager().enabled = true;
        var self:Character = this;
        this.body = this.getComponent(cc.RigidBody)
        this.node.on(cc.Node.EventType.MOUSE_DOWN,function(event:cc.Event.EventMouse){
            //var action = cc.moveTo(2,100,150);
            //self.node.runAction(action);

        })
        cc.systemEvent.on(cc.Node.EventType.MOUSE_DOWN,function(event:cc.Event.EventMouse){
        });
    }
    moveTo(t:number,x:number,y:number)
    {
        this.node.position = new cc.Vec2(x,y);
    }
    
    maskTouch(position:cc.Vec2)
    {
        this.body.applyForceToCenter(position,true);
          

        //console.log(position.signAngle(cc.v2(0,1)));
        this.node.rotation = position.signAngle(cc.v2(0,1))*180/3.14;
    }

     update (dt) {
         //限制最大速度
        this.body.linearVelocity = cc.v2(Math.max(Math.min(this.body.linearVelocity.x,this.maxSpeend) ,-this.maxSpeend),Math.max(Math.min(this.body.linearVelocity.y,this.maxSpeend),-this.maxSpeend));
     }
}
export  interface ITouchEvent{
    onTouch(touch:cc.Event.EventTouch,sourceNode:cc.Node);
    getNode():cc.Node;
}