import GameInit from "../../../Script/GameInit";
import DataSave from "../../../Script/DataSave";

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
export default class NextButton extends cc.Component {
    @property(cc.Node)
    lastButton:cc.Node = null;
    @property(cc.SpriteFrame)
    nextFrame:cc.SpriteFrame = null;
    @property
    scenesname:string = "";
    @property(cc.Sprite)
    pointOne:cc.Sprite = null;
    @property(cc.Sprite)
    pointTwo:cc.Sprite = null;
    @property(cc.SpriteFrame)
    unfocePoint:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    focePoint:cc.SpriteFrame = null;
    @property(cc.Node)
    text1:cc.Node = null;
    @property(cc.Node)
    text2:cc.Node = null;
    nowFrame:cc.SpriteFrame = null;
    state:number = 0;

    start()
    {
        this.nowFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.text1.active = true;
        this.text1.getComponent(cc.Animation).play("textShow");
    }
    click()
    {
        if(this.state ===0)
        {
            //this.lastButton.active = true;
            //this.lastButton.getComponent(cc.Button).interactable = false;
            //this.getComponent(cc.Sprite).spriteFrame = this.nextFrame;
            //this.pointOne.spriteFrame = this.unfocePoint;
            //this.pointTwo.spriteFrame = this.focePoint;
            this.getComponent(cc.Button).interactable = false;
            var text1Animation = this.text1.getComponent(cc.Animation);
            text1Animation.once("finished",()=>{
                this.text2.getComponent(cc.Animation).play("textShow");
                //this.lastButton.getComponent(cc.Button).interactable = true;
                cc.director.getScene().runAction(cc.fadeOut(1.0));
                setTimeout(()=>{
                    //TODO:用GameInit取代change操作
                    cc.director.loadScene(this.scenesname,()=>{
                        cc.director.getScene().runAction(cc.fadeIn(1.0));
                    })
                },1000);
                GameInit.rootDataSave.setDataToNode(DataSave.inGame,true);
                
            });
            text1Animation.play("textclose");
            
            //this.state++;
        }
        else
        {
            GameInit.rootDataSave.setDataToNode(DataSave.inGame,true);
            this.text2.getComponent(cc.Animation).play("textclose");
            cc.director.getScene().runAction(cc.fadeOut(1.0));
            setTimeout(()=>{
                //TODO:用GameInit取代change操作
                cc.director.loadScene(this.scenesname,()=>{
                    cc.director.getScene().runAction(cc.fadeIn(1.0));
                })
            },1000);
        }

    }
    reset()
    {
        this.state = 0;
        this.getComponent(cc.Button).interactable = false;
        this.getComponent(cc.Sprite).spriteFrame = this.nowFrame;
        this.pointOne.spriteFrame = this.focePoint;
        this.pointTwo.spriteFrame = this.unfocePoint;
        var text2Animation =  this.text2.getComponent(cc.Animation);
        text2Animation.once("finished",()=>{
            this.text1.getComponent(cc.Animation).play("textShow");
            this.getComponent(cc.Button).interactable = true;
        });
        text2Animation.play("textclose");
        
    }
}
