import GameInit from "../GameInit";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShowRow extends cc.Component {

    @property(cc.Label)
    showLabel:cc.Label = null

    start () {
        if(this.showLabel&&!GameInit.instance.Debug)
        {
            try
            {
                GameServer.game_getRow((res)=>{
                    if(res.success)
                    {
                        this.showLabel.string ="第"+res.row+"名";
                    }
                })
            }catch(e)
            {
                console.error(e);
                this.showLabel.string ="第"+"0"+"名";
                alert("检测到脚本文件并未完全装载，这种情况下成绩将不会被计入排行榜，请刷新重试");
            }

        }
        else
        {
            this.showLabel.string = "第"+"0"+"名";
            alert("检测到脚本文件并未完全装载，这种情况下成绩将不会被计入排行榜，请刷新重试");
        }
    }
}
