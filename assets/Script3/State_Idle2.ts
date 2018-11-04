import GlobalTime from "../Script/Tools/GlobalTime";
import InputMask from "../Script/inputMask";
import CameraFx from "../Script/Tools/CameraFx";
import { CharacterState2 } from "./State2";
import CameraCanvas from "../Script/Tools/CameraCanvas";
import Until from "../Script/Tools/Until";
//闲置状态
//处理用户输入，
export default class State_Idle2 extends CharacterState2 {
    /**
     * 发射方向
     */
    lunch:cc.Vec2 = cc.v2(0,0);
    lunchTime:number = 0;
    localTouch:cc.Vec2 = cc.v2(0,0);
    gtouch:cc.Vec2 = cc.v2(0,0);

    /**
     * 选择发射方向的标识符
     */
    isLunch:boolean = false;
    isdrag:boolean = false;
    dpostition:cc.Vec2 = cc.v2(0,0);
    Start()
    {
        if(this.character.LunchCancle)
        {
            this.character.LunchCancle.active = false;
        }
        this.character.node.on(cc.Node.EventType.TOUCH_START,this.touchmove,this);
        this.character.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchmove,this);
        //test
        CameraFx.Instantiation.ControlCameraZoom();
        CameraFx.Instantiation.tageZoom = 0.5;
    }
    update(dt:number)
    {
        if(this.isLunch){
            this.lunchTime+=this.lunchTime<5?dt:0;
            if(this.character.engineBar)
            {
                this.character.engineBar.progress = this.lunchTime/5;
                CameraFx.Instantiation.tageZoom = Math.min(2-this.lunchTime/5*0.5,CameraFx.Instantiation.tageZoom);
            }
        }
        //若附着于Round则不能转状态
        if(this.character.nowStar&&!this.attachState){this.character.changeState(this.character.InStarState)}
        if(this.isdrag)
        {
            var touchchange = InputMask.Instantiation.getMoseWorldPosition().sub(this.gtouch);
            var worldp = this.character.node.getParent().convertToNodeSpaceAR(this.dpostition.add(touchchange));
            this.character.node.setPosition(worldp)
            
        }
    }
    
    private touchmove(touch:cc.Event.EventTouch)
    {
        // this.character.body.linearVelocity = cc.v2(0,0);

        // if(!this.isdrag)
        // {

        //     //this.dpostition = this.character.node.position;
        //     this.dpostition =  this.character.node.getParent().convertToWorldSpaceAR(this.character.node.position);
        //     this.gtouch = touch;
        //     this.isdrag = true;
        // }
        // if(this.character)
        // {
        //     this.gtouch = touch;

        //     // var touchchange = CameraCanvas.Instantiation.node.convertToWorldSpace(touch.getLocation()).sub(CameraCanvas.Instantiation.node.convertToWorldSpace(touch.getStartLocation()));  
        //     // this.isdrag = true;
        //     // var worldp = this.character.node.getParent().convertToNodeSpaceAR(this.dpostition.add(touchchange));

        //     // this.character.node.setPosition(worldp)

        // }
        
    }
    onTouch(v2:cc.Vec2)
    {
        // var Wp1 = this.character.node.getParent().convertToWorldSpaceAR(this.character.node.getPosition());
        // if(this.character.LunchCancle&&!this.character.LunchCancle.active)this.character.LunchCancle.active = true;
        // this.isLunch = true;
        // var fv2 = v2.mul(-1);
        // var ro =  fv2.signAngle(cc.v2(0,1))*180/3.14;
        // this.character.node.rotation = ro;
        // this.lunch = v2;
        // CameraFx.Instantiation.ControlCameraZoom();
        // //时间慢放
        // GlobalTime.Instantiation.speedTime = 0.2;

        if(Until.isTouch(this.character.node)&&!this.isdrag)
        {

            //this.dpostition = this.character.node.position;
            this.dpostition =  this.character.node.getParent().convertToWorldSpaceAR(this.character.node.position);
            this.gtouch = InputMask.Instantiation.getMoseWorldPosition();
            this.isdrag = true;
        }
    }
    onTouchLocal(v2:cc.Vec2)
    {
        this.localTouch = v2;
    }
    endTouch()
    {
        CameraFx.Instantiation.UnControlCameraZoom();
        this.isdrag = false;
        if(this.character.LunchCancle&&this.character.LunchCancle.active)this.character.LunchCancle.active = false;
        if(this.character.LunchCancle)
        {
            // var size = cc.v2(this.character.LunchCancle.getContentSize().width,this.character.LunchCancle.getContentSize().height);
            // //因为屏幕会缩放所以要调整
            // size.mulSelf(InputMask.Instantiation.zoom);
            // var touch = this.localTouch.clone();
            // //先将目标转换到世界坐标
            // var cw = this.character.LunchCancle.getParent().convertToWorldSpaceAR(this.character.LunchCancle.getPosition());
            // //因为UI层相对屏幕静止，所以可以将触摸点看成UI层中的点
            // var cw1 = this.character.LunchCancle.getParent().convertToWorldSpace(touch)
            // var sub = cw1.sub(cw);
            // if(sub.x>0&&sub.y>0&&sub.y<size.y&&sub.x<size.x)
            // {
            //     this.isLunch = false;
            // }
            this.isLunch = !Until.isTouch(this.character.LunchCancle);
        }
        //如果移动到取消位置
        //isLunch = false
        if(this.isLunch)
        {
            //应用发射力度
            //this.character.lunchTime = this.lunchTime
            this.character.lunchTime = 1;
            this.lunch = InputMask.Instantiation.getMoseWorldPosition().sub(this.gtouch).normalize();
            this.character.dv2 = this.lunch.neg().normalize().mul(200);
            this.character.changeState(this.character.LunchState);
        }
        //恢复
        GlobalTime.Instantiation.speedTime = 1;
        this.lunchTime = 0;
        this.character.engineBar.progress = this.lunchTime;
    }
    Quit()
    {
        super.Quit();
        this.character.node.off(cc.Node.EventType.TOUCH_START,this.touchmove,this);
        this.character.node.off(cc.Node.EventType.TOUCH_MOVE,this.touchmove,this);
        this.isLunch = false;
        this.isdrag = false;
        this.lunchTime = 0;
        this.lunch = cc.v2(0,0);
        this.localTouch = cc.v2(0,0);
        if(this.character.engineBar)
        {
            this.character.engineBar.progress = 0;
        }
    }
}
