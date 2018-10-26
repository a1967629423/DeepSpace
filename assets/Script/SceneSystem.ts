import Character from "./Character";
import BackGround2 from "./BackGround2";

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
//使用setparent会先移除Chile，这会导致粒子特效消失，下一步优化：讲player放在单独的node下，通过worldposition来计算局部位置
@ccclass
export default class SceneSystem extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Prefab)
    bg:cc.Prefab = null;
    @property(Character)
    player:Character = null;
    @property(BackGround2)
    center:BackGround2 = null;
    @property(cc.Node)
    father:cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    width:number = 0;
    height:number = 0;
    start () {
        if(this.bg)
        {
            if(this.center==null)
            {
                this.center = cc.instantiate(this.bg).getComponent(BackGround2);
            }
            var cnode = this.center.node;
            var w = this.width = cnode.width;
            var h = this.height = cnode.height;
            var lx = cnode.x;
            var ly = cnode.y;
            //设置中心
            this.center.ground[4] = this.center;
            //设置周围
            for(var i =-1;i<=1;i++)
            {
                for(var f =-1;f<=1;f++)
                {
                    if(!(i==0&&f==0))
                    {
                        var gd = cc.instantiate(this.bg).getComponent(BackGround2);
                        this.center.ground[(i+1)*3+(f+1)] = gd;
                        gd.node.position = cc.v2(lx+w*f,ly+h*i);
                        gd.node.setParent(this.father);
                        gd.node.setSiblingIndex(0);
                        gd.node.zIndex = -1;

                    }
                }
            }
        }

    }

     update (dt) {
        var x = this.player.node.position.x;
        var y = this.player.node.position.y;
        if(x<0)
        {
            if(y<0)
            {
                //左下角
                this.ReSetCenter(0);


            }else if(y>this.height)
            {
                //左上角
                this.ReSetCenter(6);
            }
            else
            {
                //左中部
                this.ReSetCenter(3);
            }

        } else if(x>this.width)
        {
            if(y<0)
            {
                //右下角
                this.ReSetCenter(2)
            }else if(y>this.height)
            {

                this.ReSetCenter(8);
            }
            else
            {
                this.ReSetCenter(5);
            }
        }
        else
        {
            if(y<0)
            {
                this.ReSetCenter(1)
            }else if(y>this.height)
            {
                this.ReSetCenter(7);
                
            }

        }

     }
     ReSetCenter(idx:number)
     {
        var ix = idx%3;
        var iy = (idx-ix)/3;
        var ct:BackGround2 = this.center.ground[idx];
        var lx = ct.node.x;
        var ly = ct.node.y;
        ct.ground[4] = ct;
        for(var i =-1;i<=1;i++)
        {
            for(var f =-1;f<=1;f++)
            {

                var ri = (i+1);
                var rf = (f+1);
                //找到老元素
                if(ix+f>=0&&ix+f<=2&&iy+i>=0&&iy+i<=2)
                {
                    var  cgr = this.center.ground[(iy+i)*3+(ix+f)];
                    cgr.node.setSiblingIndex(0);
                    cgr.node.zIndex = -1;
                    ct.ground[ri*3+rf] = cgr;
                }
                //创建新元素
                if(!(i==0&&f==0))
                {

                    var gd = cc.instantiate(this.bg).getComponent(BackGround2);
                    if (!ct.ground[ri * 3 + rf]) {
                        ct.ground[ri * 3 + rf] = gd;
                        gd.node.position = cc.v2(lx + this.width * f, ly + this.height * i);
                        gd.node.setParent(this.father);
                        gd.node.setSiblingIndex(0);
                        gd.node.zIndex = -1;
                    }

                    
                }
                //清理不需要的元素
            }
        }
        var ax = this.center.node.x - ct.node.x;
        var ay = this.center.node.y - ct.node.y;
        this.center.node.removeChild(this.player.node);
        ct.node.addChild(this.player.node);
        
        this.center = ct;
        //this.player.node.setParent(ct.node);
        

        this.player.node.x+=ax;
        this.player.node.y+=ay;

        

     }
}
