import GlobalTime, { CoroutinesType } from "../../Script/Tools/GlobalTime";
import AssetsName from "../../Script/Tools/AssetsName";
import AssetsSystem from "../../Script/System/AssestSystem";
import PoolObject from "../PoolObject";

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
export default class Creator extends PoolObject {
    @property({ step: 1 })
    generateNumber: number = 0;
    assestconf:AssetsName = null;
    protected prefab_ins: cc.Node;
    protected childNumber: number = 0;
    fenshu:number = 1.0;
    start()
    {
        super.start();
        this.assestconf = this.getComponent(AssetsName);   
    }
    reuse()
    {
        if (this.generateNumber > 0) {
            this.Init();
            this.childNumber = this.generateNumber;
            GlobalTime.Instantiation.Coroutines((function*(_t){
                for (var i = 0; i < _t.generateNumber; i++) {
                    yield CoroutinesType.SleepTime(0.3);
                    (function(){
                        this.generateObject(i);
                    }).bind(_t)();
                }
            })(this))

        }
        else {
            this.node.destroy();
        }
    }
    Init()
    {

    }
    generateObject(i: number):cc.Node
    {
        return null;
    }
    childDestroy() {
        this.childNumber--;
        if (this.childNumber <= 0) {
            if(cc.isValid(this.node))
            {
                
                this.destroy();
            }
        }
    }
    onDestroy()
    {
        this.prefab_ins = null;
    }
}
