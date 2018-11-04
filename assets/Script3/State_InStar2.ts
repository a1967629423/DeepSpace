import { CharacterState2 } from "./State2";
//在星球引力内部状态
export default class State_InStar2 extends CharacterState2 {
    timeout:number = 0;
    timeout1:number = 0;
    starPosition:cc.Vec2 = cc.v2(0,0);
    //过度完成的回调
    rfun:Function = null;
    //旋转过度开关
    rc:boolean = false;
    Start()
    {
        if(this.character.nowStar){
            this.starPosition = this.character.nowStar.node.getPosition();
        }
        this.timeout = setTimeout(() => {
            this.rc = true;
            this.timeout1 = setTimeout(()=>{
                this.character.changeState(this.character.RoundState);
            },500);
        }, 2000);
    }
    die()
    {
        clearTimeout(this.timeout);
        this.character.changeState(this.character.DieState);
    }
    update()
    {
        //施加阻力,需要判断是飞出还是飞入
        //this.character.adjustVec(this.character.body.linearVelocity.neg().normalize());
        
        if(this.character.body.linearVelocity.dot(this.character.node.getPosition().sub(this.starPosition))<-1)
        {
            this.character.adjustVec(this.character.node.getPosition().sub(this.starPosition).normalize());
        } 
        if(!this.character.nowStar){
            clearTimeout(this.timeout); this.character.changeState(this.character.IdleState)       
        }
        if(this.rc)
        {
            var po = this.character.node.getPosition();
            var lp = this.starPosition.sub(po);
            //目标旋转
            var r = lp.signAngle(cc.v2(0, 1))* 180 / 3.14 + 90;
            if(Math.abs(r - this.character.node.rotation)<1)
            {
                if(this.rfun)this.rfun();
                this.rc = false;
            }
            else
            {
                this.character.node.rotation += (r-this.character.node.rotation)*0.2; 
            }
        }

    }
    Quit()
    {
        super.Quit();
        clearTimeout(this.timeout);
        clearTimeout(this.timeout1);
        this.timeout = 0;
        this.timeout1 = 0;
        this.rc = false;
        this.rfun = null;
        //不重置星球位置，防止出现星球不存在
    }
}
