
//储存系统未完成
export default class DataSaveSystem {
    private _instance:DataSaveSystem = null;
    private _DataSaveList:{[index:string]:string} = {};
    public get Instance():DataSaveSystem
    {
        if(this._instance)this._instance = new DataSaveSystem();
        return this._instance;
    }
    private DataSaveSystem()
    {
        var List:string[] = window.localStorage.SaveList;
        if(List.length&&List.length>0)
        {
            List.forEach((value:string)=>{
                this._DataSaveList[value] = window.localStorage.getItem(value);
            });
        }
    }
}
