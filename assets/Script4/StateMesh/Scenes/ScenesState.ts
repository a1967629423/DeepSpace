import SceneSystem2 from "../../SceneSystem2";
import BackGround2 from "../../../Script/BackGround2";

export default class ScenesState {
    protected context:SceneSystem2 = null;
    constructor(c:SceneSystem2)
    {
        this.context = c;
    }
    Start(){}
    createSomething(bg:BackGround2,idx){}
    createWall(Group:cc.Node){}
    createDieWall(Group:cc.Node){}
    createDieObjectManage(Group:cc.Node){}
    createPropManage(Group:cc.Node){}
    Quit(){}
}
