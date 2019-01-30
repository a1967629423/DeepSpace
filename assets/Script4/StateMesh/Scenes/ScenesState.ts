import SceneSystem2 from "../../SceneSystem2";
import BackGround2 from "../../../Script/BackGround2";
import State from "../../StateMachine/State";

export default class ScenesState extends State {
    public get context():SceneSystem2
    {
        return <SceneSystem2>super.context
    }
    public set context(val)
    {
        super.context = val;
    }
    constructor(c:SceneSystem2)
    {
        super(c);
        this.context = c;
    }
    Start(){}
    update(dt:number){}
    createSomething(bg:BackGround2,idx){}
    createWall(Group:cc.Node){}
    createDieWall(Group:cc.Node){}
    createDieObjectManage(Group:cc.Node){}
    createPropManage(Group:cc.Node){}
    Quit(){}
}
