import Ajax from "./Tools/Web/Ajax";
import AddCoookie from "./Tools/Cookie/AddCookie";

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
        //cc.game.setFrameRate(40);
        cc.dynamicAtlasManager.enabled = false;
        //cc.game.setFrameRate(60);
        
     }
     start()
     {
        setTimeout(()=>{this.gameStart()},600);
      //   let cookie = AddCoookie.Get();
      //   if(!cookie["_playerName"])
      //   {
      //      let name = prompt("你的游戏名字？");
      //      AddCoookie.Add({_playerName:name});
      //   }
      //   Ajax.Get('http://shimmer.neusoft.edu.cn/wechat/web/api/me',{}).then((value)=>{
      //      var result = JSON.parse(value);
      //      while(typeof result === "string")result = JSON.parse(result);
      //      let name = result['id'];
      //      AddCoookie.Add({_playerName:name});
      //   });
        //AddCoookie.Add({palyeName:"deng"});
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
     gameStart()
     {
        this.node.emit("gameStart");
     }
     /**
      * 角色达到指定位置开始切换场景
      * @param node 消息发起者
      */
     changeBackground(node:cc.Node)
     {
        this.node.emit("changeBackground",node);
     }
     /**
      * 场景样式切换完毕
      * @param node 消息发起者
      */
     styleChangeComplete(node:cc.Node)
     {
        this.node.emit("styleChangeComplete",node);
     }

    // update (dt) {}
}
