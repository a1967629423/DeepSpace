import GlobalTime, { CoroutinesType } from "./Tools/GlobalTime";
import Until from "./Tools/Until";
import PorpObject from "../Script4/PropObject";
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
            console.log("background to destory");
            //先等上面的墙壁生成完毕
            yield CoroutinesType.SleepTime(1.6);
            //每次循环一半
            var wallArr = _this.getComponentsInChildren("Wall");
            var propArr = _this.getComponentsInChildren(PorpObject);
            var wi = 0;
            var pi = 0;
            var halfWi = wallArr.length/2;
            var halfPi = propArr.length/2;
            cc.director.once(cc.Director.EVENT_AFTER_DRAW,()=>{
                for(;wi<halfWi;wi++)
                {
                    wallArr[wi].destroy();
                }
                for(;pi<halfPi;pi++)
                {
                    propArr[pi].destroy();
                }
            });
            //等一会
            yield CoroutinesType.SleepTime(0.2);
            cc.director.once(cc.Director.EVENT_AFTER_DRAW,()=>{
                for(;wi<wallArr.length;wi++)
                {
                    wallArr[wi].destroy();
                }
                for(;pi<propArr.length;pi++)
                {
                    propArr[pi].destroy();
                }
            })
            //最后销毁
            yield CoroutinesType.SleepTime(0.3);
            _this.node.destroy();
        })());
    }
    onDestroy()
    {
        this.ground = null;
    }

    // update (dt) {}
}