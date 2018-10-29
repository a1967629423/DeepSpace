import Character, { ITouchEvent } from "../Script/Character";
import Star from "../Script/Star";
import { CharacterState } from "./State";
import State_Round from "./State_Round";
import State_Lunch from "./State_Lunch";
import State_InStar from "./State_InStar";
import State_Die from "./State_Die";
import State_Begin from "./State_Begin";
import State_Idle from "./State_Idle";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html



const { ccclass, property } = cc._decorator;
@ccclass
export class Character2 extends Character implements ITouchEvent {
    @property({ displayName: "环绕轨道的半径比" })
    rratio: number = 0.8;
    @property({ displayName: "环绕速度" })
    rspeed: number = 200;
    dv2: cc.Vec2 = cc.v2(0, 0);
    nowStar:Star = null;
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    private _nowState:CharacterState = null;
    public get nowState() : CharacterState {
        return this._nowState;
    }
    RoundState:State_Round = null;
    LunchState:State_Lunch = null;
    InStarState:State_InStar = null;
    DieState:State_Die = null;
    BeginState:State_Begin = null;
    IdleState:State_Idle = null;
    changeState(state:CharacterState)
    {
        if(this.nowState){this.nowState.Quit();}
        this._nowState = state;
        this.nowState.Start();
    }
    constructor()
    {
        super();
        this.RoundState = new State_Round(this);
        this.LunchState = new State_Lunch(this);
        this.InStarState = new State_InStar(this);
        this.DieState = new State_Die(this);
        this.BeginState = new State_Begin(this);
        this.IdleState = new State_Idle(this);

    }
    
    protected _radius: number = 0;
    
    public set radius(v : number) {
        this._radius = v;
    }
    
    public get radius() : number {
        return this._radius
    }
    
    
    protected surroundRadius: number = 0;
    protected starPosition: cc.Vec2 = cc.v2(0, 0);
    protected inVec2: cc.Vec2 = cc.v2(0, 0);
    protected RotatoTo:number = 0;
    protected RotatoTime:number = 0;
    //环绕模式
    round: boolean = false;
    //设置旋转模式
    setRotate:boolean = false;
    //发射模式
    lunch:boolean = false;
    start() {
        super.start();
        this.changeState(this.BeginState);
        //启动物理
    }
    onTouch() {

    }
    onTouchV2(v2: cc.Vec2) {
        // this.setRotate = true;
        // var fv2 = v2.mul(-1);
        // var ro =  fv2.signAngle(cc.v2(0,1))*180/3.14;
        // this.node.rotation = ro;
        // this.dv2 = v2;
        if(this.nowState){this.nowState.onTouch(v2)};
    }

    endTouch() {
        // this.setRotate = false;
        // if (this.body) {
        //     if(this.body.type !== cc.RigidBodyType.Dynamic){this.body.type = cc.RigidBodyType.Dynamic;}
        //     this.lunch = true;
        //     this.body.applyForceToCenter(this.dv2.mulSelf(-1).mul(60),true);
        // }
        if(this.nowState){this.nowState.endTouch();} 
    }
    getNode(): cc.Node {
        return this.node;
    }
    isset:boolean = false;
    inStar(star: Star) {
        this.nowStar = star;
        // this.lunch = false;
        // if(!this.isset)
        // {
        //     this.isset = true;
        //     this.inVec2 = this.body.linearVelocity;
        //     this.radius = star.radius;
        //     //this.surroundRadius = this.radius * this.rratio;
        //     this.starPosition = star.node.getPosition();
        //     //三秒后若没死且还在圈内就进入环绕模式
        //     setTimeout(() => {
        //         if (this.radius&&!this.isDie) {
        //             //改变方向到合适的位置
        //             var po = this.node.getPosition();
        //             var lp = this.starPosition.sub(po);
        //             var r = lp.signAngle(cc.v2(0, 1))* 180 / 3.14 + 90;
        //             this.setRotate = true;
        //             this.RotatoTo = r;
        //             //this.node.runAction(cc.rotateTo(1,r));
        //             setTimeout(()=>{
        //                 //this.node.stopAllActions();
        //                 var po = this.node.getPosition();
        //                 var lp = this.starPosition.sub(po);
        //                 this.setRotate = false;
        //                 this.RotatoTime = 0;
        //                 this.surroundRadius = lp.mag();
        //                 this.round = true;
        //                 this.isset = false;
        //                 //不应该用延迟
        //             },1000)
                    
        //         }
        //     }, 2000);
        // }
        if(this.nowState){this.nowState.inStar(star)};

    }

    outStar(star: Star) {
        // this.radius = 0;
        // this.round = false;
        // this.lunch = false;
        if(this.nowState){this.nowState.outStar()};
        this.nowStar = null;
        //this.body.type == cc.RigidBodyType.Dynamic;
    }
    adjustVec(v2: cc.Vec2) {
        var nowdir = this.body.linearVelocity.normalize();
        this.body.applyForceToCenter(v2.sub(nowdir).mul(20),true);
    }
    update(dt) {
        if(this.nowState){this.nowState.update(dt);}
        // if(this.body)
        // {
        //     this.node.rotation = this.body.linearVelocity.signAngle(cc.v2(0,1))*180/3.14;
        // }
        // if (!this.isDie&&!this.setRotate&&!this.round) {
        //     if(this.body.linearVelocity.mag()>1)
        //     {
        //         this.node.rotation = this.body.linearVelocity.signAngle(cc.v2(0, 1)) * 180 / 3.14;
        //     }
            
        // }
        // if(this.setRotate)
        // {
            
        //     this.node.rotation +=  (this.RotatoTo-this.node.rotation)*this.RotatoTime*dt;
        //     this.RotatoTime+=0.1;
        //     if(this.RotatoTo - this.node.rotation <1)
        //     {
        //         this.RotatoTime = 0;
        //         this.setRotate = false;
        //     }
        // }

        // if (this.radius&&!this.isDie) {
        //     if (!this.round) {
        //         //this.adjustVec(cc.v2(Math.cos(r),-Math.sin(r)).normalizeSelf());
        //         this.adjustVec(this.body.linearVelocity.neg().normalize());
        //         //     if(s>this.surroundRadius+10)
        //         //     {
        //         //         var sp = this.inVec2.clone();
        //         //         if(sp.mag()>0)
        //         //         {
        //         //             sp.x  -=sp.x*(0.6*dt);
        //         //             sp.y  -=sp.y*(0.6*dt);
        //         //         }
        //         //         this.body.linearVelocity = sp;
        //         //         this.inVec2 = sp;
        //         //         this.node.rotation = this.body.linearVelocity.signAngle(cc.v2(0,1))*180/3.14;
        //         //     }
        //         //     else
        //         //     {
        //         //         var r =lp.signAngle(cc.v2(0,1));
        //         //         this.node.rotation = r*180/3.14+90;
        //         //         //this.node.position = cc.v2(Math.cos(r)+lp.mag(),-Math.sin(r)+lp.mag());
        //         //         this.body.linearVelocity = cc.v2(Math.cos(r),-Math.sin(r)).normalizeSelf().mulSelf(this.rspeed).addSelf(this.inVec2);
        //         //         if(s>this.surroundRadius)
        //         //         {
        //         //             this.body.linearVelocity = this.body.linearVelocity.rotate(3.14/5*(s-this.surroundRadius));
        //         //         }
        //         //     }

        //         // }
        //         // else
        //         // {
        //         //     this.node.rotation = this.body.linearVelocity.signAngle(cc.v2(0,1))*180/3.14;
        //         // }
        //         // if(this.round)
        //         // {
        //         //     this.inVec2.x -= this.inVec2.x*(0.2*dt);
        //         //     this.inVec2.y -= this.inVec2.y*(0.2*dt);
        //         //     this.body.linearVelocity = this.inVec2;
        //         // }
        //         // if(s<this.surroundRadius)
        //         // {
        //         //     // var r =lp.signAngle(cc.v2(0,1));
        //         //     // this.node.rotation = r*180/3.14+90;
        //         //     // //this.node.position = cc.v2(Math.cos(r)+lp.mag(),-Math.sin(r)+lp.mag());
        //         //     // this.body.linearVelocity = cc.v2(-Math.sin(r),-Math.cos(r)).normalizeSelf().addSelf(this.inVec2).mulSelf(this.rspeed);
        //         //     // this.inVec2.mulSelf(0.1);
        //         //     this.round = true;
        //         // }


        //         //     var r =lp.signAngle(cc.v2(0,1));
        //         //     //this.node.rotation = r*180/3.14+90;
        //         //     //this.node.position = cc.v2(Math.cos(r)+lp.mag(),-Math.sin(r)+lp.mag());
        //         //     //this.inVec2.mulSelf(0.1);
        //         //     //this.inVec2.mulSelf(0.8);
        //         //     this.inVec2.x -= this.inVec2.x*(0.2*dt);
        //         //     this.inVec2.y -= this.inVec2.y*(0.2*dt);
        //         //     console.log(this.inVec2.mag())
        //         //     this.body.linearVelocity = cc.v2(Math.cos(r),-Math.sin(r)).normalizeSelf().mulSelf(this.inVec2.mag()>100?20:this.rspeed).addSelf(this.inVec2);



        //         // if(s>this.surroundRadius)
        //         // {
        //         //     this.body.linearVelocity = this.body.linearVelocity.rotate(3.14/5*(s-this.surroundRadius));
        //         // }
        //     }
        //     else if(!this.lunch) {
        //         //修改刚体类型会将刚体从物体组中移除再重新加入 所以会先触发一次退出再触发一次进入，所以先将上次的信息保存下来重设后再还原
        //         if (this.body.type !== cc.RigidBodyType.Kinematic) { var radiu = this.radius; this.body.type = cc.RigidBodyType.Kinematic; this.radius = radiu; if(!this.round){this.round = true}}
                
        //         var po = this.node.getPosition();
        //         var lp = this.starPosition.sub(po);
        //         var r = lp.signAngle(cc.v2(0, 1));
        //         var s = lp.mag();
        //         if(!this.setRotate){this.node.rotation = r * 180 / 3.14 + 90; }
                
        //         this.body.linearVelocity = cc.v2(Math.cos(r), -Math.sin(r)).normalizeSelf().mulSelf(this.rspeed);
        //         if (s > this.surroundRadius) {
        //             this.body.linearVelocity = this.body.linearVelocity.rotate(3.14 / 5 * (s - this.surroundRadius));
        //         }
        //     }

        // }

    }
    die() {
        super.die();
        if(this.nowState){this.nowState.die()}
        //this.body.type = cc.RigidBodyType.Static;
    }
}
