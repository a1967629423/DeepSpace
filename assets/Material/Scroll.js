const OtherMaterial = require("OtherMaterial");
cc.Class({
    extends: cc.Component,

    properties: {
        cocos: cc.Sprite,
        play:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.dynamicAtlasManager.enabled = false;
        this._material = new OtherMaterial();
        
    },

    start () {
        if (this.cocos) {
            //设置material
            this._start = Date.now();
            let texture = this.cocos.spriteFrame.getTexture();
            //设置材质贴图
            this._material.texture = texture;
            //this._material.setResolution(this.cocos.node.width, this.cocos.node.height);
            //刷新材质
            this._material.updateHash();
            //从新设置sprite材质
            this.cocos._material = this._material;
            //设置渲染数据
            //TODO:优化shader管理
            this.cocos._renderData._material = this._material;
        }
    },
    update (dt) {
        var addtime = Date.now()-this._start;
        this._material.uvOffset = addtime/1000;
        
    },
});
