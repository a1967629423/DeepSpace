const ScrollShader = require("OtherMaterial");
cc.Class({
    extends: cc.Component,

    properties: {
        n:1,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.dynamicAtlasManager.enabled = false;
        this._material = new ScrollShader();
        
    },

    start () {
        if (this.cocos) {
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

        }
        var sp = this.getComponent(cc.Sprite)
        if(sp)
        {
            window.RegMaterial(sp,this._material);
            this._material.row = this.n;
        }
    },
    setOffset(val)
    {
        this._material.uvOffset = val;
    }
    ,
    update (dt) {
        // var addtime = Date.now()-this._start;
        // this._material.uvOffset = addtime/1000;
        
    },
});
