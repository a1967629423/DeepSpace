import BackGround2 from "./BackGround2";
import AssetsSystem from "./System/AssestSystem";
import StateMachine from "../Script4/StateMachine/StateMachine";

const { ccclass, property } = cc._decorator;
//使用setparent会先移除Chile，这会导致粒子特效消失，下一步优化：讲player放在单独的node下，通过worldposition来计算局部位置
@ccclass
export default class SceneSystem extends StateMachine {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Prefab)
    bg: cc.Prefab = null;
    @property
    bgwidth: number = 2000;
    @property
    bgheight: number = 2000;
    @property(cc.Prefab)
    Star: cc.Prefab = null;
    @property(cc.Node)
    player: cc.Node = null;
    @property(BackGround2)
    center: BackGround2 = null;
    @property(cc.Node)
    father: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    width: number = 0;
    height: number = 0;
    private static _instance: SceneSystem = null;
    public static get Instance(): SceneSystem {
        if (!this._instance) this._instance = cc.find("System/SceneSystem").getComponent(SceneSystem);
        return this._instance;
    }
    start() {
        this.Init()
    }
    get ScenesBackgound():BackGround2
    {
        var scene = null;
        var node = null;
        try
        {
            node = AssetsSystem.instance.getAssest("Normal","scenesBackground");
            scene = node.getComponent(BackGround2);
        } catch(e)
        {
            debugger;
        }
        
        return scene;
    }
    Init() {
        if (this.bg) {
            if (this.center == null) {
                this.center =this.ScenesBackgound;
            }
            var cnode = this.center.node;
            var w = this.width = this.bgwidth;
            var h = this.height = this.bgheight;
            var lx = cnode.x;
            var ly = cnode.y;
            //设置中心
            this.center.ground[4] = this.center;
            //设置周围
            for (var i = -1; i <= 1; i++) {
                for (var f = -1; f <= 1; f++) {
                    if (!(i == 0 && f == 0)) {
                        var gd = this.ScenesBackgound;
                        //创建场景内物体
                        var idx = (i + 1) * 3 + (f + 1);
                        this.createrSomething(gd, idx);
                        //添加到中心场景
                        if (cc.isValid(gd, true)) {
                            this.center.ground[idx] = gd;
                            gd.node.position = cc.v2(lx + w * f, ly + h * i);
                            gd.node.setParent(this.father);
                            gd.node.setSiblingIndex(0);
                            gd.node.active = true;
                        }
                    }
                }
            }
        }
        this.center.changToCenter();
    }
    createrSomething(bg: BackGround2, idx: number) {
        if (this.Star) {
            for (let index = 1; index <= 2; index++) {
                var star = cc.instantiate(this.Star)
                star.zIndex = 100;
                star.position = cc.v2(Math.random() * 400 + 500 * index, Math.random() * 400 + 500 * index);
                bg.node.addChild(star);
            }
        }
    }

    update(dt) {

        //重新开始游戏时，node还未初始化
        if (this.center && this.player) {
            var lposition = this.center.node.convertToNodeSpaceAR(this.player.position);
            var x = lposition.x;
            var y = lposition.y;
            if (x < 0) {
                if (y < 0) {
                    //左下角
                    this.ReSetCenter(0);


                } else if (y > this.height) {
                    //左上角
                    this.ReSetCenter(6);
                }
                else {
                    //左中部
                    this.ReSetCenter(3);
                }

            } else if (x > this.width) {
                if (y < 0) {
                    //右下角
                    this.ReSetCenter(2)
                } else if (y > this.height) {

                    this.ReSetCenter(8);
                }
                else {
                    this.ReSetCenter(5);
                }
            }
            else {
                if (y < 0) {
                    this.ReSetCenter(1);
                } else if (y > this.height) {
                    this.ReSetCenter(7);

                }

            }

        }

    }
    ReSetCenter(idx: number) {
        var ix = idx % 3;
        var iy = (idx - ix) / 3;
        var ct: BackGround2 = this.center.ground[idx];
        var lx = ct.node.x;
        var ly = ct.node.y;
        ct.node.setSiblingIndex(this.center.node.getSiblingIndex() + 1);
        //this.center.node.setSiblingIndex(ct.node.getSiblingIndex()-2);
        ct.ground[4] = ct;
        for (var i = -1; i <= 1; i++) {
            for (var f = -1; f <= 1; f++) {

                var ri = (i + 1);
                var rf = (f + 1);
                //找到老元素
                if (ix + f >= 0 && ix + f <= 2 && iy + i >= 0 && iy + i <= 2) {
                    var cgr = this.center.ground[(iy + i) * 3 + (ix + f)];
                    //cgr.node.setSiblingIndex(0);
                    ct.ground[ri * 3 + rf] = cgr;
                    //增加废弃地图块回收机制

                }
                //创建新元素
                if (!(i == 0 && f == 0)) {
                    if (!ct.ground[ri * 3 + rf]) {
                        var gd = this.ScenesBackgound;
                        
                        //创建场景内物体
                        var idx = ri * 3 + rf;
                        this.createrSomething(gd, idx);
                        //添加到中心场景
                        
                        if (cc.isValid(gd, true)) {
                            ct.ground[idx] = gd;
                            gd.node.position = cc.v2(lx + this.width * f, ly + this.height * i);
                            gd.node.setParent(this.father);
                            gd.node.setSiblingIndex(0);
                            gd.node.active = true;
                        }
                    }


                }
                //清理不需要的元素
            }
        }
        // var ax = this.center.node.x - ct.node.x;
        // var ay = this.center.node.y - ct.node.y;
        this.center.changeToNromal();
        this.center = ct;
        ct.changToCenter();
        //this.setPlayStar();
        // var ch = this.player.getComponent(Character);
        // //var len = ch.body.linearVelocity;
        // //ch.body.linearVelocity = cc.v2(0,0);
        // this.player.x+=ax;
        // this.player.y+=ay;
        // ct.node.addChild(this.player);
        //this.player.setParent(this.center.node);
        //ch.body.linearVelocity = len;

        //this.player.node.x+=ax;
        //this.player.node.y+=ay;
    }
    setPlayStar() {
        this.player.setParent(this.center.node);
        // if(this.player.nowStar)
        // {
        //     this.player.nowStar.node.setParent(this.center.node);
        // }
    }
    onDestroy() {
        SceneSystem._instance = null;
    }
}
