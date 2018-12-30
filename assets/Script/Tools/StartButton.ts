import ChangeBackground from "./ChangeBackground";
import ScenesChange from "./ScenesChange";
import GameInit from "../GameInit";
import DataSave from "../DataSave";

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
export default class StartButton extends cc.Component {
    @property(ScenesChange)
    chang:ScenesChange = null;
    onClick()
    {
        if(!GameInit.instance.Debug)
        {
            if(this.chang)
            {
                GameServer.game_init((res:{success:boolean,error:string})=>{
                    if(res.success)
                    {
                        this.changeScenes();
                    }
                    else
                    {
                        alert(res.error);
                    }
                })
            }
        }
        else
        {
            this.changeScenes();
        }

    }
    changeScenes()
    {
        if(!DataSave.getDataFromLocal("firstGame"))
        {
            this.chang.tagerScenes = "gameGrade";
            DataSave.setDataToLocal("firstGame","true");
            this.chang.change(null);
        }
        else
        {
            GameInit.rootDataSave.setDataToNode(DataSave.inGame,true);
            this.chang.change(null);
        }
    }

    // update (dt) {}
}
