import Normal_ScenesState from "./Normal_ScenesState";
import GameInit from "../../../Script/GameInit";
import Wall, { WallType } from "../../Wall";
import AssetsSystem from "../../../Script/System/AssestSystem";
import GlobalTime, { CoroutinesType } from "../../../Script/Tools/GlobalTime";

export default class Change_ScenesState extends Normal_ScenesState {
    createSomething(bg,idx)
    {
        super.createSomething(bg,idx);
        setTimeout(()=>{
            //debugger;
            this.context.changeState(this.context.normalState);
        },10);
    }
    createDieWall(Group:cc.Node){
    }
    createDieObjectManage(Group:cc.Node){
    }
    createPropManage(Group:cc.Node){

    }
    createWall(wallGroup:cc.Node)
    {
        var wallL = this.context.getAssest(this.context.nowGroup,"wall");
        var wallR = this.context.getAssest(this.context.nowGroup,"wall");
        if(wallL&&wallR)
        {
            
            var  left = wallL;
            var right = wallR;
            left.x = this.context.lX;
            left.getComponent(Wall).Type = WallType.Left;
            left.anchorX = 1;
            var lbox = left.getComponent(cc.PhysicsBoxCollider);
            lbox.offset.x = Math.abs(lbox.offset.x)*-1;
            right.getComponent(Wall).Type = WallType.Right;
            right.x= this.context.rX;
            right.anchorX = 0;
            var rbox = right.getComponent(cc.PhysicsBoxCollider);
            rbox.offset.x = Math.abs(rbox.offset.x);
            left.active = true;
            right.active = true;


            var ltitle = <Title>left.getComponent("Title");
            var rtitle = <Title>right.getComponent("Title");
            if(ltitle&&rtitle)
            {
                left.removeComponent("Title");
                right.removeComponent("Title");
                var cout = ltitle.cout;
                var lremix = <Remix>left.addComponent("Remix");
                var rremix = <Remix>right.addComponent("Remix");
                if(lremix&&rremix)
                {
                    this.context.nowGroupindex++;
                    var wnode = this.context.getAssest(this.context.nowGroup,"wall");
                    rremix.targetTex = wnode.getComponent(cc.Sprite).spriteFrame.getTexture();
                    lremix.targetTex = wnode.getComponent(cc.Sprite).spriteFrame.getTexture();
                    AssetsSystem.instance.putAssest(this.context.nowGroup,"wall",wnode);
                    lremix.cout = cout;
                    rremix.cout = cout;
                    left.once("poolDestory",()=>{
                        lremix.destroy();
                        var title = <Title>left.addComponent("Title");
                        title.cout = cout;
                    });
                    right.once("poolDestory",()=>{
                        rremix.destroy();
                        var title =  <Title>right.addComponent("Title");
                        title.cout = cout;
                    });
                }
            }
            GlobalTime.Instantiation.Coroutines((function* (l, w) {
                yield CoroutinesType.SleepTime(1);
                w.addChild(l);
                setTimeout(() => {
                    //延迟重置位置
                    l.y = 0;
                })
                left.active = true;
            })(left, wallGroup));
            GlobalTime.Instantiation.Coroutines((function* (r, w) {
                yield CoroutinesType.SleepTime(0.5);
                w.addChild(right);
                setTimeout(() => {
                    //延迟重置位置
                    r.y = 0;
                })
                right.active = true;
            })(right, wallGroup));
        }
    }
    Quit()
    {
        GameInit.instance.styleChangeComplete(this.context.nowCreateBackground.node);
    }

}
