import CharacterState3 from "./State3";
import State_God from "./State_God";

export default class State_Global extends CharacterState3 {
    Start()
    {
        this.attaching(State_God);
    }
}
