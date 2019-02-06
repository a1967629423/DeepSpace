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
export default class DataSave extends cc.Component {
    private data:{[idx:string]:any}= {};
    public setDataToNode(key:string,value:any)
    {
        this.data[key] = value;
    }
    public getDataFromNode<T>(key:string):T
    {
        return this.data[key];
    }
    public static setDataToLocal(key:string,value:string)
    {
        localStorage.setItem(key,value);
    }
    public static getDataFromLocal(key:string):string
    {
        return localStorage.getItem(key);
    }
    public static inGame:string = "inGame";
    // update (dt) {}
}
