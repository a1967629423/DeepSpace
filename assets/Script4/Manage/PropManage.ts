import SceneSystem2 from "../SceneSystem2";
import PorpObject from "../PropObject";
import Creator from "./Creator";
import AssetsSystem from "../../Script/System/AssestSystem";

const { ccclass, property } = cc._decorator;
@ccclass
export default class PropManage extends Creator {
    PropType:{style:string,type:string,p:number}[] = [
        {style:"Normal",type:"prop",p:0.4},
        {style:"Normal",type:"flyProp",p:0.1},
        {style:"Normal",type:"godProp",p:0.5}
    ]
    // onLoad () {}
    start() {
        super.start();
    }
    generateObject(i: number):cc.Node {
        var r = Math.random();
        if (r > 0.2) {
            var x = Math.random()*(SceneSystem2.Instance.rX-SceneSystem2.Instance.lX);
            //AssetsSystem.instance.getAssest("Normal","flyProp")
            let ep = 0;
            this.PropType.forEach((val:{style:string,type:string,p:number})=>{
                ep+=val.p;
            })
            var tr = Math.random()*ep;
            var po;
            for(var f = 0;f<this.PropType.length;f++)
            {
                let add = !f?0:this.PropType[f-1].p;
                if(r<this.PropType[f].p+add)
                {
                    let ty =this.PropType[f];
                    po = cc.instantiate(AssetsSystem.instance.getAssest(ty.style,ty.type)).getComponent(PorpObject);
                    break;
                }
            }
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

