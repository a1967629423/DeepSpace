
const {ccclass, property} = cc._decorator;

@ccclass
export default class ShaderUtil extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property({
        type:cc.TextAsset,
        displayName:"Vert Native",
        tooltip:"native顶点着色的模块代码名词（文件名）例如：gray_vsh"
    })
    vert_no_mvp: cc.TextAsset = null;
    @property({
        type:cc.TextAsset,
        displayName:"Vert Web",
        tooltip:"native顶点着色的模块代码名词（文件名）例如：gray_vsh"
    })
    vert:cc.TextAsset = null;
    @property({
        type: cc.TextAsset,
        displayName: 'Frag',
        tooltip: '片元着色器的代码模块名称（文件名），比如：gray_fsh。'
    })
    frag:cc.TextAsset = null;
    glNode:cc.Sprite = null;
    _default_vert:string = '';
    _default_frag:string = '';
    // LIFE-CYCLE CALLBACKS:
    texture2d:cc.Texture2D = null;
    renderer = cc.renderer.renderEngine.renderer;
    gfx = cc.renderer.renderEngine.gfx;
    Material = cc.renderer.renderEngine.Material;
     onLoad () {
         this.glNode = this.getComponent(cc.Sprite);
         this.texture2d = this.glNode.spriteFrame.getTexture()
         var pass = new this.renderer.Pass();
         console.log(pass);
     }

    start () {

    }
    loadShaderCode()
    {
        this._default_vert = this.vert.text;
        this._default_frag = this.frag.text;
    }
    onInitGLProgram()
    {
    }

    // update (dt) {}
}
