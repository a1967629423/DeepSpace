import Normal_ScenesState from "./Normal_ScenesState";

export default class Change_ScenesState extends Normal_ScenesState {
    createSomething(bg,idx)
    {
        super.createSomething(bg,idx);
        setTimeout(()=>{
            this.context.changeState(this.context.normalState);
        },10);
    }
    createDieWall(Group:cc.Node){
    }
    createDieObjectManage(Group:cc.Node){
    }
    createPropManage(Group:cc.Node){

    }

}
