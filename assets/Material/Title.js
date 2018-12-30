const TitleSpriteMaterial = require("TitleMaterial");
cc.Class({
    extends: cc.Component,

    properties: {
        cout:3,
        x_cout:1
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        //if(!window.Title)window.Title = this
        this._material = new TitleSpriteMaterial();
        
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
            var sprite = this.getComponent(cc.Sprite);
            if (sprite) {
                window.RegMaterial(sprite,this._material);
                this._material.cout = this.cout;
                this._material.x_cout = this.x_cout;
            }
    },

    start () {
        
            var sprite = this.getComponent(cc.Sprite);
            if (sprite) {
                window.RegMaterial(sprite,this._material);
                this._material.cout = this.cout;
                this._material.x_cout = this.x_cout;
            }

    },
    onDestroy()
    {
        // var sprite = this.getComponent(cc.Sprite);
        // window.UnRegMaterial(sprite,this._material);
        // //debugger;
        // this._material = null;
    },
});
