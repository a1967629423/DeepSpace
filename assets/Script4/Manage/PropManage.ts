import SceneSystem2 from "../SceneSystem2";
import PorpObject from "../PropObject";
import Creator from "./Creator";

const { ccclass, property } = cc._decorator;
@ccclass
export default class PropManage extends Creator {

    // onLoad () {}
    start() {
        super.start();
    }
    generateObject(i: number):cc.Node {
        var r = Math.random();
        if (r > 0.2) {
            var x = Math.random()*(SceneSystem2.Instance.rX-SceneSystem2.Instance.lX);
            var po = cc.instantiate(this.prefab_ins).getComponent(PorpObject);
            if(po)
            {
                po.node.y = i *300;
                po.node.x = x;
                this.node.addChild(po.node);
                return po.node;                  
            }
            return super.generateObject(i);
        }
        return super.generateObject(i);
    }

    // update (dt) {}
}

