import SceneSystem from "../Script/SceneSystem";
import BackGround2 from "../Script/BackGround2";
import DieWall from "./DieWall";
import { WallType } from "./Wall";
import DieObjectManage from "./Manage/DieObjectManage";
import PropManage from "./Manage/PropManage";
import ScenesState from "./StateMesh/Scenes/ScenesState";
import AssetsName from "../Script/Tools/AssetsName";
import Normal_ScenesState from "./StateMesh/Scenes/Normal_ScenesState";
import Change_ScenesState from "./StateMesh/Scenes/Change_ScenesState";

const {ccclass, property} = cc._decorator;
@ccclass
export default class SceneSystem2 extends SceneSystem {
    @property(cc.Prefab)
    walls_l:cc.Prefab[] = Array<cc.Prefab>()
    @property(cc.Prefab)
    dieWalls_l:cc.Prefab[] = Array<cc.Prefab>()
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
    ChangeState:Change_ScenesState = null;
    private _nowState:ScenesState = null;
    assetsDate:Object = null;
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
    nowGrop:string = "Normal";
    public static get Instance():SceneSystem2
    {
        return <SceneSystem2>super.Instance
    }
    constructor()
    {
        super();
        this.assetsDate = new Object();
        this.normalState = new Normal_ScenesState(this);
        this.ChangeState = new Change_ScenesState(this);
    }
    onLoad()
    {
        //将资源按组创建实例并保存
        this.walls_l.forEach((value:cc.Prefab)=>{
            this.initAssets(value,"wall");
        });
        this.dieWalls_l.forEach((value:cc.Prefab)=>{
            this.initAssets(value,"dieWall");
        });

    }
    initAssets(value:cc.Prefab,typeName:string)
    {
        var cn = cc.instantiate(value);
        var assets = cn.getComponent(AssetsName);
        if(assets)
        {
            if(this.assetsDate[assets.assetsGropName])
            {
                this.assetsDate[assets.assetsGropName][typeName] = cn;
            }
            else
            {
                var ob = new Object();
                ob[typeName] = cn;
                this.assetsDate[assets.assetsGropName] = ob;
            }
        }
    }
    /**
     * 将资源从组中取出
     * @param groupName 资源组名
     * @param type 资源类型名
     */
    getAssest(groupName:string,type:string):cc.Node
    {
        return this.assetsDate[groupName]?this.assetsDate[groupName][type]:undefined;
    }
    start()
    {
        super.start();
        this.changeState(this.normalState);
    }
    createrSomething(bg:BackGround2,idx:number)
    {
        //因为setTimeOut调整执行顺序所以不能在这使用
        //this.nowCreateBackground = bg;
        
        if(idx === 7)
        {
            if(this._nowState)this._nowState.createSomething(bg,idx );
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
                this.nowCreateBackground = bg;
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
