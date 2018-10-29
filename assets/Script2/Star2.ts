import Star from "../Script/Star";
import { Character2 } from "./Character2";
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
export  class Star2 extends Star {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    //interface
    start () {
        super.start();
    }
    onBeginContact(contact,self:cc.Collider,other:cc.Collider)
    {
        super.onBeginContact(contact,self,other);
        var ch2:Character2 = this.tage.getComponent(Character2);
        if(ch2)
        {
            ch2.inStar(this);
        }
    }
    onEndContact(contact,self:cc.Collider,other:cc.Collider)
    {
        var ch2:Character2 = other.getComponent(Character2);
        if(ch2)
        {
            ch2.outStar(this);
        }
        super.onEndContact(contact,self,other);


    }

    update (dt) {
        super.update(dt);
    }
}


