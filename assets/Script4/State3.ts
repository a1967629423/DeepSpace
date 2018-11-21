import Character4 from "./Character4";
import Wall from "./Wall";
import Porpp from "./PropObject";
export default class CharacterState3 {
    /**
     * 附着在此状态上的状态
     */
    attachment:CharacterState3 = null;
    character:Character4 = null;
    /**
     * 被依附的状态
     */
    attachState:CharacterState3 = null
    constructor(ch:Character4)
    {
        this.character = ch;
    }
    /**
     * 使状态附着在此状态上
     * @param cs 附着在此状态上的状态
     */
    attaching(cs:CharacterState3)
    {
        //Object.create   
        if(this.attachment){this.attachment.Quit()}
        this.attachment.attachState = this;
        cs.Start();
        this.attachment = cs;  
    }
    Start(){}
    onWall(stype:Wall){if(this.attachment)this.attachment.onWall(stype)}
    onPorp(ptype:Porpp){if(this.attachment)this.attachment.onPorp(ptype)}
    update(dt:number){if(this.attachment)this.attachment.update(dt)}
    onClick(v2:cc.Vec2){if(this.attachment)this.attachment.onClick(v2);}
    onTouchV2(v2:cc.Vec2){if(this.attachment)this.attachment.onTouchV2(v2)}
    onTouchLocal(v2:cc.Vec2){if(this.attachment)this.onTouchLocal(v2)}
    endTouch(){if(this.attachment)this.endTouch()}
    die():boolean{if(this.attachment)return this.attachment.die();return true;}
    Quit(){if(this.attachment){this.attachment.Quit();this.attachment = null;this.attachState = null} }

}
