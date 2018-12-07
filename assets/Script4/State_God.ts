import CharacterState3, { OperatorStruct } from "./State3";
import Wall from "./Wall";
import DieWall from "./DieWall";
import State_Super from "./State_Super";
//护盾
export default class State_God extends CharacterState3 {
    SuperS:State_Super;
    Start()
    {
        this.character.node.on("healthChange",(val)=>{
            if(!this.SuperS&&val>0)
            {
                this.SuperS = this.character.globalState.attaching(State_Super);
                this.SuperS.continual = true;
            }
        })
    }
    onWall(wall:Wall,op:OperatorStruct)
    {
        this.caHealth(op);
    }
    caHealth(op:OperatorStruct)
    {
        if(!op.canOperator&&op.operatorInformation.super!==undefined)
        {
            if(op.operatorInformation.super===this.SuperS)
            {
                this.character.health--;
                if(this.character.health<=0)
                {
                    this.SuperS.Quit();
                    this.SuperS = null;
                }
            }
        }
    }
    onPorp(p,op:OperatorStruct)
    {
        this.caHealth(op);
    }

}
