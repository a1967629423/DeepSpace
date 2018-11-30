const math = cc.vmath;
var renderEngine;
var renderer;
var gfx;
var Material;

// Require to load the shader to program lib
const ChangeShader = require('ChangeShader');

renderEngine = cc.renderer.renderEngine;
renderer = renderEngine.renderer;
gfx = renderEngine.gfx;
Material = renderEngine.Material;

var ChangeMaterial = (function (Material$$1) {
    function ChangeMaterial() {
        Material$$1.call(this, false);

        var pass = new renderer.Pass('ChangeShader');
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
                { name: 'texture_change',type: renderer.PARAM_TEXTURE_2D},
                { name: 'color', type: renderer.PARAM_COLOR4 },
                {name:'cv',type:renderer.PARAM_FLOAT},
            ],
            [
                pass
            ]
        );

        this._color = { r: 1.0, g: 1.0, b: 1.0, a: 1.0 };
        this._cv = 0.0;
        this._effect = new renderer.Effect(
            [
                mainTech],
            {
                'color': this._color,
                'cv':this._cv,
            },
            []
        );

        this._mainTech = mainTech;
        this._texture = null;
        this._texture_change = null;
    }

    if (Material$$1) ChangeMaterial.__proto__ = Material$$1;
    ChangeMaterial.prototype = Object.create(Material$$1 && Material$$1.prototype);
    ChangeMaterial.prototype.constructor = ChangeMaterial;

    var prototypeAccessors = { effect: { configurable: true }, texture: { configurable: true }, color: { configurable: true },texture_change:{configurable:true},cv:{configurable:true}};

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
    prototypeAccessors.texture_change.get = function()
    {
        return this._texture_change;
    }
    prototypeAccessors.texture_change.set = function(val)
    {
        if(this._texture_change !== val)
        {
            this._texture_change = val;
            this._effect.setProperty('texture_change',val.getImpl());
            this._texIds['texture_change'] = val.getId();
        }
    }
    prototypeAccessors.cv.set = function(val)
    {
        this._cv = val;
        this._effect.setProperty('cv',val);
    }
    prototypeAccessors.cv.get = function()
    {
        return this._cv;
    }

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

    ChangeMaterial.prototype.clone = function clone() {
        var copy = new ChangeMaterial();
        copy.texture = this.texture;
        copy.color = this.color;
        copy.updateHash();
        return copy;
    };

    Object.defineProperties(ChangeMaterial.prototype, prototypeAccessors);

    return ChangeMaterial;
}(Material));



module.exports = ChangeMaterial;