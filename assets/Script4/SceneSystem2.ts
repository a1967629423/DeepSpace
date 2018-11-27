import SceneSystem from "../Script/SceneSystem";
import BackGround2 from "../Script/BackGround2";
import DieWall from "./DieWall";
import { WallType } from "./Wall";
import DieObjectManage from "./Manage/DieObjectManage";
import PropManage from "./Manage/PropManage";
import ScenesState from "./StateMesh/Scenes/ScenesState";
import AssetsName from "../Script/Tools/AssetsName";
import Normal_ScenesState from "./StateMesh/Scenes/Normal_ScenesState";

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
    @property(cc.Node)
    dieObjectManageGrop:cc.Node = null;
    @property(cc.Prefab)
    Props:cc.Prefab[] = new Array<cc.Prefab>();
    @property(cc.Prefab)
    dieObject:cc.Prefab[] = new  Array<cc.Prefab>();
    wallWidth:number = 0;
    dieWallInstance:cc.Node = null;
    wallLInstance:cc.Node = null;
    wallRInstance:cc.Node = null;
    nowCreateBackground:BackGround2 = null;
    //StateMesh
    normalState:Normal_ScenesState = null;
    private _nowState:ScenesState = null;
    public get nowState():ScenesState
    {
        return this._nowState;
    }
    changeState(ns:ScenesState)
    {
        if(this._nowState)this._nowState.Quit();
        this._nowState = ns;
        ns.Start();
    }
    public static get Instance():SceneSystem2
    {
        return <SceneSystem2>super.Instance
    }
    constructor()
    {
        super();
        this.normalState = new Normal_ScenesState(this);
    }
    start()
    {
        super.start();
        this.changeState(this.normalState);
    }
    createrSomething(bg:BackGround2,idx:number)
    {
        this.nowCreateBackground = bg;
        //if(this._nowState)this._nowState.createSomething(bg,idx );
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
        if(this._nowState)this._nowState.createWall(wallGroup);
    }
    createDieWall(wallGroup:cc.Node)
    {
        if(this._nowState)this._nowState.createDieWall(wallGroup);
    }
    createDieObjectManage(bg:BackGround2)
    {
        if(this._nowState)this._nowState.createDieObjectManage(this.dieObjectManageGrop?this.dieObjectManageGrop:bg.node);
    }
    createPropManage(bg:BackGround2)
    {
        if(this._nowState)this._nowState.createPropManage(bg.node);
    }
}
