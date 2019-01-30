import Wall from "./Wall";
import AssetsSystem from "../Script/System/AssestSystem";
const {ccclass, property} = cc._decorator;

@ccclass
export default class DieWall extends Wall {

    // onLoad () {}

    // update (dt) {}
    die:boolean = true;
    fix:boolean = true;
    Begin()
    {
        super.Begin();
        this.character.die();
    }
    onBeginContact(contact,self:cc.Collider,other:cc.Collider)
    {
        if(this.fix)
        {
            super.onBeginContact(contact,self,other);
        }
    }
    applyEffect()
    {
        var particle = AssetsSystem.instance.getAssest("Normal","dieWallParticle");
        cc.director.getScene().addChild(particle);
        var po = this.node.parent.convertToWorldSpaceAR(this.node.position);
        po.x-= this.node.width*this.node.scaleX/2;
        particle.setPosition(po);
    }
    unuse()
    {

    }
    reuse()
    {
        this.fix = false;
        setTimeout(()=>{
            this.fix = true;
        },300)
        
    }
}
