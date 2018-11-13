import CharacterState3 from "./State3";
import CameraFx from "../Script/Tools/CameraFx";

export default class State_Die3 extends CharacterState3 {
    Start()
    {
        console.log("change Die");
        
        setTimeout(()=>{
            setTimeout(()=>{
                //this.character.node.destroy();
                cc.game.restart();
            },2000)
            if(this.character.body.type!== cc.RigidBodyType.Dynamic)this.character.body.type = cc.RigidBodyType.Dynamic;

            CameraFx.Instantiation.traceTager = null;
            
 
        },100);
    }

}
