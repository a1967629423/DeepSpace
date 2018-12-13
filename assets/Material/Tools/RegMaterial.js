// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
(function(w)
{
    w.RegMaterial = function(sprite,Material)
    {
        if(sprite._material!==Material)
        {
            let texutre = sprite.spriteFrame.getTexture();
            Material.texture = texutre;
            Material.updateHash();
            sprite._material = Material;
            sprite._renderData._material = Material;
        }
    }
})(window)