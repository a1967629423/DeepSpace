import Character, { ITouchEvent } from "../Script/Character";
import { Character2 } from "./Character2";
import Star from "../Script/Star";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export class CharacterState
{

    character:Character2;
    constructor(ch:Character2)
    {
        this.character = ch;
    }
    //进入状态
    Start(){}
    onTouch(v2:cc.Vec2){}
    endTouch(){}
    inStar(star:Star){}
    outStar(){}
    update(dt:number){}
    die(){};
    //离开状态
    Quit(){}

}
