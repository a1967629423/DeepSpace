import Character from "../Script/Character";
import Spring from "./Spring";
import Porp from "./prop";
import CharacterState3 from "./State3";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Character4 extends Character {
    private _nowState:CharacterState3 = null;
    
    public get nowState() : CharacterState3 {
        return this._nowState;
    }
    
    changeState(cs:CharacterState3)
    {
        if(this.nowState)this.nowState.Quit();
        cs.Start();
        this._nowState = cs;

    }
    onSpring(stype:Spring)
    {
        if(this.nowState)this.nowState.onSpring(stype);
    }
    onProp(ptype:Porp)
    {
        if(this.nowState)this.nowState.onPorp(ptype);
    }
    start()
    {
        super.start();
    }
    update(dt)
    {
        if(this.nowState)this.nowState.update(dt);
    }


}
