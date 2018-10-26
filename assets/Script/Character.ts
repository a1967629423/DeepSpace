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
/**角色类
*引擎运行的时候会发出声音-完成
*引擎能量的实现-完成
*计算移动的距离-完成
*/
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
    @property({displayName:"角色初始能量",min:0})
    defEngine:number = 100;
    @property({displayName:"角色运行引擎每秒消耗能量",min:0})
    expend:number = 1;
    //真实的能量
    private nowEngine:number;
    //上次的位置
    private lastpointion:cc.Vec2 = cc.v2(0,0);
    //飞行的距离
    private distance:number = 0;
    /**
     * 飞行的距离
     */
    public get Distance() : number {
        return this.distance;
    }
    /**
     * 当前的能量
     */
    public get Engine() : number {
        return this.nowEngine
    }
    /**
     * 充能
     * @param val 增加的能量
     */
    addEngine(val:number)
    {
        this.nowEngine+=val;
    }
    
    // LIFE-CYCLE CALLBACKS:
    //角色的刚体组件
    body:cc.RigidBody = null;
    partic:cc.ParticleSystem[] = null;
    audio:cc.AudioSource = null;
    

    // onLoad () {}
    onLoad()
    {
        //启动物理
        cc.director.getPhysicsManager().enabled = true;
        this.nowEngine = this.defEngine;
        this.node.zIndex = 1;
    }
    start () {
        this.body = this.getComponent(cc.RigidBody);
        this.partic = this.getComponentsInChildren(cc.ParticleSystem);
        this.audio = this.getComponent(cc.AudioSource);
        //将上次位置设置为当前
        this.lastpointion =  this.node.convertToWorldSpace(this.node.position);
    }
    moveTo(t:number,x:number,y:number)
    {
        this.node.position = new cc.Vec2(x,y);
    }
    particfire:boolean = false;
    maskTouch(position:cc.Vec2)
    {
        this.body.applyForceToCenter(position,true);
        //console.log(position.signAngle(cc.v2(0,1)));
        this.node.rotation = position.signAngle(cc.v2(0,1))*180/3.14;
        if(!this.particfire)
        {
            this.partic.forEach((item:cc.ParticleSystem)=>{
                item.resetSystem();
            });
            this.audio.play();
            this.particfire = true;
        }
    }
    maskEndTouch()
    {
        if(this.particfire)
        {
            this.partic.forEach((item:cc.ParticleSystem)=>{
                item.stopSystem();
            });
            this.audio.stop();
            this.particfire = false;
        }

    }
    
    update (dt) {
        //限制最大速度
        this.body.linearVelocity = cc.v2(Math.max(Math.min(this.body.linearVelocity.x,this.maxSpeed) ,-this.maxSpeed),Math.max(Math.min(this.body.linearVelocity.y,this.maxSpeed),-this.maxSpeed));
        //计算能量消耗
        if(this.particfire)
        {
            //如果引擎运行就每秒消耗能量
            this.nowEngine = Math.max(this.nowEngine-this.expend*dt,0);
        }
        if(!this.nowEngine)
        {
            this.die();
        }
        //计算距离
        this.distance += Math.abs(this.node.convertToWorldSpace(this.node.position).sub(this.lastpointion).mag());
        this.lastpointion =  this.node.convertToWorldSpace(this.node.position);

        
    }
    /**
     * 死亡
     */
    die()
    {
        console.log("死亡");
    }
}
//定义了ITouch接口但是没用上
/**
 * Touch接口
 */
export  interface ITouchEvent{
    onTouch(touch:cc.Event.EventTouch,sourceNode:cc.Node);
    getNode():cc.Node;
}