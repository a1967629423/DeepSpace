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
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    tage:cc.Node = null;
    @property(cc.Node)
    play:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    ctage:cc.Node = null;
    ctage1:cc.Node = null;
    _v:number = 0;
    _u:number = 0;
    private ctagevec:cc.Vec2 = cc.v2(0,0);
    private tagevec:cc.Vec2 = cc.v2(0,0);
    //缩放减少比例
    private parent:cc.Node = null;
    start () {
        if(this.tage)
        {
            this.ctage = cc.instantiate(this.tage);
            this.ctage1 = cc.instantiate(this.tage);
            this.parent = this.tage.getParent();
            this.parent.addChild(this.ctage);
            this.parent.addChild(this.ctage1);
            this.ctage.y = this.tage.y-this.tage.height;
            this.ctage1.y = this.tage.y+this.tage.height;
            this.ctagevec = this.ctage.position;
            this.tagevec = this.tage.position;
        }
    }

    update (dt) {
        this.parent.y = this._v%this.tage.height;
        this.parent.x = Math.max(Math.min(this._u,this.tage.width/2) ,-this.tage.width/2);
        this._v =-this.play.y*0.2;
        this._u = -this.play.x*0.2;
    }
}
