import Character from "./Character";
import Enemy from "./Enemy";
import GraphicsEx from "./Tools/GraphicsEx";

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
//星球基类 继承自 敌人类
//实现近距离加分框的绘制
@ccclass
export default class Star extends Enemy  {

    @property({type:cc.Label,override:true})
    label: cc.Label = null;
    @property({displayName:"引力碰撞盒Tag"})
    trigger:Number = 0;
    @property({displayName:"重力",min:0})
    g:number = 1;
    @property({displayName:"引力半径",min:0})
    radius:number = 0;
    // LIFE-CYCLE CALLBACKS:
    tage:cc.Node = null;
     onLoad () {
         var manage = cc.director.getCollisionManager();
         manage.enabled = true;
         manage.enabledDebugDraw = true;
     }

    start () {
        //创建绘制节点，并绘制出一个圆
        var graphics = new cc.Node("graphics").addComponent(cc.Graphics);
        this.node.addChild(graphics.node);
        GraphicsEx.beginColor = cc.color(160,80,100,255);
        GraphicsEx.endColor = cc.color(255,20,40,0);
        GraphicsEx.circle(graphics,0,0,this.radius,10);
        //graphics.circle(0,0,this.radius);
        //graphics.strokeColor = cc.Color.RED;
        //graphics.stroke();
    }
    update(dt:Number)
    {
        if(this.tage)
        {
            var force = this.node.getPosition().sub(this.tage.getPosition());
            var s = force.mag();
            force = force.normalize();
            force.x/s;
            force.y/s;
            force.mulSelf(this.g);
            var body = this.tage.getComponent(cc.RigidBody);
            body.applyForceToCenter(force, true);
            
        }
    }
    onBeginContact(contact,self:cc.Collider,other:cc.Collider)
    {
        //调用父方法
        super.onBeginContact(contact,self,other);
        if(self.tag === this.trigger&&other.getComponent(Character))
        {
            this.tage = other.node;
        }
    }
    onEndContact(contact,self:cc.Collider,other:cc.Collider){
        if(self.tag === this.trigger&&other.getComponent(Character))
        {
            this.tage = null;
        }
    }

    // update (dt) {}
}
