import CharacterState3 from "./State3";
import CameraFx from "../Script/Tools/CameraFx";
import SceneSystem2 from "./SceneSystem2";
import Ajax from "../Script/Tools/Web/Ajax";
import GradeManage from "../Script/GradeManage";

export default class State_Die3 extends CharacterState3 {
    Start()
    {
        console.log("change Die");
        
        setTimeout(()=>{
            if(this.character.DieLayoutNode)
            {
                this.character.DieLayoutNode.active = true;
            }
            setTimeout(()=>{
                this.character.destroy();
                this.character.node.destroy();
            },2000)
            CameraFx.Instantiation.traceTager = null;
            SceneSystem2.Instance.player = null;
            this.character.exist = false;
            // Ajax.Post("http:\\\\localhost\\test.php",{grade:GradeManage.instance.nowGrade}).then((value)=>{
            //     console.log(value);
            // });
            //if(this.character.body.type!== cc.RigidBodyType.Dynamic)this.character.body.type = cc.RigidBodyType.Dynamic;

            
            
 
        },100);
    }

}
