import GameInit from "../GameInit";

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
export default class MusicSystem extends cc.Component {
    private static _instance:MusicSystem = null;
    public static get instance():MusicSystem
    {
        if(!this._instance)this._instance = cc.find("System/MusicSystem").getComponent(MusicSystem);
        return this._instance;
    }
    source:cc.AudioSource = null;
    start () {
        this.source = this.getComponent(cc.AudioSource);
    }
    pause()
    {
        if(this.source)this.source.pause();
    }
    resume()
    {
        if(this.source)this.source.resume()
    }
    onDestroy()
    {
        if(this.source){
            this.source.stop()
            this.source.clip = null;
        };
    }

    // update (dt) {}
}
