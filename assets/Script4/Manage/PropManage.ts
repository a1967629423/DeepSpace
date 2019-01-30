import SceneSystem2 from "../SceneSystem2";
import PorpObject from "../PropObject";
import Creator from "./Creator";
import AssetsSystem from "../../Script/System/AssestSystem";

const { ccclass, property } = cc._decorator;
@ccclass
export default class PropManage extends Creator {
    PropType:{style:string,type:string,p:number}[];
    // onLoad () {}
    start() {
        super.start();
        if(window['propman'])this.PropType = window['propman'];
        else
        window['propman'] = this.PropType;
    }
    reuse()
    {
        this.PropType = [
            {style:AssetsSystem.instance.nowGroup,type:"prop",p:0.4+(this.fenshu/1000)%1},
            {style:"Normal",type:"godProp",p:0.1},
            {style:"Normal",type:"flyProp",p:0.1},
            //{style:"Normal",type:"luckProp",p:0.03+(this.fenshu/10000)%0.09},
            {style:"Normal",type:"dieProp",p:0.1},
            {style:"Normal",type:"boomProp",p:0.1},
        ]
        super.reuse();
    }
    generateObject(i: number):cc.Node {
        var r = Math.random();
        if (r > 0.2) {
            var wallWidth = SceneSystem2.Instance.rX-SceneSystem2.Instance.lX;
            var stateWallWidth = 160;
            var x = 0;
            let ep = 0;
            this.PropType.forEach((val:{style:string,type:string,p:number})=>{
                ep+=val.p;
            })
            var tr = Math.random()*ep;
            var po:PorpObject = null;
            var add = 0;
            for(var f = 0;f<this.PropType.length;f++)
            {
                //let add = !f?0:this.PropType[f-1].p;
                if(tr<this.PropType[f].p+add)
                {
                    
                    
                    let ty =this.PropType[f];
                    po = AssetsSystem.instance.getAssest(ty.style,ty.type).getComponent(PorpObject);
                    x = Math.random()*(wallWidth-po.node.width*po.node.anchorX-stateWallWidth*2)+po.node.width*po.node.anchorX+stateWallWidth;
                    break;
                }
                add += this.PropType[f].p;
            }
            if(po)
            {
                po.node.y = i *370+80;
                po.node.x = x;
                this.node.addChild(po.node);
                po.node.active = true;
                return po.node;                  
            }
            return super.generateObject(i);
        }
        return super.generateObject(i);
    }

    // update (dt) {}
}

