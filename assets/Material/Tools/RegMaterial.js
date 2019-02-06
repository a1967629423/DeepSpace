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
    w.UnRegMaterial=function(sprite,Material)
    {
        //sprite._material = null;
        //sprite._renderData._material = null;
        Material._texture = null;
        Material._effect = null;
        Material._mainTech = null;
        Material.prototype = null;
        if(sprite._renderData&&sprite._renderData._material)sprite._renderData._material = null;
        if(sprite._material)sprite._material = null;
    }
    w.addEventListener("popstate",function(e){
        cc.find("System/GameInit").getComponent("GameInit").popstate();
    })
})(window)