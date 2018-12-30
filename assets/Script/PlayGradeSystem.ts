import Character from "./Character";
import GradeManage from "./GradeManage";
import GameInit from "./GameInit";
import Character4 from "../Script4/Character4";

const {ccclass, property} = cc._decorator;
/** 角色计分系统
*将角色的飞行距离计入分数
*/
@ccclass
export default class PlayGradeSystem extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(Character)
    player:Character4 = null;
    @property({displayName:"每次记录间隔的时间",min:0.1})
    interval:number = 1;
    time:number = 0;
    lastDistance:number = 0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    lastY:number = 0;
    cycleIndex:number = 0;
    changDis = 800;
    start () {
    }
    update (dt) {
         if(this.player&&this.player.isValid&&this.player.exist)
         {
            if(this.time-this.interval>0&&this.player.isValid)
            {
                var distance =  this.player.Distance;
                GradeManage.instance.addGrade(Math.max(distance-this.lastDistance,0));
                this.lastDistance  = distance;
                this.time = 0;
            }
            else
            {
                this.time +=dt;
            }
            if(this.player.Distance-this.lastY>this.changDis)
            {
                GameInit.instance.changeBackground(this.node);
                this.lastY = this.player.Distance;
                this.changDis+=450  //300*this.cycleIndex;
            }
         }

    }
    onDestroy()
    {
        GradeManage.instance.clearGrade();
    }
}
