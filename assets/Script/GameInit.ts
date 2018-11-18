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
export default class GameInit extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    private static _instance:GameInit = null;
    public static get instance()
    {
        if(!this._instance)this._instance = cc.find("System/GameInit").getComponent(GameInit);
        return this._instance;
    }
     onLoad () {
         //启动物理
        cc.director.getPhysicsManager().enabled = true;
        //cc.game.setFrameRate(60);
        
     }
     gameRestart()
     {
         this.node.emit("gameEnd");
         this.node.emit("gameRestart");
     }
     gameClose()
     {
         this.node.emit("gameEnd");
     }
     gameSceneChange()
     {
         this.node.emit("gameEnd");
     }
     onDestroy()
     {
         this.node.emit("gameEnd");
         GameInit._instance = null;
     }

    // update (dt) {}
}
