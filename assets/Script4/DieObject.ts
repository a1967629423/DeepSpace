import DieWall from "./DieWall";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DieObject extends DieWall {
    @property
    Destroy_Y:number = 0;
     update (dt) {
         if(this.node.y<this.Destroy_Y)
         {
             this.node.emit("destroy",this);
             this.destroy();
         }
     }
}
