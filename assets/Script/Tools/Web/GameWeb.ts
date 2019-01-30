import Ajax from "./Ajax";
//const rootPath="/2019newyear";
const rootPath = "/test6"
//const myPath = "/static/game/2019/newyear";
const myPath = "/test3";
const CheckPath = rootPath+"/Check.php";
const GameStart = rootPath+"/GameStart.php";
const GameEnd = rootPath+"/GameEnd.php";
const GetTop = rootPath+"/GetTop.php";
//gameServer是老实现
export default class GameWeb  {
    public static GameCheck():Promise<{}>
    {
        return new Promise<{}>((resolve:Function,reject:Function)=>{
            GameServer.game_init((res)=>{
                resolve(res);
            })
        })
    }
    public static GameStart(startTime:number):Promise<{success:boolean,id:string,error:string}>
    {
        return new Promise<{success:boolean,id:string,error:string}>((resolve:Function)=>{
            GameServer.game_start(startTime,(res)=>{
                resolve(res);
            })
        })
    }
    public static GameEnd(id:number,startTime:number,nowTime:number,grade:number):Promise<{}>
    {
        return new Promise<{}>((resolve:Function)=>{
            GameServer.game_end(id.toString(),startTime,nowTime,grade,(res)=>{
                resolve(res);
            })
        })
    }
    public static GetTop(cout:number):Promise<{ grade:number,name:string,nickname:string}[]>
    {
        return new Promise<{grade:number,name:string,nickname:string}[]>((resolve:Function)=>{
            GameServer.game_getTop(cout,(res)=>{
                resolve(res);
            })
        })
    }
}
