const math = cc.vmath;
var renderEngine;
var renderer;
var gfx;
var Material;
//着色器名字
var shaderName = 'RemixShader';
// Require to load the shader to program lib
//需要在同一目录
const RemixShader = require(shaderName);

renderEngine = cc.renderer.renderEngine;
renderer = renderEngine.renderer;
gfx = renderEngine.gfx;
Material = renderEngine.Material;

var RemixMaterial = (function (Material$$1) {
    function RemixMaterial() {
        Material$$1.call(this, false);

        var pass = new renderer.Pass(shaderName);
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
                { name: 'rt1',type:renderer.PARAM_TEXTURE_2D},
                {name:'cv',type:renderer.PARAM_FLOAT},
                {name:'cout',type:renderer.PARAM_FLOAT},
                {name:'x_cout',type:renderer.PARAM_FLOAT},
                {name:'control_point',type:renderer.PARAM_FLOAT2},

            ],
            [
                pass
            ]
        );

        this._color = { r: 1.0, g: 1.0, b: 1.0, a: 1.0 };
        this._control_point = {x:0.4,y:0.4}
        this._cv = 0.0;
        this._cout = 3.0;
        this._x_cout = 1.0;
        this._effect = new renderer.Effect(
            [
                mainTech],
            {
                'color': this._color,
                'cv':this._cv,
                'cout':this._cout,
                'x_cout':this._x_cout,
                'control_point':this._control_point,
            },
            []
        );

        this._mainTech = mainTech;
        this._texture = null;
        this._texture1 = null;
    }

    if (Material$$1) RemixMaterial.__proto__ = Material$$1;
    RemixMaterial.prototype = Object.create(Material$$1 && Material$$1.prototype);
    RemixMaterial.prototype.constructor = RemixMaterial;

    var prototypeAccessors = { effect: { configurable: true }, texture: { configurable: true }, 
    color: { configurable: true },cv:{configurable:true},
    texture1:{configurable:true},control_point:{configurable:true},
    cout:{configurable:true},x_cout:{configurable:true}};

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
    prototypeAccessors.texture1.get = function(){
        return this._texture1;
    };
    prototypeAccessors.texture1.set = function(val)
    {
        if(this._texture1!== val)
        {
            this._texture1 = val;
            this._effect.setProperty('rt1',val.getImpl());
            this._texIds['texture1'] = val.getId();
        }
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
    prototypeAccessors.cv.get = function()
    {
        return this._cv;
    }
    prototypeAccessors.cv.set = function(val)
    {
        this._effect.setProperty('cv',val);
        this._cv = val;
    }
    prototypeAccessors.control_point.get = function()
    {
        return this._control_point;
    }
    prototypeAccessors.control_point.set = function(val)
    {
        this._control_point = val;
        this._effect.setProperty('control_point',val);
    }
    prototypeAccessors.cout.get = function()
    {
        return this._cout;
    }
    prototypeAccessors.cout.set = function(val)
    {
        this._cout = val;
        this._effect.setProperty("cout",val);
    }
    prototypeAccessors.x_cout.get = function()
    {
        return this._x_cout;
    }
    prototypeAccessors.x_cout.set = function(val)
    {
        this._x_cout = val;
        this._effect.setProperty("x_cout",val);
    }

    RemixMaterial.prototype.clone = function clone() {
        var copy = new RemixMaterial();
        copy.texture = this.texture;
        copy.color = this.color;
        copy.updateHash();
        return copy;
    };

    Object.defineProperties(RemixMaterial.prototype, prototypeAccessors);

    return RemixMaterial;
}(Material));



module.exports = RemixMaterial;