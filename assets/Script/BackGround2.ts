import GlobalTime, { CoroutinesType } from "./Tools/GlobalTime";
import Until from "./Tools/Until";
import PoolObject from "../Script4/PoolObject";

const {ccclass, property} = cc._decorator;
@ccclass
export default class BackGround2 extends PoolObject {
    
    @property(cc.Label)
    label: cc.Label = null;
    @property({visible:false})
    ground:BackGround2[] =  Array<BackGround2>(9);
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    changeNormal:boolean = false;
    ca:cc.Camera;
    start () {
        super.start();
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
            while(Until.inView(cc.rect(_this.node.x,_this.node.y,2000,2000)))
            {
                yield CoroutinesType.second;
            }
            yield CoroutinesType.SleepTime(0.4);
            console.log("background to destory");
            //每次循环一半
            var poolobj = _this.getComponentsInChildren(PoolObject);
            GlobalTime.Instantiation.Coroutines((function*(){
                for(var key in poolobj)
                {
                    yield CoroutinesType.SleepTime(0.2);
                    if(poolobj[key]!==_this)poolobj[key].destroy();
                }
                poolobj = null;
                yield CoroutinesType.SleepTime(0.2);
                _this.destroy();
                _this = null;
            })());

        })());
    }
    unuse()
    {
        this.ground.length = 0;
    }
    onDestroy()
    {
        this.ground = null;
    }
    destroy():boolean
    {
        var result = super.destroy();
        if(this.node.childrenCount>0)
        {
            //debugger;
            //有可能会删除不干净
            // this.node.getComponentsInChildren(PoolObject).forEach((val)=>{
            //     if(val!==this)val.destroy();
            // })
            this.node.removeAllChildren()
        }
        if(this.node.parent)
        {
            this.node.removeFromParent(true);
        }
        return result;
    }

    // update (dt) {}
}