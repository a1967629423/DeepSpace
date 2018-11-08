import SceneSystem from "../Script/SceneSystem";
import BackGround2 from "../Script/BackGround2";
const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneSystem2 extends SceneSystem {
    player:cc.Node;
    @property(cc.Prefab)
    wallR:cc.Prefab = null;
    @property(cc.Prefab)
    wallL:cc.Prefab = null;
    @property(cc.Prefab)
    spring:cc.Prefab = null;
    @property(cc.Prefab)
    Prop:cc.Prefab = null;
    createrSomething(bg:BackGround2)
    {
        if(this.wallR&&this.wallL)
        {
            //生成墙壁
            var  right = cc.instantiate(this.wallR);
            var left = cc.instantiate(this.wallL);
            bg.node.addChild(right);
            bg.node.addChild(left);
        }
        //生成弹簧
        //生成道具
    }
}
