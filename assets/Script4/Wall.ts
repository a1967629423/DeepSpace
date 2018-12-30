import Character4 from "./Character4";
import PoolObject from "./PoolObject";
const {ccclass, property} = cc._decorator;
export enum WallType
{
    Left,Right
}
/**
 * 标准弹簧的定义
 */
@ccclass
export default class Wall extends PoolObject{
    @property({type:cc.Enum(WallType)})
    Type:WallType = WallType.Left;
    SelfCollider:number = 0;
    character:Character4 = null;
    Collider:cc.PhysicsCollider = null;
    start()
    {
        super.start();
        this.Collider = this.getComponent(cc.PhysicsCollider);
    }
    onBeginContact(contact,self:cc.Collider,other:cc.Collider)
    {
        
        if(self.tag===this.SelfCollider)
        {
            var ch4 =other.node.getComponent(Character4);
            if(ch4)
            {
                this.character = ch4;
                ch4.onWall(this);
            }
        }
    }
    Begin()
    {
        //var springDir = cc.v2(Math.cos(this.character.node.rotation+90),Math.sin(this.character.node.rotation+90)).normalize();
        //var direct = cc.v2(Math.cos(this.node.rotation*Math.PI/180),-Math.sin(this.node.rotation*Math.PI/180));
        //console.log(this.node.rotation);
        //console.log(direct);
        //this.character.body.linearVelocity = this.character.body.linearVelocity.add(direct.mul(1000));
    }
    onDestroy()
    {
        this.character = null;
    }
}
