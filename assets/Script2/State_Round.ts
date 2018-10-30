import { CharacterState } from "./State";
//环绕状态
export default class State_Round extends CharacterState {
    radius:number = 0;
    starPosition:cc.Vec2 = cc.v2(0,0);
    Start()
    {
        var po:cc.Vec2 = this.character.node.getPosition()
        if(this.character.nowStar)
        {
            this.starPosition = this.character.nowStar.node.getPosition();
        }
        this.radius = po.sub(this.starPosition).mag();
        //切换状态使其不受到力的影响（此时会引起outStar与inStar）
        if (this.character.body.type !== cc.RigidBodyType.Kinematic) {this.character.body.type = cc.RigidBodyType.Kinematic;}
        //使Idle附着
        this.attaching(this.character.IdleState);
        
    }
    update(dt:number)
    {
        //计算环绕所需要的一些参数
        var po = this.character.node.getPosition();
        var lp = this.starPosition.sub(po);
        var r = lp.signAngle(cc.v2(0, 1));
        var s = lp.mag();
        if(!this.character.IdleState.isLunch){this.character.node.rotation = r * 180 / 3.14 + 90;}
        this.character.body.linearVelocity = cc.v2(Math.cos(r), -Math.sin(r)).normalizeSelf().mulSelf(200);
        //修正轨道
        if (s > this.radius) {
            this.character.body.linearVelocity = this.character.body.linearVelocity.rotate(3.14 / 5 * (s - this.radius));
        }
    }
    Quit()
    {
        super.Quit()
    }
}
