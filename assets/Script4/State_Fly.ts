import CharacterState3, { OperatorStruct } from "./State3";
import GlobalTime, { CoroutinesType } from "../Script/Tools/GlobalTime";
import SceneSystem2 from "./SceneSystem2";
import ShaderUtil from "../Script/Tools/ShaderUntil";
import Wall from "./Wall";
import DieWall from "./DieWall";
import State_Super from "./State_Super";

export default class State_Fly extends CharacterState3 {
    centerX:number = 0;
    time:number = 2000;
    isFly:boolean = true;
    Start()
    {
        this.centerX = (SceneSystem2.Instance.rX-SceneSystem2.Instance.lX)/2;
        this.character.globalState.attaching(State_Super).time = this.time+1000;
        setTimeout(()=>{
            this.isFly = false;
            if(this.character.nowState!==this.character.LunchState)this.character.changeState(this.character.LunchState);
            this.Quit();
        },this.time)
    }
    update(dt,op:OperatorStruct)
    {
        if(op.canOperator)
        {
            if(this.isFly)
            {
                op.canOperator = false;
                op.operatorInformation.fly = true;
                var xdir = 0;
                if(this.character.node.x!=this.centerX)xdir=(-this.character.node.x+this.centerX);
                this.character.body.linearVelocity = cc.v2(xdir,this.character.moveSpeed+200);
            }
        }

    }
}
