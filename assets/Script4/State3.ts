import Character4 from "./Character4";
import Spring from "./Spring";
import Porp from "./prop";
export default class CharacterState3 {
    character:Character4 = null;
    constructor(ch:Character4)
    {
        this.character = ch;
    }
    Start(){}
    onSpring(stype:Spring){}
    onPorp(ptype:Porp){}
    update(dt:number){}
    onTouchV2(v2:cc.Vec2){}
    onTouchLocal(v2:cc.Vec2){}
    endTouch(){}
    Quit(){}

}
