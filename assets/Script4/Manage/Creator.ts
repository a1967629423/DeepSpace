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
export default class Creator extends cc.Component {
    @property({ step: 1 })
    generateNumber: number = 0;
    @property(cc.Prefab)
    ObjectPerfab: cc.Node = null;
    protected prefab_ins: cc.Node;
    protected childNumber: number = 0;
    start()
    {
        
        if (this.ObjectPerfab && this.generateNumber > 0) {
            this.Init();
            this.childNumber = this.generateNumber;
            if (!this.prefab_ins)
            {
                this.prefab_ins = cc.instantiate(this.ObjectPerfab);
            }
            for (var i = 0; i < this.generateNumber; i++) {

                let childNode = this.generateObject(i);
                if(childNode)childNode.once("destroy",this.childDestroy,this);
            }
        }
        else {
            this.node.destroy();
        }
        
    }
    Init()
    {

    }
    generateObject(i: number):cc.Node
    {
        return null;
    }
    childDestroy() {
        this.childNumber--;
        if (this.childNumber <= 0) {
            setTimeout(()=>{
                if(cc.isValid(this.node))
                {
                    this.node.destroy();
                }     
            })
        }
    }
    onDestroy()
    {
        this.ObjectPerfab = null;
        this.prefab_ins = null;
    }
}
