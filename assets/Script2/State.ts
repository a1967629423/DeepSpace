import Character, { ITouchEvent } from "../Script/Character";
import { Character2 } from "./Character2";
import Star from "../Script/Star";
export class CharacterState
{
    /**
     * 附着在此状态上的状态
     */
    attachment:CharacterState = null;
    /**上下文（角色） */
    character:Character2;
    
    /**
     * 被依附的状态
     */
    attachState:CharacterState = null
    
    
    
    constructor(ch:Character2)
    {
        this.character = ch;
    }
    /**
     * 使状态附着在此状态上
     * @param cs 附着在此状态上的状态
     */
    attaching(cs:CharacterState)
    {
        //Object.create   
        if(this.attachment){this.attachment.Quit()}
        this.attachment = cs;
        this.attachment.attachState = this;
        this.attachment.Start();
    }
    //进入状态
    Start(){if(this.attachment){this.attachment.Start()}}
    onTouch(v2:cc.Vec2){if(this.attachment){this.attachment.onTouch(v2)}}
    onTouchLocal(v2:cc.Vec2){if(this.attachment){this.attachment.onTouchLocal(v2)}}
    endTouch(){if(this.attachment){this.attachment.endTouch()}}
    inStar(star:Star){if(this.attachment){this.attachment.inStar(star)}}
    outStar(){if(this.attachment){this.attachment.outStar()}}
    update(dt:number){if(this.attachment){this.attachment.update(dt)}}
    die(){if(this.attachment){this.attachment.die()}};
    //离开状态
    Quit(){if(this.attachment){this.attachment.Quit();this.attachment = null;}}

}
