import DieProp from "./DieProp ";
import SceneSystem2 from "./SceneSystem2";
import BackGround2 from "../Script/BackGround2";
import PoolObject from "./PoolObject";
import Wall from "./Wall";
import PorpObject from "./PropObject";
import AssetsSystem from "../Script/System/AssestSystem";

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
export default class BoomProp extends DieProp {
    applyEffect()
    {
        try
        {
            var nowView =cc.rect(0,0,cc.winSize.width,cc.winSize.height);
            nowView.center = cc.Camera.main.node.parent.convertToWorldSpaceAR(cc.Camera.main.node.position);
    
            this.findAllDieWall(SceneSystem2.Instance.center).forEach((ch:cc.Node)=>{
               var aabb:cc.Rect = ch.getComponent(cc.PhysicsCollider).getAABB();
               if(nowView.intersects(aabb))
               {
                   var wall = ch.getComponent(Wall);
                   var prop = ch.getComponent(DieProp);
                   if(wall)
                   {
                       wall.applyEffect();
                       wall.destroy();
                   }
                   if(prop&&prop!==this)
                   {
                       if(!(prop instanceof BoomProp))
                       {
                           prop.applyEffect();
                       }
                       prop.destroy();
                   }
               }
               
            })
        }catch(e)
        {

        }

    }
    findAllDieWall(cBg:BackGround2):cc.Node[]
    {
        var children:cc.Node[] = [];
        var last = cBg.ground[7];
        var next = cBg.ground[1];
        var nw = cBg.node.children.find((v:cc.Node)=>{if(v.name==="Wall")return true});
        var np = cBg.node.children.find((v:cc.Node)=>{if(v.name==="PropManage")return true});
        if(np&&np.children)
        {
            children = children.concat(np.children);
        }
        if(nw)
        {
            var ndw = nw.children.find((v:cc.Node)=>{if(v.name==="DieWalls")return true});
            if(ndw&&ndw.children)
            {
                children = children.concat(ndw.children);
            }
        }
        if(last)
        {
            var w = last.node.children.find((v:cc.Node)=>{if(v.name==="Wall")return true});
            var p = last.node.children.find((v:cc.Node)=>{if(v.name==="PropManage")return true});
            if(w)
            {
                var d = w.children.find((v:cc.Node)=>{if(v.name==="DieWalls")return true});
                if(d&&d.children)
                {
                    children = children.concat(d.children)
                }
            }
            if(p)
            {
                children = children.concat(p.children);
            }
        }
        
        if(next)
        {
            var w = next.node.children.find((v:cc.Node)=>{if(v.name==="Wall")return true});
            var p = last.node.children.find((v:cc.Node)=>{if(v.name==="PropManage")return true});
            if(w)
            {
                var d = w.children.find((v:cc.Node)=>{if(v.name==="DieWalls")return true});
                if(d&&d.children)
                {
                    children = children.concat(d.children)
                }
            }
            if(p)
            {
                children = children.concat(p.children);
            }
        }
        return children;
    }
}
