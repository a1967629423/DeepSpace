import DieObject from "../DieObject";
import { WallType } from "../Wall";
import SceneSystem from "../../Script/SceneSystem";
import GlobalTime, { CoroutinesType } from "../../Script/Tools/GlobalTime";
import SceneSystem2 from "../SceneSystem2";
import BackGround2 from "../../Script/BackGround2";
import GameInit from "../../Script/GameInit";
import Creator from "./Creator";
const { ccclass, property } = cc._decorator;
@ccclass
export default class DieObjectManage extends Creator {
    @property(BackGround2)
    background: BackGround2 = null;
    @property
    generateHeight: number = 100;
    @property
    generateTime: number = 1.5;
    @property
    generateMaxCout:number = 3;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    protected unActiveChild: cc.Node[];
    protected _Camera: cc.Camera;
    protected static ManageCout:number = 0;
    start() {
        //super.start();
        //if(this.dieobjectManageGroup)this.node.setParent(this.dieobjectManageGroup);
        if(DieObjectManage.ManageCout<=this.generateMaxCout)
        {
            DieObjectManage.ManageCout++;
            super.start();
        }
        else
        {
            this.node.destroy();
        }
    }
    Init()
    {
        super.Init();
        GameInit.instance.node.once("gameEnd",this.gameEnd,this);
        this._Camera = cc.Camera.findCamera(this.node);
        this.childNumber = this.generateNumber;
        this.unActiveChild = new Array<cc.Node>();
        if(this.background)
        {
            this.background.node.once("changeToCenter",this.bgChange,this);
        }
    }
    generateObject(i: number):cc.Node {
        var ch = cc.instantiate(this.prefab_ins).getComponent(DieObject);
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
            this.node.addChild(ch.node);
            this.changeActive(ch);
            return ch.node;

        }
        return super.generateObject(i);
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
    randomActiveChild() {
        if (this.unActiveChild.length > 0) {
            var camera = this._Camera;
            var addy = this.node.convertToNodeSpaceAR(camera.node.getParent().convertToWorldSpaceAR(camera.node.position)).y + 960;
            this.unActiveChild[0].y += addy
            this.unActiveChild[0].getComponent(DieObject).Destroy_Y+= addy;
            this.unActiveChild[0].active = true;
            this.unActiveChild.splice(0, 1);
        }
    }
    gameEnd()
    {
        DieObjectManage.ManageCout = 0;
        //console.log(DieObjectManage.ManageCout)
    }
    onDestroy()
    {
        super.onDestroy();
        DieObjectManage.ManageCout--;
    }

    // update (dt) {}
}
