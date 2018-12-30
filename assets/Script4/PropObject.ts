import Character4 from "./Character4";
import PoolObject from "./PoolObject";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PorpObject extends PoolObject {
    character:Character4 = null;
    SelfCollider:number = 0;
    start()
    {
        super.start();
    }
    onBeginContact(contact,self:cc.Collider,other:cc.Collider)
    {
        if(self.tag===this.SelfCollider)
        {
            var ch4 =other.node.getComponent(Character4);
            if(ch4)
            {
                console.log("prop")
                this.character = ch4;
                ch4.onProp(this);
            }
        }
    }

    Begin():boolean
    {
        this.destroy();
        return true;
    }
    onDestroy()
    {
        this.node.emit("destroy",this)
    }
}
