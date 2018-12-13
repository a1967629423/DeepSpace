// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const RemixMaterial = require("RemixMaterial");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        cout:{default:0,type:cc.Integer,serializable:true},
        targetTex:{
            default:null,
            type:cc.Texture2D,
            serializable:true,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._material = new RemixMaterial();
     },
     onEnable()
     {
         this.start();
     },

    start () {
        var Sprite = this.getComponent(cc.Sprite);
        if(Sprite&&this.targetTex)
        {
            window.RegMaterial(Sprite,this._material);
            this._material.texture1 = this.targetTex;
            this._material.cout = this.cout;
        }
    },

    // update (dt) {},
});
