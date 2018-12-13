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
    _assetsGroup:{[idx:string]:{[idx:string]:cc.NodePool}} = {};
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
                if(this._assetsGroup[assets.assetsGropName][assets.assetsType])
                {
                    this._assetsGroup[assets.assetsGropName][assets.assetsType].clear();
                }
                else
                {
                    var pool = new cc.NodePool();
                    for(var i =0;i<assets.assetsInsCout;i++)
                    {
                        pool.put(cc.instantiate(cn));
                    }
                    this._assetsGroup[assets.assetsGropName][assets.assetsType] = pool;
                }      
            }
            else
            {
                var pool = new cc.NodePool();
                for(var i =0;i<assets.assetsInsCout;i++)
                {

                    pool.put(cc.instantiate(cn));
                }
                this._assetsGroup[assets.assetsGropName] = {[assets.assetsType]:pool};
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
        //console.log("get Assest type: "+type);
        if(this._assetsGroup[groupName]&&this._assetsGroup[groupName][type])
        {
            let node = this._assetsGroup[groupName][type].get();
            // if(node)setTimeout(((n)=>{
            //     return ()=>{
            //         n.emit("poolStart");
            //     }
            // })(node))
            return node;
        }
        else
        {
            return null;
        }
    }
    putAssest(groupName:string,type:string,node:cc.Node)
    {
        //console.log("put Assest type: "+type);
        if(this._assetsGroup[groupName]&&this._assetsGroup[groupName][type])
        {
            //console.log(type+ " size "+this._assetsGroup[groupName][type].size())
            node.emit("poolDestory");
            this._assetsGroup[groupName][type].put(node);
        }
    }
    start () {
        GameInit.instance.node.once("gameEnd",()=>{
            AssetsSystem._instance = null;
        })
    }

    // update (dt) {}
}
