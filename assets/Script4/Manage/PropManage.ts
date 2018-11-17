import BackGround2 from "../../Script/BackGround2";
import SceneSystem2 from "../SceneSystem2";
import PorpObject from "../PropObject";

const { ccclass, property } = cc._decorator;
@ccclass
export default class PropManage extends cc.Component {
    @property(cc.Prefab)
    ObjectPerfab: cc.Prefab[] = null;
    @property(BackGround2)
    background: BackGround2 = null;
    @property({ step: 1 })
    generateNumber: number = 0;
    @property
    generateHeight: number = 100;
    @property
    generateTime: number = 1.5;
    protected prefab_ins: cc.Node[];
    protected childNumber: number;
    protected unActiveChild: cc.Node[];
    protected Camera: cc.Camera;
    // onLoad () {}
    start() {
        this.Camera = cc.Camera.findCamera(this.node);
        this.childNumber = this.generateNumber;
        this.unActiveChild = new Array<cc.Node>();
        if (this.ObjectPerfab && this.generateNumber > 0) {
            if (!this.prefab_ins)
            {
                this.prefab_ins = new Array<cc.Node>();
                for(var a of this.ObjectPerfab)
                {
                    this.prefab_ins.push(cc.instantiate(a));
                }
            }
            for (var i = 0; i < this.generateNumber; i++) {
                this.generateObject(i);
            }
            if (this.background) {
                this.background.node.on("changeToCenter",this.bgChange,this);
                
            }
        }
        else {
            this.node.destroy();
        }
    }
    generateObject(i: number) {
        var r = Math.random();
        var rp = Math.floor(Math.random()*this.prefab_ins.length)
        if (r > 0.2) {
            var x = Math.random()*(SceneSystem2.Instance.rX-SceneSystem2.Instance.lX);
            var po = cc.instantiate(this.prefab_ins[rp]).getComponent(PorpObject);
            if(po)
            {
                po.node.y = i *300;
                po.node.x = x;
                this.node.addChild(po.node); 
                po.node.once("destroy",this.childDestroy,this);                      
            }

        }
    }
    childDestroy() {
        if(this.isValid)
        {
            this.childNumber--;
            if (this.childNumber <= 0) {
                //this.node.destroy();
            }
        }
    }
    bgChange()
    {

    }

    // update (dt) {}
}

