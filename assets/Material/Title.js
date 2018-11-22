const TitleMaterial = require("TitleMaterial");
cc.Class({
    extends: cc.Component,

    properties: {
        cout:3
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.dynamicAtlasManager.enabled = false;
        this._material = new TitleMaterial();
        
    },

    start () {
        var sprite = this.getComponent(cc.Sprite);
        if (sprite) {
            //设置material
            // let texture = this.cocos.spriteFrame.getTexture();
            // //设置材质贴图
            // this._material.texture = texture;
            // //this._material.setResolution(this.cocos.node.width, this.cocos.node.height);
            // //刷新材质
            // this._material.updateHash();
            // //从新设置sprite材质
            // this.cocos._material = this._material;
            // //设置渲染数据
            // //TODO:优化shader管理
            // this.cocos._renderData._material = this._material;
            window.RegMaterial(sprite,this._material);
            this._material.cout = this.cout;
        }
    },
    update (dt) {
        
    },
});
