import PoolObject from "./PoolObject";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FlyFire extends PoolObject {
    @property(cc.ParticleSystem)
    public particle:cc.ParticleSystem = null;
    reuse()
    {
        super.reuse();
        this.particle.resetSystem();
    }
    unuse()
    {
        super.unuse();
        this.particle.stopSystem();
    }
}
