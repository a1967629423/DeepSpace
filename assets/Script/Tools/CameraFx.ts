import Until from "./Until";
import GlobalTime, { CoroutinesType } from "./GlobalTime";
import Character from "../Character";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraFx extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Camera)
    tagerCamera: cc.Camera = null;
    @property(cc.Node)
    traceTager: cc.Node = null;
    @property(cc.Vec2)
    roundMin: cc.Vec2 = cc.v2(0, 0);
    @property(cc.Vec2)
    roundMax: cc.Vec2 = cc.v2(0, 0);
    @property
    goforward: boolean = false;
    @property
    setRound: boolean = false;
    @property
    setZoom: boolean = false;
    @property
    zoomSmooth: number = 0.6;
    @property
    zoomExtent: number = 10;
    @property(cc.Vec2)
    zoomRang: cc.Vec2 = cc.v2(1.5, 0.6);
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    tageZoom: number = 1;
    private Controlled: boolean = false;
    private traceBody:cc.RigidBody = null;
    start() {
        var _this = this;
        GlobalTime.Instantiation.Coroutines((function* () {
            while (_this.traceTager != null && !_this.Controlled) {
            var body: cc.RigidBody = null;
            body = _this.traceTager.getComponent(Character).body;
            if (body) {
                var vect2 = body.linearVelocity;

                _this.tageZoom = Math.max(Math.min(Math.abs(1 / (vect2.mag() / _this.zoomExtent)), _this.zoomRang.x), _this.zoomRang.y);
                //this.tagerCamera.zoomRatio= 1/(vect2.mag()/100)
            }
                yield CoroutinesType.SleepTime(0.2);
            }

        })())
        var ch = this.traceTager.getComponent(Character);
        this.traceBody = ch.body;
    }
    private static _instantiation: CameraFx = null;
    public static get Instantiation(): CameraFx {
        if (!this._instantiation) { this._instantiation = cc.find("Canvas/Main Camera").getComponent(CameraFx) }
        return this._instantiation;

    }
    update(dt) {
        if (this.traceTager != null && this.tagerCamera != null) {
            //调后追踪的任务优先级
            var tagerVect = this.traceTager.getParent().convertToWorldSpaceAR(this.traceTager.position);
            //this.traceTager.getParent().getLocalMatrix(mat4);
            //mat4.getTranslation(vect3);
            //var trans = this.traceTager.getParent().getNodeToParentTransform();
            //cc.AffineTransform.transformVec2(tagerVect,tagerVect,trans);
            var cameraVect = this.tagerCamera.node.getParent().convertToWorldSpaceAR(this.tagerCamera.node.position);
            var move = cc.v2(this.tagerCamera.node.x + ((tagerVect.x - cameraVect.x) * 2 * dt), this.tagerCamera.node.y + ((tagerVect.y - cameraVect.y) * 2 * dt));
            if (this.setRound) move.clampf(this.roundMin, this.roundMax);
            if (this.goforward && move.y < this.tagerCamera.node.position.y) {
                move.y = this.tagerCamera.node.position.y;
            }
            // newVector.x = cameraVect.x + ((tagerVect.x + vect3.x - cameraVect.x) * 2 * dt);
            // newVector.y = cameraVect.y + ((tagerVect.y + vect3.y - cameraVect.y) * 2 * dt);
            this.tagerCamera.node.position = move;


            if (!this.Controlled) {

                //     //this.tagerCamera.zoomRatio += dt*2;
                //     var body:cc.RigidBody = null;
                //     body = this.traceTager.getComponent(cc.RigidBody);
                //     if(body)
                //     {
                //         var vect2 = cc.v2(0,0);
                //         body.getLinearVelocityFromWorldPoint(cc.v2(50,50),vect2);
                //         this.tageZoom = Math.max(Math.min(Math.abs(1/(vect2.mag()/100)),2),0.5); 
                //         //this.tagerCamera.zoomRatio= 1/(vect2.mag()/100)
                //     }
                // }
                if (this.setZoom) {
                    setTimeout(() => { this.tagerCamera.zoomRatio += (this.tageZoom - this.tagerCamera.zoomRatio) * this.zoomSmooth * dt });
                }

                // //console.log(this.tagerCamera.zoomRatio)
            }
        }


    }
    ControlCameraZoom() {
        this.Controlled = true;
    }
    UnControlCameraZoom() {
        this.Controlled = false;
    }
}
