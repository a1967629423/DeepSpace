import DataSave from "./DataSave";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameInit extends cc.Component {

   // LIFE-CYCLE CALLBACKS:
   private static _instance: GameInit = null;
   public static get instance() {
      if (!this._instance)
      {
         if(cc.director.getScene())
         {
            var instanceNode = cc.find("System/GameInit");
            this._instance = instanceNode?instanceNode.getComponent(GameInit):null;
         }
      } 
      return this._instance;
   }
   public static GameEnd:string = "gameEnd";
   public static GameRestrt:string = "gameRestart";
   public static ChangeBackground:string = "changeBackground";
   public static StyleChangeComplete:string = "styleChangeComplete";
   public static Popstate:string = "popstate";
   public static Resize:string = "resize";
   public static rootNode:cc.Node = null;
   public static rootDataSave:DataSave = null;
   onLoad() {
      if(!GameInit.rootNode)
      {
         var root = new cc.Node("GameInitRoot");
         cc.game.addPersistRootNode(root);
         GameInit.rootDataSave = root.addComponent(DataSave);
         GameInit.rootNode = root;
      }
      //启动物理
      let physics = cc.director.getPhysicsManager();
      physics.enabled = true;
      physics = null;
      //cc.game.setFrameRate(40);
      cc.dynamicAtlasManager.enabled = false;
      let collis = cc.director.getCollisionManager();
      collis = null;
      //cc.game.setFrameRate(60);

   }
   ResizeFun: EventListenerOrEventListenerObject;
   start() {

      if(GameInit.rootDataSave.getDataFromNode(DataSave.inGame)){
         console.log("begin");
         setTimeout(() => { this.gameStart() }, 600);}
      this.ResizeFun = this.resize.bind(this)
      window.addEventListener("resize", this.ResizeFun);
      //var cm = cc.director.getCollisionManager();
      //cm.enabledDebugDraw = true;
      //cc.screen.autoFullScreen();

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

   gameRestart() {
      this.node.emit("gameEnd");
      this.node.emit("gameRestart");
      GameInit.rootNode.emit("gameEnd");
      GameInit.rootNode.emit("gameRestart");
   }
   gameClose() {
      this.node.emit("gameEnd");
      GameInit.rootNode.emit("gameEnd");
   }
   gameSceneChange() {
      this.node.emit("gameEnd");
      GameInit.rootNode.emit("gameEnd");
   }
   onDestroy() {
      this.node.emit("gameEnd");
      GameInit.rootNode.emit("gameEnd");
      window.removeEventListener("resize",this.ResizeFun);
      GameInit._instance = null;
   }
   //StartTime:number;
   public get StartTime():number
   {
      return GameInit.rootDataSave.getDataFromNode<number>("StartTime");
   }
   public set StartTime(val)
   {
      if(GameInit.rootDataSave.getDataFromNode("StartTime")!=val)GameInit.rootDataSave.setDataToNode("StartTime",val);
   }
   public get GameId():string
   {
      return GameInit.rootDataSave.getDataFromNode<string>("GameId");
   }
   public set GameId(val:string)
   {
      if(GameInit.rootDataSave.getDataFromNode("GameId")!=val)GameInit.rootDataSave.setDataToNode("GameId",val);
   }
   Debug = true;
   gameStart() {
      
      
      if(!this.Debug)
      {
         try {
            this.StartTime = GameServer.game_getTime();
            GameServer.game_start(this.StartTime,(res:{success:boolean,id:string,error:string})=>{
               if(res.success)
               {
                  this.GameId = res.id;
                  //if(GameInit.rootDataSave.getDataFromNode("GameId")!=res.id)GameInit.rootDataSave.setDataToNode("GameID",res.id);
                  this.node.emit("gameStart");
                  GameInit.rootNode.emit("gameStart");
               }
               else
               {
                  alert(res.error);
               }
            });
         } catch (error) {
            console.error(error)
            
         }
      }
      else
      {
         this.node.emit("gameStart");
         GameInit.rootNode.emit("gameStart");
      }


   }
   /**
    * 角色达到指定位置开始切换场景
    * @param node 消息发起者
    */
   changeBackground(node: cc.Node) {
      this.node.emit("changeBackground", node);
   }
   /**
    * 场景样式切换完毕
    * @param node 消息发起者
    */
   styleChangeComplete(node: cc.Node) {
      this.node.emit("styleChangeComplete", node);
   }
   popstate() {
      this.node.emit("popstate");
   }
   resize() {
      this.node.emit("resize");
   }

   // update (dt) {}
}
