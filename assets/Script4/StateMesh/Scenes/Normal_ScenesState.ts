import ScenesState from "./ScenesState";
import DieWall from "../../DieWall";
import Wall, { WallType } from "../../Wall";
import DieObjectManage from "../../Manage/DieObjectManage";
import PropManage from "../../Manage/PropManage";
import GameInit from "../../../Script/GameInit";
import GlobalTime, { CoroutinesType } from "../../../Script/Tools/GlobalTime";
import AssetsSystem from "../../../Script/System/AssestSystem";

export default class Normal_ScenesState extends ScenesState {
    wallCreatP: number = 0.8;

    Start() {
        GameInit.instance.node.on("changeBackground", this.changeToChangeState, this);
    }
    changeToChangeState() {
        GameInit.instance.node.off("changeBackground", this.changeToChangeState, this);
        if(this.context.nowState!=this.context.ChangeState)this.context.changeState(this.context.ChangeState);

    }
    createDieWall(wallGroup: cc.Node) {
        var _dieWall;

        //if(!this.context.dieWallInstance)this.context.dieWallInstance = cc.instantiate(_dieWall)
        GlobalTime.Instantiation.Coroutines((function*(_t){
            yield CoroutinesType.SleepTime(0.2);
            (function(){
                for (var i = 0; i < 10; i++) {
                    var c = Math.random()
                    if (c > this.wallCreatP) {
                        _dieWall = AssetsSystem.instance.getAssest(AssetsSystem.instance.nowGroup, "dieWall");
                        if (_dieWall) {
                            var random = Math.random();
                            var wall = _dieWall;
                            wall.setAnchorPoint(cc.v2(0, 0));
        
                            var addWidth = this.context.dieWallWidthRang * Math.random();
                            wall.width += addWidth;
                            var box = wall.getComponent(cc.PhysicsBoxCollider);
                            box.size.width += addWidth;
                            box.offset =
                                cc.v2(wall.getContentSize().width / 2, wall.getContentSize().height / 2);
                            if (random > 0.5) {
                                wall.position = cc.v2(0, i * 200);
                                wall.getComponent(DieWall).Type = WallType.Left;
                                random = Math.random();
                                if (random > 0.8) {
                                    var twall = this.context.getAssest(this.context.nowGroup, "dieWall");
                                    if (twall) {
                                        var tbox = twall.getComponent(cc.PhysicsBoxCollider);
                                        tbox.size.width += this.context.dieWallWidthRang * Math.random();
                                        tbox.offset =
                                            cc.v2(twall.getContentSize().width / 2, twall.getContentSize().height / 2);
                                        twall.position = cc.v2(this.context.wallWidth - twall.width, 100 + i * 200);
                                        twall.getComponent(DieWall).Type = WallType.Right;
                                        //延迟添加
                                        GlobalTime.Instantiation.Coroutines(function* (w, g) {
                                            yield CoroutinesType.SleepFrame(12);
                                            g.addChild(w);
                                            w.active = true;
                                        }(twall, wallGroup))
                                    }
                                }
                            }
                            else {
                                wall.position = cc.v2(this.context.wallWidth - wall.width, i * 200);
                                wall.getComponent(DieWall).Type = WallType.Right;
                            }
                            //延迟添加
                            GlobalTime.Instantiation.Coroutines(function* (w, g) {
                                yield CoroutinesType.SleepFrame(8);
                                if (w.getParent()) debugger;
                                g.addChild(w);
                                w.active = true;
                            }(wall, wallGroup))
                        }
                        else
                        {
                            debugger;
                        }
                    }
                }
            }).bind(_t)();
        })(this))
    }

    update() {
        if (this.context.player) {
            this.wallCreatP = Math.max(0.8 - (this.context.player.y / 30000), 0.3);
        }

    }
    createWall(wallGroup: cc.Node) {
        var wallL = this.context.getAssest(this.context.nowGroup, "wall");
        var wallR = this.context.getAssest(this.context.nowGroup, "wall");
        if (wallL && wallR) {
            var left = wallL;
            var right = wallR;
            left.x = this.context.lX;
            left.getComponent(Wall).Type = WallType.Left;
            left.anchorX = 1;
            var lbox = left.getComponent(cc.PhysicsBoxCollider);
            lbox.offset.x = Math.abs(lbox.offset.x) * -1;
            right.getComponent(Wall).Type = WallType.Right;
            right.x = this.context.rX;
            right.anchorX = 0;
            var rbox = right.getComponent(cc.PhysicsBoxCollider);
            rbox.offset.x = Math.abs(rbox.offset.x);
            GlobalTime.Instantiation.Coroutines((function* (l, w) {
                yield CoroutinesType.SleepTime(1);
                w.addChild(l);
                setTimeout(() => {
                    //延迟重置位置
                    l.y = 0;
                })
                left.active = true;
            })(left, wallGroup));
            GlobalTime.Instantiation.Coroutines((function* (r, w) {
                yield CoroutinesType.SleepTime(0.5);
                w.addChild(right);
                setTimeout(() => {
                    //延迟重置位置
                    r.y = 0;
                })
                right.active = true;
            })(right, wallGroup));
        }

    }
    createDieObjectManage(Group: cc.Node) {
        var dieManage = new cc.Node();
        dieManage.x = this.context.lX;
        dieManage.y = this.context.nowCreateBackground.node.height;
        var obm = dieManage.addComponent(DieObjectManage);
        //obm.ObjectPerfab = this.context.getAssest(this.context.nowGroup,"dieObject");
        obm.background = this.context.nowCreateBackground;
        obm.generateHeight = 2000;
        obm.generateNumber = 3;
        obm.generateMaxCout = 2;
        obm.generateTime = 2;
        dieManage.setParent(Group);
    }
    createPropManage(Group: cc.Node) {
        var pm = new cc.Node();
        pm.x = this.context.lX;
        var om = pm.addComponent(PropManage);
        //om.ObjectPerfab = this.context.getAssest(this.context.nowGroup,"prop");
        om.generateNumber = 5;
        pm.setParent(Group);
    }

}
