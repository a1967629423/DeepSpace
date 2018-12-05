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
export default class ButtonChangeText extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text1: string = 'hello';
    @property
    text2: string = "hi";
    // @property([cc.Component.EventHandler])
    // event:cc.Component.EventHandler[] = [];
    sw:boolean = true;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    Run()
    {
        if(this.label!=null)
        {
            if(this.sw)
            this.label.string = this.text2;
            else
            this.label.string = this.text1;
            this.sw = !this.sw;
        }
    }

    // update (dt) {}
}
