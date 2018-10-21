import Until from "./Until";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraFx extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Camera)
    tagerCamera:cc.Camera = null;
    @property(cc.Node)
    traceTager:cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    tageZoom:number = 1;
    start () {

    }

     update (dt) {
         if(this.traceTager != null&&this.tagerCamera!=null)
         {
            var newVector:cc.Vec2 = new cc.Vec2();
            var tagerVect = this.traceTager.position;
            let mat4:cc.Mat4 = Until.CreateZeroMat4();
            let vect3:cc.Vec3 = new cc.Vec3(0,0,0);
            Until.GetTranslate(this.traceTager,this.tagerCamera.node,vect3);
            //this.traceTager.getParent().getLocalMatrix(mat4);
            //mat4.getTranslation(vect3);
            //var trans = this.traceTager.getParent().getNodeToParentTransform();
            //cc.AffineTransform.transformVec2(tagerVect,tagerVect,trans);
            var cameraVect = this.tagerCamera.node.position;
            newVector.x = cameraVect.x+((tagerVect.x+vect3.x-cameraVect.x)*2*dt);
            newVector.y = cameraVect.y+((tagerVect.y+vect3.y-cameraVect.y)*2*dt);
            this.tagerCamera.node.position = newVector;
            //this.tagerCamera.zoomRatio += dt*2;
            var body:cc.RigidBody = null;
            body = this.traceTager.getComponent(cc.RigidBody);
            if(body)
            {
                var vect2 = cc.v2(0,0);
                body.getLinearVelocityFromWorldPoint(cc.v2(50,50),vect2);
                this.tageZoom = Math.max(Math.min(Math.abs(1/(vect2.mag()/100)),2),0.5); 
                //this.tagerCamera.zoomRatio= 1/(vect2.mag()/100)
            }
            this.tagerCamera.zoomRatio += (this.tageZoom- this.tagerCamera.zoomRatio)*0.1;
            //console.log(this.tagerCamera.zoomRatio)
         }

     }
}