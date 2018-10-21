import Until from "./Tools/Until";
import GradeManage from "./GradeManage";

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
//角色类
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
    @property({displayName:"最大速度",range:[0,400,10],slide:false})
    maxSpeed:number = 40;
    @property({displayName:"引擎停止工作的最小速度",range:[0,100,1]})
    minSpeed:number = 2;
    // LIFE-CYCLE CALLBACKS:
    //角色的刚体组件
    body:cc.RigidBody = null;
    partic:cc.ParticleSystem[] = null;
    // onLoad () {}
    onLoad()
    {
        //启动物理
        cc.director.getPhysicsManager().enabled = true;
    }
    start () {
        this.body = this.getComponent(cc.RigidBody);
        this.partic = this.getComponentsInChildren(cc.ParticleSystem);

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
    particfire:boolean = false;
    update (dt) {
         //限制最大速度
        this.body.linearVelocity = cc.v2(Math.max(Math.min(this.body.linearVelocity.x,this.maxSpeed) ,-this.maxSpeed),Math.max(Math.min(this.body.linearVelocity.y,this.maxSpeed),-this.maxSpeed));
        if(this.body.linearVelocity.mag()<this.minSpeed&&!this.particfire)
        {
            this.partic.forEach((item:cc.ParticleSystem)=>{
                item.stopSystem();
            });
            this.particfire = true;
        }
        else if(this.body.linearVelocity.mag()>=this.minSpeed&&this.particfire)
        {
            this.partic.forEach((item:cc.ParticleSystem)=>{
                item.resetSystem();
            });
            this.particfire = false;
        }
    }
    //死亡接口
    die()
    {
    }
}
//定义了ITouch接口但是没用上
export  interface ITouchEvent{
    onTouch(touch:cc.Event.EventTouch,sourceNode:cc.Node);
    getNode():cc.Node;
}