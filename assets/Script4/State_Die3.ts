import CharacterState3 from "./State3";
import CameraFx from "../Script/Tools/CameraFx";
import SceneSystem2 from "./SceneSystem2";
import Ajax from "../Script/Tools/Web/Ajax";
import GradeManage from "../Script/GradeManage";
import DataSave from "../Script/DataSave";

export default class State_Die3 extends CharacterState3 {
    Start()
    {
        console.log("change Die");
        
        setTimeout(()=>{
            if(this.character.DieLayoutNode)
            {
                var dieNode = cc.instantiate(this.character.DieLayoutPrefab);
                this.character.DieLayoutNode.addChild(dieNode);
                dieNode.active = true;
            }
            setTimeout(()=>{
                this.character.destroy();
                this.character.node.destroy();
            },2000)
            CameraFx.Instantiation.traceTager = null;
            SceneSystem2.Instance.player = null;
            this.character.exist = false;
            if(DataSave.getDataFromLocal("grade"))
            {
                var history = Number.parseInt(DataSave.getDataFromLocal("grade"));
                if(GradeManage.instance.nowGrade>history)
                {
                    DataSave.setDataToLocal("grade",GradeManage.instance.nowGrade.toFixed(0));
                }
            }
            else
            {
                DataSave.setDataToLocal("grade",GradeManage.instance.nowGrade.toFixed(0));
            }
            // Ajax.Post("http:\\\\localhost\\test.php",{grade:GradeManage.instance.nowGrade}).then((value)=>{
            //     console.log(value);
            // });
            //if(this.character.body.type!== cc.RigidBodyType.Dynamic)this.character.body.type = cc.RigidBodyType.Dynamic;

            
            
 
        },100);
    }

}
