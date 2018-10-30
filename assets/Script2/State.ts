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
    /*
    //判断是否附着于其他状态
    attached:boolend = false;
    需要传入的是另一个实例而非目前使用的实例，或者传入类名，然后实例化类
    */
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
        this.attachment.Start();
    }
    //进入状态
    Start(){if(this.attachment){this.attachment.Start()}}
    onTouch(v2:cc.Vec2){if(this.attachment){this.attachment.onTouch(v2)}}
    endTouch(){if(this.attachment){this.attachment.endTouch()}}
    inStar(star:Star){if(this.attachment){this.attachment.inStar(star)}}
    outStar(){if(this.attachment){this.attachment.outStar()}}
    update(dt:number){if(this.attachment){this.attachment.update(dt)}}
    die(){if(this.attachment){this.attachment.die()}};
    //离开状态
    Quit(){if(this.attachment){this.attachment.Quit();this.attachment = null;}}

}
