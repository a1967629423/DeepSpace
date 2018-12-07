import CharacterState3, { OperatorStruct } from "./State3";
import Wall from "./Wall";
import DieWall from "./DieWall";
import GlobalTime, { CoroutinesType } from "../Script/Tools/GlobalTime";
import PorpObject from "./PropObject";
import DieProp from "./DieProp ";

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
export default class State_Super extends CharacterState3 {
    time:number = 1000;
    continual:boolean = false;
    Start()
    {
        // setTimeout(()=>{
        //     this.Quit();
        // },this.time)
        if(!this.continual)
        {
            var _this = this;
            GlobalTime.Instantiation.Coroutines((function*(){
                yield CoroutinesType.SleepTime(_this.time/1000);
                _this.Quit();
            })())
        }
    }
    onWall(wall:Wall,op:OperatorStruct)
    {
        if(op.canOperator)
        {
            if((<DieWall>wall).die!==undefined)
            {
                op.canOperator =false;
                op.operatorInformation.super = this;
                wall.destroy();
            }
        }
    }
    onPorp(tprop:PorpObject,op:OperatorStruct)
    {
        if(op.canOperator)
        {
            if((<DieProp>tprop).die!==undefined)
            {
                op.canOperator = false;
                op.operatorInformation.super = this;
                tprop.destroy();
            }
        }
    }
}
