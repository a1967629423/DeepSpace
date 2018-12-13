import InputMask from "../inputMask";
import CameraFx from "./CameraFx";

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
export default class Until extends cc.Component {

    public static CreateZeroMat4():cc.Mat4
    {
        return new cc.mat4(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    }
    public static CreateUnitMat4(out:cc.Mat4):cc.Mat4
    {
        return new cc.mat4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
    }
    public static GetTranslate(sourceNode:cc.Node,tagerNode:cc.Node,trans:cc.Vec3)
    {
        var tp = tagerNode.getParent();
        var s = sourceNode;
        var v3:cc.Vec3 = new cc.Vec3();
        var mat4:cc.Mat4 = this.CreateZeroMat4();
        while(s.getParent()!= tp)
        {
            

            s = s.getParent();
            
        }
        s.getLocalMatrix(mat4);
        mat4.getTranslation(v3);
        if(v3)
        {
            trans.x+=v3.x;
            trans.y+=v3.y;
            trans.z+=v3.z;
        }
    }
    /**
     *检测目标node是否被点击，在有InputMask的情况下 
     * @param tager 目标node
     */
    public static isTouch(tager:cc.Node):boolean
    {
        var mworld = InputMask.Instantiation.getMoseWorldPosition();
        var tworld = tager.getParent().convertToWorldSpaceAR(tager.getPosition());

        var size = cc.v2(tager.getContentSize().width,tager.getContentSize().height);
        size.mulSelf(1/cc.Camera.findCamera(tager).zoomRatio);
        var ax = tager.anchorX*size.x;
        var ay = tager.anchorY*size.y;
        var sub = tworld.sub(mworld);
        return sub.x>ax-size.x&&sub.y>ay-size.y&&sub.x<ax&&sub.y<ay;

    }
    private static _viewRect = null;
    static get ViewRect():cc.Rect
    {
        if(!this._viewRect)this._viewRect = cc.rect(0,0,cc.winSize.height,cc.winSize.width);
        return this._viewRect;
    }
    public static inView(Camera:cc.Camera,obrect:cc.Rect):boolean
    {
        var CameraViewRect = this.ViewRect;
        //CameraViewRect.center = Camera.node.getParent().convertToWorldSpaceAR(Camera.node.position);
        //相机本来就是相对于世界中心
        CameraViewRect.center = Camera.node.position;
        return CameraViewRect.intersects(obrect);
    }
    public static isValid(node:cc.Node,sw:boolean = false)
    {
        if(!node.getParent())return false;
        return cc.isValid(node,sw);
    }
}

