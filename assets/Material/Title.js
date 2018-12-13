const TitleMaterial = require("TitleMaterial");
cc.Class({
    extends: cc.Component,

    properties: {
        cout:3
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        if(!window.Title)window.Title = this
        this._material = new TitleMaterial();
        
    },
    restart()
    {
        // setTimeout(()=>{
        //     var sprite = this.getComponent(cc.Sprite);
        //     if (sprite) {
        //         window.RegMaterial(sprite,this._material);
        //         this._material.cout = this.cout;
        //     }
           
        // },10);
        //setTimeout(()=>{this.start();},100)
    },
    onEnable()
    {
        this.start();
    },

    start () {
        
        setTimeout(()=>{
            var sprite = this.getComponent(cc.Sprite);
            if (sprite) {
                window.RegMaterial(sprite,this._material);
                this._material.cout = this.cout;
            }
        })

    },
});
