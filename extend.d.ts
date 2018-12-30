declare  class Remix extends cc.Component{
	targetTex:cc.Texture2D;	
	cout:number;
	x_cout:number;
}
declare class Title extends cc.Component{
	cout:number;
	x_cout:number;
}
declare class Scroll extends cc.Component
{
	n:number
	setOffset(val:number);
}
// declare class GameServer{
// 	public  game_start(timestamp:number,callback:Function<{res:Object}>);
// 	public  game_end();
// 	public  game_getBox();
// 	public  game_openDialog();
// 	public  game_getTop();

// }
declare var GameServer:{
	game_start(timestamp:number,callback:Function<{res:{success:boolean,id:string,error:string}}>),
	game_end(id:string, start_timestamp:number, timestamp:number, score:number, callback:Function<{res:Object}>),
	game_getBox(game_id:string),
	game_getTop(count:number, callback:Function<{res:{
		avatar:string,
		box:number,
		code:number,
		extra:string,
		highest_score:number,
		highest_time:Date,
		id:number,
		name:string,
		nickname:string,
	}[]}>),
	game_openDialog(),
	game_openIntro(),
	game_getTime():number,
	game_init(Function)
}