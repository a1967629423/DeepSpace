
const {ccclass, property} = cc._decorator;

@ccclass
export default class DestroyIt extends cc.Component {
    @property(cc.Node)
    target:cc.Node = null;
    @property
    timeOutSecond:number = 1.0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    Run()
    {
        if(this.target)
        {
            setTimeout((function(t){
                return function(){
                    if(t)
                    {
                        t.destroy();
                    }
                }
            })(this.target),this.timeOutSecond*1000)
        }
    }

    // update (dt) {}
}
