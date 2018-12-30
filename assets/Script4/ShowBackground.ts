import AssetsName from "../Script/Tools/AssetsName";
import AssetsSystem from "../Script/System/AssestSystem";
import PoolObject from "./PoolObject";

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
export default class ShowBackground extends PoolObject {
    assestconfig:AssetsName = null;
    start () {
        super.start();
        this.assestconfig = this.getComponent(AssetsName)
    }
    destroy():boolean
    {
        var config = this.assestconfig;
        if(config&&AssetsSystem.instance)
        {
            AssetsSystem.instance.putAssest(config.assetsGropName,config.assetsType,this.node);
            return true;
        }
        else
        {
            super.destroy();
            return this.node.destroy();
        }
    }

    // update (dt) {}
}
