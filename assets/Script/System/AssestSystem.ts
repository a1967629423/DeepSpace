import AssetsName from "../Tools/AssetsName";
import GameInit from "../GameInit";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class AssetsSystem extends cc.Component {

    private static _instance:AssetsSystem = null;
    public static get instance():AssetsSystem
    {
        if(!this._instance)this._instance = cc.find("System/AssestSystem").getComponent(AssetsSystem);
        return this._instance;
    }
    @property([cc.Prefab])
    Assets:cc.Prefab[] = new Array<cc.Prefab>();
    _assetsGroup:Object = new Object();
    @property({multiline:true,displayName:"样式出现顺序",tooltip:"使用';'进行分割"})
    Groups___:String = "Normal;";
    Groups:string[] = [];
    nowGroupindex = 0;
    public get nowGroup():string
    {
        if(this.nowGroupindex>=this.Groups.length)this.nowGroupindex = 0;
        return this.Groups[this.nowGroupindex];
    }
    onLoad()
    {
        this.Assets.forEach(this.initAssets.bind(this));
        let reg = /(?!;)\S+?(?=;)/g;
        this.Groups = this.Groups___.match(reg);
    }
    initAssets(value:cc.Prefab)
    {
        var cn = cc.instantiate(value);
        var assets = cn.getComponent(AssetsName);
        if(assets)
        {
            if(this._assetsGroup[assets.assetsGropName])
            {
                this._assetsGroup[assets.assetsGropName][assets.assetsType] = cn;
            }
            else
            {
                var ob = new Object();
                ob[assets.assetsType] = cn;
                this._assetsGroup[assets.assetsGropName] = ob;
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
        return this._assetsGroup[groupName]?this._assetsGroup[groupName][type]:undefined;
    }
    start () {
        GameInit.instance.node.once("gameEnd",()=>{
            AssetsSystem._instance = null;
        })
    }

    // update (dt) {}
}
