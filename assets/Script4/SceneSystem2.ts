import SceneSystem from "../Script/SceneSystem";
import BackGround2 from "../Script/BackGround2";
import DieWall from "./DieWall";
import { WallType } from "./Wall";
import DieObjectManage from "./Manage/DieObjectManage";
import PropManage from "./Manage/PropManage";

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
    Props:cc.Prefab[] = new Array<cc.Prefab>();
    @property(cc.Prefab)
    dieObject:cc.Prefab[] = new  Array<cc.Prefab>();
    wallWidth:number = 0;
    dieWallInstance:cc.Node = null;
    wallLInstance:cc.Node = null;
    wallRInstance:cc.Node = null;
    public static get Instance():SceneSystem2
    {
        return <SceneSystem2>super.Instance
    }
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
                //生成死亡墙
                this.createDieWall(DieWall);
                this.createDieObjectManage(bg);
                //生成道具
                this.createPropManage(bg);
            }); 
            
            
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
                var c = Math.random()
                if(c>0.41)
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
                            twall.position = cc.v2(this.wallWidth-twall.width,100+i*200);
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
    createDieObjectManage(bg:BackGround2)
    {
        var dieManage = new cc.Node();
        dieManage.x = this.lX;
        dieManage.y = bg.node.height;
        var obm = dieManage.addComponent(DieObjectManage);
        obm.ObjectPerfab = this.dieObject;
        obm.background = bg;
        obm.generateHeight = 2000;
        obm.generateNumber = 3;
        obm.generateMaxCout = 2;
        obm.generateTime = 2;
        bg.node.addChild(dieManage);
    }
    createPropManage(bg:BackGround2)
    {
        var pm = new cc.Node();
        pm.x = this.lX;
        var om = pm.addComponent(PropManage);
        om.ObjectPerfab = this.Props;
        om.generateNumber = 5;
        bg.node.addChild(pm);
    }
}
