// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class UICamera extends cc.Component {
    @property(cc.Sprite)
    TageSprite:cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    camera:cc.Camera = null;
    start()
    {
        this.camera = this.getComponent(cc.Camera);
        if(this.TageSprite&&this.camera)
        {
            var render = new cc.RenderTexture();
            var size = cc.winSize;
            render.initWithSize(
                size.width,size.height);
                this.camera.targetTexture = render;
            var fram = new cc.SpriteFrame();
            fram.setTexture(render);
            this.camera.render(this.node);
            this.TageSprite.spriteFrame = fram;
        }
    }
     update (dt) {
     }
}
