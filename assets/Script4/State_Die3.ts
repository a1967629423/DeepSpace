import CharacterState3 from "./State3";
import CameraFx from "../Script/Tools/CameraFx";
import SceneSystem2 from "./SceneSystem2";
import Ajax from "../Script/Tools/Web/Ajax";
import GradeManage from "../Script/GradeManage";
import DataSave from "../Script/DataSave";
import GameInit from "../Script/GameInit";
import GameWeb from "../Script/Tools/Web/GameWeb";

export default class State_Die3 extends CharacterState3 {
    Start()
    {
        console.log("change Die");
        CameraFx.Instantiation.traceTager = null;
        SceneSystem2.Instance.player = null;
        this.character.exist = false;
        setTimeout(()=>{
            this.character.destroy();
            this.character.node.destroy();
        },2000)
        setTimeout(()=>{
            var ng = GradeManage.instance.nowGrade.toFixed(0);
            if(!GameInit.instance.Debug)
            GameWeb.GameEnd(Number.parseInt(GameInit.instance.GameId),GameInit.instance.StartTime,GameServer.game_getTime(),Number.parseInt(ng));
            if(DataSave.getDataFromLocal("grade"))
            {
                var history = Number.parseInt(DataSave.getDataFromLocal("grade"));
                if(GradeManage.instance.nowGrade>history)
                {
                    DataSave.setDataToLocal("grade",ng);
                }
            }
            else
            {
                DataSave.setDataToLocal("grade",ng);
            }
            setTimeout(()=>{
                if(this.character.DieLayoutNode)
                {
                    var dieNode = cc.instantiate(this.character.DieLayoutPrefab);
                    this.character.DieLayoutNode.addChild(dieNode);
                    dieNode.active = true;
                }
            },200);
            // Ajax.Post("http:\\\\localhost\\test.php",{grade:GradeManage.instance.nowGrade}).then((value)=>{
            //     console.log(value);
            // });
            //if(this.character.body.type!== cc.RigidBodyType.Dynamic)this.character.body.type = cc.RigidBodyType.Dynamic;
            
            
 
        },100);
    }

}
