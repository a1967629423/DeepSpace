const math = cc.vmath;
var renderEngine;
var renderer;
var gfx;
var Material;

// Require to load the shader to program lib
const OtherShader = require('./Shader/OtherShader');

renderEngine = cc.renderer.renderEngine;
renderer = renderEngine.renderer;
gfx = renderEngine.gfx;
Material = renderEngine.Material;

var OtherMaterial = (function (Material$$1) {
    function OtherMaterial() {
        Material$$1.call(this, false);

        var pass = new renderer.Pass('OtherShader');
        pass.setDepth(false, false);
        pass.setCullMode(gfx.CULL_NONE);
        pass.setBlend(
            gfx.BLEND_FUNC_ADD,
            gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA,
            gfx.BLEND_FUNC_ADD,
            gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA
        );

        var mainTech = new renderer.Technique(
            ['transparent'],
            [
                { name: 'texture', type: renderer.PARAM_TEXTURE_2D },
                { name: 'color', type: renderer.PARAM_COLOR4 },
                {name:'uvoffset_y',type:renderer.PARAM_FLOAT}],
            [
                pass
            ]
        );

        this._color = { r: 1.0, g: 1.0, b: 1.0, a: 1.0 };
        this._uvOffset_y = 0.0;
        this._effect = new renderer.Effect(
            [
                mainTech],
            {
                'color': this._color,
                'uvoffset_y':this._uvOffset
            },
            []
        );

        this._mainTech = mainTech;
        this._texture = null;
    }

    if (Material$$1) OtherMaterial.__proto__ = Material$$1;
    OtherMaterial.prototype = Object.create(Material$$1 && Material$$1.prototype);
    OtherMaterial.prototype.constructor = OtherMaterial;

    var prototypeAccessors = { effect: { configurable: true }, texture: { configurable: true }, color: { configurable: true },uvOffset:{configurable:true} };

    prototypeAccessors.effect.get = function () {
        return this._effect;
    };

    prototypeAccessors.texture.get = function () {
        return this._texture;
    };

    prototypeAccessors.texture.set = function (val) {
        if (this._texture !== val) {
            this._texture = val;
            this._effect.setProperty('texture', val.getImpl());
            this._texIds['texture'] = val.getId();
        }
    };

    prototypeAccessors.color.get = function () {
        return this._color;
    };

    prototypeAccessors.color.set = function (val) {
        var color = this._color;
        color.r = val.r / 255;
        color.g = val.g / 255;
        color.b = val.b / 255;
        color.a = val.a / 255;
        this._effect.setProperty('color', color);
    };
    prototypeAccessors.uvOffset.get = function()
    {
        return this._uvOffset;
    };
    prototypeAccessors.uvOffset.set = function(val)
    {
        this._effect.setProperty('uvoffset_y',val);
    };

    OtherMaterial.prototype.clone = function clone() {
        var copy = new OtherMaterial();
        copy.texture = this.texture;
        copy.color = this.color;
        copy.updateHash();
        return copy;
    };

    Object.defineProperties(OtherMaterial.prototype, prototypeAccessors);

    return OtherMaterial;
}(Material));



module.exports = OtherMaterial;