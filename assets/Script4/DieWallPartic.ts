import PoolObject from "./PoolObject";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DieWallPartic extends PoolObject {
    @property(cc.ParticleSystem)
    Boom1:cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    Boom2:cc.ParticleSystem = null;

    update (dt) {
    }
    reuse()
    {
        this.Boom2.resetSystem();
        this.Boom1.resetSystem();
        setTimeout(()=>{
            this.destroy();
        },800);   
    }
    unuse()
    {
        this.Boom1.stopSystem();
        this.Boom2.stopSystem();
    }
}
