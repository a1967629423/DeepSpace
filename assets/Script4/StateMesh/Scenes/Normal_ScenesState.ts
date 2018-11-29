import ScenesState from "./ScenesState";
import DieWall from "../../DieWall";
import Wall, { WallType } from "../../Wall";
import DieObjectManage from "../../Manage/DieObjectManage";
import PropManage from "../../Manage/PropManage";
import GameInit from "../../../Script/GameInit";

export default class Normal_ScenesState extends ScenesState {
    Start()
    {
        GameInit.instance.node.once("changeBackground",()=>{
            this.context.changeState(this.context.ChangeState);
        });
    }
    createDieWall(wallGroup:cc.Node)
    {
        var _dieWall = this.context.getAssest(this.context.nowGrop,"dieWall");
        if(_dieWall)
        {
            if(!this.context.dieWallInstance)this.context.dieWallInstance = cc.instantiate(_dieWall)
            for(var i =0;i<10;i++)
            {
                var c = Math.random()
                if(c>0.41)
                {
                    var random = Math.random();
                    var wall = cc.instantiate<cc.Node>(this.context.dieWallInstance);
                    wall.setAnchorPoint(cc.v2(0,0));
    
                    var addWidth = this.context.dieWallWidthRang*Math.random();
                    wall.width += addWidth;
                    var box =  wall.getComponent(cc.PhysicsBoxCollider);
                    box.size.width += addWidth;
                    box.offset = 
                    cc.v2(wall.getContentSize().width/2,wall.getContentSize().height/2);
                    if(random>0.5)
                    {
                        wall.position = cc.v2(0,i*200);
                        wall.getComponent(DieWall).Type = WallType.Left;
                        random = Math.random();
                        if(random>0.8)
                        {
                            var twall = cc.instantiate(this.context.dieWallInstance)
                            var box =  twall.getComponent(cc.PhysicsBoxCollider);
                            box.size.width += this.context.dieWallWidthRang*Math.random();
                            box.offset = 
                            cc.v2(twall.getContentSize().width/2,twall.getContentSize().height/2);
                            twall.position = cc.v2(this.context.wallWidth-twall.width,100+i*200);
                            twall.getComponent(DieWall).Type = WallType.Right;
                            wallGroup.addChild(twall);
                        }
                    }
                    else
                    {
                        wall.position = cc.v2(this.context.wallWidth-wall.width,i*200);
                        wall.getComponent(DieWall).Type = WallType.Right;
                    }
                    wallGroup.addChild(wall);
                }
            }
        }
    }
    createWall(wallGroup:cc.Node)
    {
        var wallL = this.context.getAssest(this.context.nowGrop,"wall");
        if(wallL)
        {
            
            var  left = cc.instantiate(wallL);
            var right = cc.instantiate(left); 
            right.getComponent(Wall).Type = WallType.Right;
            right.x+=this.context.wallWidth;
            right.anchorX = 0;
            right.getComponent(cc.PhysicsBoxCollider).offset.x *=-1;

            wallGroup.addChild(right);
            wallGroup.addChild(left);
        }
       
    }
    createDieObjectManage(Group:cc.Node)
    {
        var dieManage = new cc.Node();
        dieManage.x = this.context.lX;
        dieManage.y = this.context.nowCreateBackground.node.height;
        var obm = dieManage.addComponent(DieObjectManage);
        obm.ObjectPerfab = this.context.dieObject;
        obm.background = this.context.nowCreateBackground;
        obm.generateHeight = 2000;
        obm.generateNumber = 3;
        obm.generateMaxCout = 2;
        obm.generateTime = 2;
        dieManage.setParent(Group);
    }
    createPropManage(Group:cc.Node)
    {
        var pm = new cc.Node();
        pm.x = this.context.lX;
        var om = pm.addComponent(PropManage);
        om.ObjectPerfab = this.context.Props;
        om.generateNumber = 5;
        pm.setParent(Group);
    }

}
