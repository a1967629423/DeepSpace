import { CharacterState } from "./State";
//环绕状态
export default class State_Round extends CharacterState {
    radius:number = 0;
    starPosition:cc.Vec2 = cc.v2(0,0);
    lunch:cc.Vec2 = cc.v2(0,0);
    lunchs:boolean = false;
    Start()
    {
        //super.Start();
        var po:cc.Vec2 = this.character.node.getPosition()
        this.starPosition = this.character.nowStar.node.getPosition();
        this.radius = po.sub(this.starPosition).mag();
        if (this.character.body.type !== cc.RigidBodyType.Kinematic) {this.character.body.type = cc.RigidBodyType.Kinematic;}
        
    }
    update(dt:number)
    {
        var po = this.character.node.getPosition();
        var lp = this.starPosition.sub(po);
        var r = lp.signAngle(cc.v2(0, 1));
        var s = lp.mag();
        if(!this.lunchs){this.character.node.rotation = r * 180 / 3.14 + 90;}
        this.character.body.linearVelocity = cc.v2(Math.cos(r), -Math.sin(r)).normalizeSelf().mulSelf(200);
        if (s > this.radius) {
            this.character.body.linearVelocity = this.character.body.linearVelocity.rotate(3.14 / 5 * (s - this.radius));
        }
    }
    onTouch(v2:cc.Vec2)
    {
        this.lunchs = true;
        var fv2 = v2.mul(-1);
        var ro =  fv2.signAngle(cc.v2(0,1))*180/3.14;
        this.character.node.rotation = ro;
        this.lunch = v2.neg();
    }
    endTouch()
    {
        //判断移动到取消位置
        //lunchs = false
        this.character.dv2 = this.lunch;
        this.character.changeState(this.character.LunchState);
    }
    Quit()
    {
        this.lunchs = false;
    }
}
