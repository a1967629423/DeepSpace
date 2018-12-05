import CharacterState3, { OperatorStruct } from "./State3";
import Wall from "./Wall";
import DieWall from "./DieWall";
//护盾
export default class State_God extends CharacterState3 {
    onWall(wall:Wall,op:OperatorStruct)
    {
        if(op.canOperator)
        {
            if((<DieWall>wall).die)
            {
                if(this.character.health>0)
                {
                    op.canOperator = false;
                    op.operatorInformation.God = true;
                    wall.node.destroy();
                    wall.destroy();
                    this.character.health-=1;
                }
            }
        }
    }

}
