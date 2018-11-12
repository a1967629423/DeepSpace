import SceneSystem from "../Script/SceneSystem";
import BackGround2 from "../Script/BackGround2";
import DieWall from "./DieWall";
import { WallType } from "./Wall";
const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneSystem2 extends SceneSystem {
    player:cc.Node;
    @property(cc.Prefab)
    wallR:cc.Prefab = null;
    @property
    rX:number = 900;
    @property(cc.Prefab)
    wallL:cc.Prefab = null;
    @property
    lX:number = 600;
    @property(cc.Prefab)
    dieWall:cc.Prefab = null;
    @property
    dieWallWidthRang:number = 10;
    @property(cc.Prefab)
    Prop:cc.Prefab = null;
    wallWidth:number = 0;
    dieWallInstance:cc.Node = null;
    wallLInstance:cc.Node = null;
    wallRInstance:cc.Node = null;
    createrSomething(bg:BackGround2,idx:number)
    {
        if(idx === 7)
        {
            
            this.wallWidth = this.rX-this.lX;
            var wall = new cc.Node("Wall");
            var RoundWall = new cc.Node("Round");
            var DieWall = new cc.Node("DieWalls");
            wall.zIndex = 0;
            RoundWall.zIndex = 0;
            DieWall.zIndex = 1;
            DieWall.position = cc.v2(this.lX,0);
            wall.addChild(RoundWall);
            wall.addChild(DieWall);
            bg.node.addChild(wall);
            
            //生成墙壁
            setTimeout(()=>{
                this.createWall(RoundWall);
                this.createDieWall(DieWall);
            }); 
            //生成死亡墙
            //生成道具
        }

    }
    createWall(wallGroup:cc.Node)
    {
        if(!this.wallRInstance)this.wallRInstance = cc.instantiate(this.wallR);
        if(!this.wallLInstance)this.wallLInstance = cc.instantiate(this.wallL);
        if(this.wallR&&this.wallL)
        {

            var  right = cc.instantiate(this.wallR);
            var left = cc.instantiate(this.wallL);
            wallGroup.addChild(right);
            wallGroup.addChild(left);
        }
    }
    createDieWall(wallGroup:cc.Node)
    {
        if(this.dieWall)
        {
            if(!this.dieWallInstance)this.dieWallInstance = cc.instantiate(this.dieWall)
            for(var i =0;i<10;i++)
            {
                var random = Math.random();
                var wall = cc.instantiate<cc.Node>(this.dieWallInstance);
                wall.setAnchorPoint(cc.v2(0,0));

                var addWidth = this.dieWallWidthRang*Math.random();
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
                        var twall = cc.instantiate(this.dieWallInstance)
                        var box =  twall.getComponent(cc.PhysicsBoxCollider);
                        box.size.width += this.dieWallWidthRang*Math.random();
                        box.offset = 
                        cc.v2(twall.getContentSize().width/2,twall.getContentSize().height/2);
                        twall.position = cc.v2(this.wallWidth-twall.width,i*200);
                        twall.getComponent(DieWall).Type = WallType.Right;
                        wallGroup.addChild(twall);
                    }
                }
                else
                {
                    wall.position = cc.v2(this.wallWidth-wall.width,i*200);
                    wall.getComponent(DieWall).Type = WallType.Right;
                }
                wallGroup.addChild(wall);

            }
        }
    }
}
