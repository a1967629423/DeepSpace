import AssetsName from "../Script/Tools/AssetsName";
import AssetsSystem from "../Script/System/AssestSystem";
import GameInit from "../Script/GameInit";
const {ccclass, property} = cc._decorator;

@ccclass
export default class PoolObject extends cc.Component {
    assetsconfig:AssetsName = null
    start () {
        this.assetsconfig = this.getComponent(AssetsName);
        GameInit.rootNode.on(GameInit.GameEnd,()=>{
            if(this.node.active)
            {
                this.destroy();
            }
        },this)
    }
    listenUnuse:Function = null;
    listenReuse:Function= null;
    isUse:boolean = true;
    unuse()
    {
        if(this.listenUnuse)
        {
            this.listenUnuse();
        }
    }
    reuse()
    {
        if(this.listenReuse)
        {
            this.listenReuse();
        }
    }
    destroy():boolean
    {
        var conf = null;
        if(this.assetsconfig)
        {
            conf = this.assetsconfig
        }else if(cc.isValid(this)){

            conf = this.getComponent(AssetsName);
        }
        else 
        return;
        if(conf)
        {
            AssetsSystem.instance.putAssest(conf.assetsGropName,conf.assetsType,this.node);
            return true;
        }
        else
        {
            this.node.destroy();
            return super.destroy();
        }
    }

    // update (dt) {}
}
