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
        if (this.context.nowState != this.context.ChangeState) this.context.changeState(this.context.ChangeState);

    }
    createDieWall(wallGroup: cc.Node) {
        var _dieWall;
        
        //if(!this.context.dieWallInstance)this.context.dieWallInstance = cc.instantiate(_dieWall)
        GlobalTime.Instantiation.Coroutines((function* (_t) {
            yield CoroutinesType.SleepTime(0.4);
            var spes:boolean = false;
            for (var i = 0; i < 9; i++) {
                var c = Math.random()
                if (c > _t.wallCreatP) {
                    yield CoroutinesType.SleepTime(0.5);
                    (function(){
                        _dieWall = AssetsSystem.instance.getAssest(AssetsSystem.instance.nowGroup, "dieWall");
                       
                        if (_dieWall) {
                            var random = Math.random();
                            var wall:cc.Node = _dieWall;
                            wall.setAnchorPoint(cc.v2(1, 0));
                            
                            var addWidth = this.context.dieWallWidthRang * Math.random();
                            wall.width =120+ addWidth;
                            var box = wall.getComponent(cc.PhysicsBoxCollider);
                            box.size.width = 120+ addWidth;
                            box.offset.x = box.size.width/2;
                            box.enabled = true;
                            //box.offset =
                            //    cc.v2(wall.getContentSize().width / 2, wall.getContentSize().height / 2);
                            var height = 100+ i * 220;
                            if (random > 0.5) {
                                if(spes)spes=!spes;
                                wall.scaleX=-1;
                                var height = 100+ i * 220;

                                wall.position = cc.v2(0,height);
                                wall.getComponent(DieWall).Type = WallType.Left;

                                random = Math.random();
                                if (random > 0.8&&!spes) {
                                    var twall:cc.Node = this.context.getAssest(this.context.nowGroup, "dieWall");
                                    if (twall) {
                                        var tbox = twall.getComponent(cc.PhysicsBoxCollider);
                                        var add = this.context.dieWallWidthRang * Math.random();

                                        twall.width = 120+add;
                                        tbox.size.width = 120+ add;

                                        tbox.enabled = true;
                                        tbox.offset.x = tbox.size.width/2*-1;
                                       // tbox.offset =
                                            //cc.v2(twall.getContentSize().width / 2, twall.getContentSize().height / 2);
                                        twall.position = cc.v2(this.context.wallWidth, height+100);
                                        twall.getComponent(DieWall).Type = WallType.Right;
                                        //延迟添加
                                        wallGroup.addChild(twall);
                                        twall.scaleX =1;
                                        twall.active = true;
                                        spes = true;
                                        
                                        // GlobalTime.Instantiation.Coroutines(function* (w, g) {
                                        //     yield CoroutinesType.SleepFrame(12);
                                        //     g.addChild(w);
                                        //     w.active = true;
                                        // }(twall, wallGroup))
                                    }
                                }
                            }
                            else {
                                wall.position = cc.v2(this.context.wallWidth,height);
                                wall.getComponent(DieWall).Type = WallType.Right;
                                wall.scaleX = 1;
                                box.offset.x = box.size.width/2*-1;
                            }
                            wallGroup.addChild(wall);
                            wall.active = true;
                            // GlobalTime.Instantiation.Coroutines(function* (w, g) {
                            //     yield CoroutinesType.SleepFrame(8);
                            //     if (w.getParent()) debugger;
                            //     g.addChild(w);
                            //     w.active = true;
                            // }(wall, wallGroup))
                        }
                        else {
                           // debugger;
                        }
                    }).bind(_t)();
                }
            }
        })(this))
    }

    update() {
        if(this.context.player)
        this.wallCreatP = 1-(0.4+(Math.abs(this.context.player.y)/30000)%0.6);

    }
    createWall(wallGroup: cc.Node) {
        var wallL = this.context.getAssest(AssetsSystem.instance.nowGroup, "wall");
        var wallR = this.context.getAssest(AssetsSystem.instance.nowGroup, "wall");
        
        if (wallL && wallR) {
            var left = wallL;
            var right = wallR;
            left.x = this.context.lX;
            left.getComponent(Wall).Type = WallType.Left;
            left.anchorX = 1;
            var lbox = left.getComponent(cc.PhysicsBoxCollider);
            lbox.enabled = true;
            lbox.offset.x = Math.abs(lbox.offset.x) * -1;
            right.getComponent(Wall).Type = WallType.Right;
            right.x = this.context.rX;
            right.anchorX = 0;
            var rbox = right.getComponent(cc.PhysicsBoxCollider);
            rbox.offset.x = Math.abs(rbox.offset.x);
            rbox.enabled = true;
            GlobalTime.Instantiation.Coroutines((function* (l, w) {
                yield CoroutinesType.SleepTime(1.5);
                w.addChild(l);
                setTimeout(() => {
                    //延迟重置位置
                    l.y = 0;
                })
                left.active = true;
            })(left, wallGroup));
            GlobalTime.Instantiation.Coroutines((function* (r, w) {
                yield CoroutinesType.SleepTime(0.2);
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
        obm.fenshu = Math.abs(this.context.player.y)/10;
        dieManage.setParent(Group);
    }
    createPropManage(Group: cc.Node) {
        //池化
        var pm = AssetsSystem.instance.getAssest("Normal","propManage");
        pm.x = this.context.lX;
        var om = pm.getComponent(PropManage);
        //om.ObjectPerfab = this.context.getAssest(this.context.nowGroup,"prop");
        om.generateNumber = 5;
        Group.addChild(pm);
        //setTimeout(()=>{om.Run()});
    }

}
