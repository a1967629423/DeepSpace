
// cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
//     let renderEngine = cc.renderer.renderEngine;
//     let SpriteMaterial = renderEngine.SpriteMaterial;
//     let GraySpriteMaterial = renderEngine.GraySpriteMaterial;

//     let State = cc.Enum({
//         /**
//          * !#en The normal state
//          * !#zh 正常状态
//          * @property {Number} NORMAL
//          */
//         NORMAL: 0,
//         /**
//          * !#en The gray state, all color will be modified to grayscale value.
//          * !#zh 灰色状态，所有颜色会被转换成灰度值
//          * @property {Number} GRAY
//          */
//         GRAY: 1,
//         /**
//          * !#en self shader
//          * !#zh 自己的shader
//          * @property {Number} OTHER
//          */
//         OTHER: 2,
//     });

//     cc.js.mixin(cc.Sprite.prototype,{
//         _otherSpriteMaterial:null,
    
//         setSpriteOtherMaterial: function(material){
//             if(this._otherSpriteMaterial){
//                 delete this._otherSpriteMaterial;
//                 this._otherSpriteMaterial = null;
//             }
//             this._otherSpriteMaterial = material;
//             this._state = State.OTHER;
//             this._activateMaterial();
//         },
    
//         _activateMaterial: function () {
//             if (!this.enabledInHierarchy) {
//                 this.disableRender();
//                 return;
//             }
    
//             let spriteFrame = this._spriteFrame;
//             // cannot be activated if texture not loaded yet
//             if (!spriteFrame || !spriteFrame.textureLoaded()) {
//                 this.disableRender();
//                 return;
//             }
    
//             // WebGL
//             if (cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
//                 // Get material
//                 let texture = spriteFrame.getTexture();
//                 let material;
//                 if (this._state == State.NORMAL) {
//                     if (!this._spriteMaterial) {
//                         this._spriteMaterial = new SpriteMaterial();
//                         this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR;
//                     }
//                     material = this._spriteMaterial;
//                 }
//                 else if (this._state == State.GRAY) {
//                     if (!this._graySpriteMaterial) {
//                         this._graySpriteMaterial = new GraySpriteMaterial();
//                         this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR;
//                     }
//                     material = this._graySpriteMaterial;
//                 }
//                 else {
//                     if (!this._otherSpriteMaterial) {
//                         this._state = 0;
//                         this._activateMaterial();
//                         return;
//                     }
//                     this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR;
//                     material = this._otherSpriteMaterial;
//                 }
//                 // TODO: old texture in material have been released by loader
//                 if (material.texture !== texture) {
//                     material.texture = texture;
//                     this._updateMaterial(material);
//                 }
//                 else if (material !== this._material) {
//                     this._updateMaterial(material);
//                 }
//                 if (this._renderData) {
//                     this._renderData.material = material;
//                 }
//             }
            
//             this.markForUpdateRenderData(true);
//             this.markForRender(true);
//         },
//     })
// });
