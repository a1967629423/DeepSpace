import DieObject from "../DieObject";
import { WallType } from "../Wall";
import SceneSystem from "../../Script/SceneSystem";
import GlobalTime, { CoroutinesType } from "../../Script/Tools/GlobalTime";
import SceneSystem2 from "../SceneSystem2";
import BackGround2 from "../../Script/BackGround2";
import CameraFx from "../../Script/Tools/CameraFx";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DieObjectManage extends cc.Component {
    @property(cc.Prefab)
    DieObjectPerfab: cc.Prefab = null;
    @property(BackGround2)
    bg:BackGround2 = null;
    @property({step:1})
    generateNumber: number = 0;
    @property
    generateHeight:number = 100;
    @property
    generateTime:number = 1.5;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    private prefab_ins: cc.Node;
    private childNumber:number;
    private unActiveChild:cc.Node[];
    start() {
        this.childNumber = this.generateNumber;
        this.unActiveChild = new Array<cc.Node>();
        if (this.DieObjectPerfab&&this.generateNumber>0) {
            if (!this.prefab_ins) this.prefab_ins = cc.instantiate(this.DieObjectPerfab);
            
            for (var i = 0; i < this.generateNumber; i++) {
                var ch = cc.instantiate(this.prefab_ins).getComponent(DieObject);
                if (ch) {
                    var r = Math.random();
                    var h = Math.floor( Math.random()*this.generateHeight);
                     
                    if (r > 0.5) {
                        //左
                        ch.Type = WallType.Left;
                        ch.node.x = ch.node.width*ch.node.anchorX;
                    }
                    else {
                        //右
                        ch.Type = WallType.Right;
                        ch.node.x = (SceneSystem2.Instance.rX-SceneSystem2.Instance.lX)-(ch.node.width*(1-ch.node.anchorX));
                    }
                    ch.node.y = h;
                    ch.Destroy_Y = -SceneSystem.Instance.bgheight;
                    ch.node.once("destroy",this.childDestroy,this);
                    ch.node.active = false;//进入等待激活
                    this.node.addChild(ch.node);
                    this.unActiveChild.push(ch.node);                  
                }
            }
            var _this = this;
            if(this.bg)
            {
                this.bg.node.on("changeToCenter",()=>{
                    GlobalTime.Instantiation.Coroutines((function*(){
                        while(_this.isValid)
                        {
                            _this.randomActiveChild();
                            yield CoroutinesType.SleepTime(_this.generateTime);
                        }
                        
                    })())
                });

            }
        }
        else
        {
            this.node.destroy();
        }
    }
    childDestroy()
    { 
        this.childNumber--;
        if(this.childNumber<=0)
        {
            this.node.destroy();
        }
    }
    randomActiveChild()
    {
        if(this.unActiveChild.length>0)
        {
            var camera = cc.Camera.findCamera(this.node)
            this.unActiveChild[0].y += this.node.convertToNodeSpaceAR(camera.node.getParent().convertToWorldSpaceAR(camera.node.position)).y+960
            console.log(this.unActiveChild.length);
            
            this.unActiveChild[0].active = true;
            this.unActiveChild.splice(0,1);
            
        }
    }

    // update (dt) {}
}
