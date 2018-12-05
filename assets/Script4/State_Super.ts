import CharacterState3, { OperatorStruct } from "./State3";
import Wall from "./Wall";
import DieWall from "./DieWall";

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
    Start()
    {
        setTimeout(()=>{
            this.Quit();
        },this.time)
    }
    onWall(wall:Wall,op:OperatorStruct)
    {
        if(op.canOperator)
        {
            if((<DieWall>wall).die!==undefined)
            {
                op.canOperator =false;
                op.operatorInformation.super = true;
                wall.node.destroy();
                wall.destroy();
            }
        }

    }
}
