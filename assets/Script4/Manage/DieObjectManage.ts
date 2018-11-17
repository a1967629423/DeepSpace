import DieObject from "../DieObject";
import { WallType } from "../Wall";
import SceneSystem from "../../Script/SceneSystem";
import GlobalTime, { CoroutinesType } from "../../Script/Tools/GlobalTime";
import SceneSystem2 from "../SceneSystem2";
import BackGround2 from "../../Script/BackGround2";
const { ccclass, property } = cc._decorator;
@ccclass
export default class DieObjectManage extends cc.Component {
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
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    protected prefab_ins: cc.Node[];
    protected childNumber: number;
    protected unActiveChild: cc.Node[];
    protected Camera: cc.Camera;
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
        var rp = Math.floor(Math.random()*this.prefab_ins.length);
        var ch = cc.instantiate(this.prefab_ins[rp]).getComponent(DieObject);
        if (ch) {
            var r = Math.random();
            var h = Math.floor(Math.random() * this.generateHeight);

            if (r > 0.5) {
                //左
                ch.Type = WallType.Left;
                ch.node.x = ch.node.width * ch.node.anchorX;
            }
            else {
                //右
                ch.Type = WallType.Right;
                var w = SceneSystem2.Instance.rX - SceneSystem2.Instance.lX;
                ch.node.x = w - (ch.node.width * (1 - ch.node.anchorX));
            }
            ch.node.y = h;
            ch.Destroy_Y = -SceneSystem.Instance.bgheight;
            ch.node.once("destroy", this.childDestroy, this);
            this.node.addChild(ch.node);
            this.changeActive(ch);

        }
    }
    changeActive(ch: DieObject) {
        ch.node.active = false;//进入等待激活
        this.unActiveChild.push(ch.node);
    }
    bgChange(bg: BackGround2) {
        var _this = this;
        GlobalTime.Instantiation.Coroutines((function* () {
            while (_this.isValid) {
                _this.randomActiveChild();
                yield CoroutinesType.SleepTime(_this.generateTime);
            }

        })());

    }
    childDestroy() {
        this.childNumber--;
        if (this.childNumber <= 0) {
            this.node.destroy();
        }
    }
    randomActiveChild() {
        if (this.unActiveChild.length > 0) {
            var camera = this.Camera;
            this.unActiveChild[0].y += this.node.convertToNodeSpaceAR(camera.node.getParent().convertToWorldSpaceAR(camera.node.position)).y + 960

            this.unActiveChild[0].active = true;
            this.unActiveChild.splice(0, 1);

        }
    }

    // update (dt) {}
}
