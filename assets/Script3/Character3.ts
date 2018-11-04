import Character, { ITouchEvent } from "../Script/Character";
import Star from "../Script/Star";
import { CharacterState2 } from "./State2";
import State_Round2 from "./State_Round2";
import State_Lunch2 from "./State_Lunch2";
import State_InStar2 from "./State_InStar2";
import State_Die2 from "./State_Die2";
import State_Begin2 from "./State_Begin2";
import State_Idle2 from "./State_Idle2";

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
export class Character3 extends Character implements ITouchEvent {
    @property({ displayName: "环绕轨道的半径比" })
    rratio: number = 0.8;
    @property({ displayName: "环绕速度" })
    rspeed: number = 200;
    @property(cc.ProgressBar)
    engineBar:cc.ProgressBar = null;
    @property(cc.Node)
    LunchCancle:cc.Node = null;
    /**
     * 引擎推力向量
     */
    dv2: cc.Vec2 = cc.v2(0, 0);

    lunchTime:number = 0;
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    protected _nowState:CharacterState2 = null;
    /**
     * 当前状态
     */
    public get nowState() : CharacterState2 {
        return this._nowState;
    }
    RoundState:State_Round2 = null;
    LunchState:State_Lunch2 = null;
    InStarState:State_InStar2 = null;
    DieState:State_Die2 = null;
    BeginState:State_Begin2 = null;
    IdleState:State_Idle2 = null;
    /**
     * 切换当前状态
     * @param state 要切换的状态
     */
    changeState(state:CharacterState2)
    {
        if(this.nowState){this.nowState.Quit();}
        this._nowState = state;
        this.nowState.Start();
    }
    constructor()
    {
        super();
        this.RoundState = new State_Round2(this);
        this.LunchState = new State_Lunch2(this);
        this.InStarState = new State_InStar2(this);
        this.DieState = new State_Die2(this);
        this.BeginState = new State_Begin2(this);
        this.IdleState = new State_Idle2(this);

    }
    
    
    protected _radius: number = 0;
    
    public set radius(v : number) {
        this._radius = v;
    }
    
    public get radius() : number {
        return this._radius
    }
    
    
    start() {
        super.start();
        this.node.on(cc.Node.EventType.TOUCH_START,(touch:cc.Event.EventTouch)=>{this.onTouchV2(touch.getLocation());this.onTouchLocal(touch.getLocation())});
        this.node.on(cc.Node.EventType.TOUCH_MOVE,(touch:cc.Event.EventTouch)=>{this.onTouchV2(touch.getLocation());this.onTouchLocal(touch.getLocation())});
        this.node.on(cc.Node.EventType.TOUCH_END,()=>{this.endTouch()});
        this.changeState(this.BeginState);
        //启动物理
    }
    onTouch() {

    }
    onTouchV2(v2: cc.Vec2) {
        if(this.nowState){this.nowState.onTouch(v2)};
    }
    onTouchLocal(v2:cc.Vec2)
    {
        if(this.nowState){this.nowState.onTouchLocal(v2)}
    }

    endTouch() {
        if(this.nowState){this.nowState.endTouch();} 
    }
    getNode(): cc.Node {
        return this.node;
    }
    isset:boolean = false;
    inStar(star: Star) {
        super.inStar(star);
        if(this.nowState){this.nowState.inStar(star)};

    }

    outStar(star: Star) {

        if(this.nowState){this.nowState.outStar()};
        super.outStar(star);
    }
    adjustVec(v2: cc.Vec2) {
        var nowdir = this.body.linearVelocity.normalize();
        this.body.applyForceToCenter(v2.sub(nowdir).mul(20),true);
    }
    update(dt) {
        
        if(this.nowState){this.nowState.update(dt);}

    }
    die() {
        super.die();
        if(this.nowState){this.nowState.die()}
    }
}
