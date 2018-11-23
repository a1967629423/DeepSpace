import GlobalTime, { CoroutinesType } from "./Tools/GlobalTime";
import Until from "./Tools/Until";

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
//实现背景图变化接口
//实现无限大功能
@ccclass
export default class BackGround2 extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property({visible:false})
    ground:BackGround2[] =  Array<BackGround2>(9);
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    changeNormal:boolean = false;
    ca:cc.Camera;
    start () {
        this.node.zIndex = 5;
        this.ca = cc.Camera.findCamera(this.node);
    }
    backgroundChange()
    {
        
    }
    changToCenter()
    {
        this.node.emit("changeToCenter",this);
    }
    update(dt)
    {
        // if(Until.inView(cc.Camera.findCamera(this.node),this.node))
        // {
        //     console.log("BackGroundRe");
        //     this.destroy();
        // }
    }
    changeToNromal()
    {
        this.changeNormal = true;
         var _this = this;
        
        GlobalTime.Instantiation.Coroutines((function*(){
            while(Until.inView(_this.ca,cc.rect(_this.node.x,_this.node.y,2000,2000)))
            {
                yield CoroutinesType.second;
            }
            console.log("backggroundre");
            _this.node.destroy();
        })())
    }

    // update (dt) {}
}
