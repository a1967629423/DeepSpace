import Normal_ScenesState from "./Normal_ScenesState";
import GameInit from "../../../Script/GameInit";
import Wall, { WallType } from "../../Wall";

export default class Change_ScenesState extends Normal_ScenesState {
    createSomething(bg,idx)
    {
        super.createSomething(bg,idx);
        setTimeout(()=>{
            debugger;
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
        if(wallL)
        {
            
            var  left = cc.instantiate(wallL);
            var title = <Title>left.getComponent("Title");
            if(title)
            {
                left.removeComponent("Title");
                var cout = title.cout;
                var remix = <Remix>left.addComponent("Remix");
                if(remix)
                {
                    
                    debugger;
                    this.context.nowGroupindex++;
                    remix.targetTex = this.context.getAssest(this.context.nowGroup,"wall").getComponent(cc.Sprite).spriteFrame.getTexture();
                    remix.cout = cout;
                }
            }
            var right = cc.instantiate(left);
            left.x = this.context.lX;
            right.getComponent(Wall).Type = WallType.Right;
            right.x= this.context.rX;
            right.anchorX = 0;
            right.getComponent(cc.PhysicsBoxCollider).offset.x *=-1;

            wallGroup.addChild(right);
            wallGroup.addChild(left);
        }
    }
    Quit()
    {
        GameInit.instance.styleChangeComplete(this.context.nowCreateBackground.node);
    }

}
