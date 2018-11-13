import Character,{ITouchEvent} from "./Character";

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
//用于捕获输入的类
@ccclass
export default class InputMask extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Canvas)
    canvas:cc.Canvas = null;
    @property(Character)
    player:Character = null;
    @property(cc.Node)
    controlPoint:cc.Node = null;
    private _zoom:number = 0;
    
    public get zoom() : number {
        return this._zoom;
    }
    
    // LIFE-CYCLE CALLBACKS:
    isTouch:boolean = false;
    TouchPosition:cc.Vec2 = cc.v2(0,0);
    private EndMessing:boolean = false;
    private static _Instantiation:InputMask = null;
    
    public static get Instantiation() : InputMask {
        if(!this._Instantiation)this._Instantiation = cc.find("Canvas/Main Camera/inputMask").getComponent(InputMask);
        return this._Instantiation;
    }
    private static clearInstantiation()
    {
        this._Instantiation = null;
    }
    
     onLoad () {
        if(this.canvas)
        {
            this.node.width = cc.winSize.width
            this.node.height = cc.winSize.height;
        }

     }

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchFun,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchFun,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.endTouchFun,this);
        
    }
    touchFun(touchEvent:cc.Event.EventTouch)
    {
        this.isTouch = true;
        this.EndMessing = false;
        this.TouchPosition = touchEvent.getLocation();
        
    }
    endTouchFun()
    {
        this.isTouch = false;
    }
     mainCamera:cc.Camera = null;
     update (dt:Number) 
     {
         //缩放mask防止修改camerazoom导致mask过小
         var ov2 = cc.v2(this.node.getContentSize().width,this.node.getContentSize().height);
         if(!this.mainCamera){this.mainCamera = cc.Camera.findCamera(this.node);}
         if(this.controlPoint)
         {
            this.controlPoint.convertToWorldSpace(this.controlPoint.position);
            this.mainCamera.getWorldToCameraPoint(this.controlPoint.convertToWorldSpace(this.controlPoint.position),ov2);
         }
         //对zoomRatio取反
         var m = (1/this.mainCamera.zoomRatio);
         this._zoom = m;
         this.node.scaleX =  m;
         this.node.scaleY =  m;
         m = null;
         if(this.player)
         {
            if(this.isTouch)
            {
               this.player.onTouchLocal(this.TouchPosition);
               this.player.onTouchV2(this.TouchPosition.sub(ov2).mulSelf(0.5));
            }
            else if(!this.EndMessing)
            {
                this.EndMessing = true;
                this.player.endTouch();
            }
         }

     }
     getMoseWorldPosition():cc.Vec2
     {
        return this.node.convertToWorldSpace(this.TouchPosition);
     }
     //重新开始游戏时需要清空实例
     onDestroy()
     {
        this.node.off(cc.Node.EventType.TOUCH_START,this.touchFun,this)
        this.node.off(cc.Node.EventType.TOUCH_MOVE,this.touchFun,this)
        this.node.off(cc.Node.EventType.TOUCH_END,this.endTouchFun,this)
        InputMask.clearInstantiation(); 
     }
}
