const OtherMaterial = require("OtherMaterial");
cc.Class({
    extends: cc.Component,

    properties: {
        cocos: cc.Sprite,
        play:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:
    setAll(f)
    {
        if(f)
        {
            var sprite = f.getComponent("cc.Sprite");
            if(sprite)
            {
                sprite.setSpriteOtherMaterial(new OtherMaterial());
            }
            for(var a in f.children)
            {
                var sprite = f.children[a].getComponent("cc.Sprite");
                if(sprite)
                {
                    sprite.setSpriteOtherMaterial(new OtherMaterial());
                }
                this.setAll(f.children[a]);
            }
        }
    },
    onLoad () {
        cc.dynamicAtlasManager.enabled = false;
        this._material2 = new OtherMaterial();
        var f = cc.find("Canvas");
        this.setAll(f);
        
    },

    start () {
        this._start = Date.now();
        if (this.cocos) {
            //设置material
            
            this.cocos.setSpriteOtherMaterial(this._material2);
        }
    },

    update (dt) {
        var addtime = Date.now()-this._start;
        this._material2.uvOffset = addtime/1000;
        
    },
});
