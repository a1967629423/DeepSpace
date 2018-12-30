import GameInit from "../GameInit";

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
export default class lowFrame extends cc.Component {
    @property(cc.Toggle)
    toggle:cc.Toggle = null;
    start()
    {
        if(this.toggle)
        {
            if(GameInit.rootDataSave.getDataFromNode<boolean>("lowFrame"))
            {
                this.toggle.isChecked = true;
            }
            else
            {
                this.toggle.isChecked = false;
            }
        }
    }
    Check()
    {
        if(this.toggle)
        {
            if(this.toggle.isChecked)
            {
                cc.game.setFrameRate(30);
                GameInit.rootDataSave.setDataToNode("lowFrame",true);
            }
            else
            {
                cc.game.setFrameRate(60);
                GameInit.rootDataSave.setDataToNode("lowFrame",false);
            }
        }
    }

    // update (dt) {}
}
