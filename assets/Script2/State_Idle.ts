import { CharacterState } from "./State";
//闲置状态
//处理用户输入，
export default class State_Idle extends CharacterState {
    /**
     * 发射方向
     */
    lunch:cc.Vec2 = cc.v2(0,0);
    /**
     * 选择发射方向的标识符
     */
    isLunch:boolean = false;
    update(dt:number)
    {
        if(this.character.nowStar){this.character.changeState(this.character.InStarState)}
    }
    onTouch(v2:cc.Vec2)
    {
        this.isLunch = true;
        var fv2 = v2.mul(-1);
        var ro =  fv2.signAngle(cc.v2(0,1))*180/3.14;
        this.character.node.rotation = ro;
        this.lunch = v2.neg();
    }
    endTouch()
    {
        //如果移动到取消位置
        //isLunch = false
        if(this.isLunch)
        {
            //应用发射力度
            this.character.dv2 = this.lunch.mul(20);
            this.character.changeState(this.character.LunchState);
        }

    }
    Quit()
    {
        super.Quit();
        this.isLunch = false;
    }
}
