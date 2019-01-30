import CharacterState3 from "./State3";
import SceneSystem2 from "./SceneSystem2";
import State_Super from "./State_Super";
import GlobalTime, { CoroutinesType } from "../Script/Tools/GlobalTime";
import { OperatorStruct } from "./StateMachine/State";
import AssetsSystem from "../Script/System/AssestSystem";
import FlyFire from "./FlyFire";
import NodeSync from "../Script/Tools/NodeSync";

export default class State_Fly extends CharacterState3 {
    centerX:number = 0;
    time:number = 2000;
    isFly:boolean = true;
    nowSpeed:number = 0;
    relaySpeed:number;
    static fireNode:cc.Node = null;
    Start()
    {
        this.centerX = (SceneSystem2.Instance.rX-SceneSystem2.Instance.lX)/2;
        this.character.attachState(State_Super).time = this.time+1000;
        this.character.Animation.play("characterFly");
        var _this = this;
        //为了完成暂停函数，定时器改成协程
        GlobalTime.Instantiation.Coroutines((function*(){
            //yield;
            yield CoroutinesType.SleepTime((_this.time/1000));
            if(_this.character.nowState!==_this.character.LunchState)_this.character.changeState(_this.character.LunchState);
            _this.Quit();
        })());
        if(!State_Fly.fireNode)
        {
            State_Fly.fireNode = AssetsSystem.instance.getAssest("Normal","flyFire");
            cc.Camera.main.node.addChild(State_Fly.fireNode);
            State_Fly.fireNode.getComponent(NodeSync).tageNode = this.character.node;
        }
        this.nowSpeed = this.character.moveSpeed+this.character.flySpeed;
        this.relaySpeed = this.nowSpeed*GlobalTime.DefaultDt;
        //GlobalTime.Instantiation.node.on("DtChange",this.calculatSpeed,this);
        // setTimeout(()=>{
        //     this.isFly = false;
        //     if(this.character.nowState!==this.character.LunchState)this.character.changeState(this.character.LunchState);
        //     this.Quit();
        // },this.time)
    }
    calculatSpeed(dt)
    {
        this.relaySpeed = this.nowSpeed*dt;
    }
    update(dt,op:OperatorStruct)
    {
        if(op.canOperator)
        {
            if(this.isFly)
            {
                op.canOperator = false;
                op.operatorInformation.fly = this;
                var xdir = 0;
                if(this.character.node.x!=this.centerX)xdir=(-this.character.node.x+this.centerX);
                this.character.body.linearVelocity = cc.v2(xdir,this.nowSpeed);
            }
        }

    }
    Quit()
    {
        super.Quit();
        if(!this.character.getAttach(State_Fly))
        {
            (function(fireNode)
            {
                var system = fireNode.children[0].getComponent(cc.ParticleSystem);
                //system.positionType = cc.ParticleSystem.PositionType.FREE;
                system.stopSystem();
                setTimeout(()=>{
                    fireNode.getComponent(FlyFire).destroy();
                    //system.positionType = cc.ParticleSystem.PositionType.RELATIVE;
                },1000)
            })(State_Fly.fireNode);
            State_Fly.fireNode.getComponent(NodeSync).tageNode = null;
            State_Fly.fireNode = null;
        }
        //GlobalTime.Instantiation.node.off("DtChange",this.calculatSpeed);
    }
}
