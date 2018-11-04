import Character4 from "./Character4";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Spring extends cc.Component {
    character:Character4 = null;
    onBeginContact(contact,self:cc.Collider,other:cc.Collider)
    {
        var ch4 =other.node.getComponent(Character4);
        if(ch4)
        {
            this.character = ch4;
            ch4.onSpring(this);
        }
    }
    Begin()
    {
        //反弹方向= (Spring方向+character速度方向)取反
    }
}
