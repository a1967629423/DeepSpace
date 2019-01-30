(function(w){
    w.GameServer = {
        game_init(callBack){w.gameApi.init(callBack)},
        game_start(timestamp,callback){w.gameApi.start(timestamp,callback)},
        game_end(id, start_timestamp, timestamp, score, callback){
            w.gameApi.end(id,start_timestamp,timestamp,score,callback)
        },
        game_getBox(game_id){w.gameApi.box(game_id)},
        game_openBox(){},
        game_getTop(count, callback){
            w.gameApi.top(count,callback);
        },
        game_openDialog(){w.gameApi.showBox()},
        game_openIntro(){w.gameApi.showIntro()},
        game_getTime(){return w.gameApi.getTime()},
        game_getRow(callBack){w.gameApi.row(callBack)}
    }
    w.ClearAll=function()
    {
        localStorage.clear();
    }
}(window))