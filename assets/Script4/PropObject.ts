import DieObject from "./DieObject";
import Character4 from "./Character4";
import AssetsName from "../Script/Tools/AssetsName";
import AssetsSystem from "../Script/System/AssestSystem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PorpObject extends cc.Component  {
    character:Character4 = null;
    SelfCollider:number = 0;
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
    destroy():boolean
    {
        var assestconf = this.getComponent(AssetsName);
        if(AssetsSystem.instance&&assestconf)
        {
            AssetsSystem.instance.putAssest(assestconf.assetsGropName,assestconf.assetsType,this.node);
            return true;
        }
        else
        {
            this.node.destroy();
            return super.destroy();
        }
    }
    onDestroy()
    {
        this.node.emit("destroy",this)
    }
}
