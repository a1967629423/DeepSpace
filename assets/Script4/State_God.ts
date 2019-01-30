import CharacterState3 from "./State3";
import Wall from "./Wall";
import DieWall from "./DieWall";
import State_Super from "./State_Super";
import { OperatorStruct } from "./StateMachine/State";
//护盾
export default class State_God extends CharacterState3 {
    SuperS:State_Super;
    Start()
    {
        this.SuperS = this.context.attachState(State_Super);
        this.SuperS.continual = true;
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
                if(this.character.health<=0)
                {
                    op.canOperator = true;

                }
                else
                {
                    this.character.health--;
                }
                

            }
        }
    }
    onProp(p,op:OperatorStruct)
    {
        this.caHealth(op);
    }

}
