import CharacterState3 from "./State3";
import CameraFx from "../Script/Tools/CameraFx";

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
            if(this.character.body.type!== cc.RigidBodyType.Dynamic)this.character.body.type = cc.RigidBodyType.Dynamic;

            
            
 
        },100);
    }

}
