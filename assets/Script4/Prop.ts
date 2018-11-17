
import Character4 from "./Character4";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Porp extends cc.Component {
    character:Character4 = null;
    onBeginContact(contact,self:cc.Collider,other:cc.Collider)
    {
        var ch4 = other.node.getComponent(Character4);
        if(ch4)
        {
            this.character = ch4;
            ch4.onProp(this);
        }
        

    }
    Begin():boolean
    {
        return true;
    }
    onDestroy()
    {
        this.node.emit("destroy",this);
    }
}
