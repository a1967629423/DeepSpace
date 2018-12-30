import Ajax from "../Tools/Web/Ajax";
import GradeManage from "../GradeManage";
import GameInit from "../GameInit";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankList extends cc.Component {
    @property(cc.Node)
    nameNode:cc.Node = null;
    @property(cc.Node)
    gradeNode:cc.Node = null;
    @property(cc.SpriteFrame)
    defaultBlockFrame:cc.SpriteFrame = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

        try
        {
            console.log(GameInit.instance.GameId);
            GameServer.game_end(GameInit.instance.GameId,GameInit.instance.StartTime,GameServer.game_getTime(),GradeManage.instance.nowGrade,
            (res)=>{
               console.log("Game End:"+res);
            })
            setTimeout(()=>{
                GameServer.game_getTop(10,(res:{
                    highest_score:number,
                    name:string,
                    nickname:string,
                }[])=>{
                    var rank:{playerName:string,playerGrade:number}[] = new Array();
                    res.forEach((val)=>{
                        rank.push({playerName:val.nickname,playerGrade:val.highest_score});
                    })
                    for(var val in rank)
                    {
                        var richName = (new cc.Node).addComponent(cc.RichText);
                        var widget = richName.addComponent(cc.Widget);
                        var name = rank[val]["playerName"];
                        var grade = rank[val]["playerGrade"];
                        var g =   Number(val)+1;
                        var blockcolor;
                        switch (g) {
                            case 1:
                                blockcolor = cc.color(255,95,70);
                                break;
                            case 2:
                                blockcolor = cc.color(250,200,80);
                            break;
                            case 3:
                                blockcolor = cc.color(83,212,169);
                            break;
                            default:
                                blockcolor = cc.color(118,198,211);
                            break;
                        }
                        var block = new cc.Node();
                        var group = new cc.Node();
                        group.setContentSize(20,30);
                        block.addComponent(cc.Sprite).spriteFrame = this.defaultBlockFrame;
                        block.setContentSize(20,20);
                        block.color = blockcolor;
                        var blockWidget = block.addComponent(cc.Widget);
                        richName.string = `<color=#991B1B><b>${g}</b>.</c><color=#991B1B>${name}:</c>`;
                        richName.fontSize = 18;
                        richName.lineHeight = 30;
                        var richGrade = cc.instantiate(richName.node);
                        richGrade.getComponent(cc.RichText).string = `<color=#991B1B>${grade}</c>`;
                        group.addChild(richName.node);
                        group.addChild(block);
                        this.nameNode.addChild(group);
                        this.gradeNode.addChild(richGrade);
                        widget.target = this.nameNode;
                        widget.left = 30;
                        widget.isAlignLeft = true;
                        widget.updateAlignment();
                        blockWidget.target = this.nameNode;
                        blockWidget.left = 2;
                        blockWidget.isAlignLeft = true;
                        blockWidget.updateAlignment();
                    }      
                });
            },500);
            
        }catch(e)
        {
            console.error(e);
        }

        // Ajax.Post('http://localhost/test.php',{grade:GradeManage.instance.nowGrade},true).then((value)=>{
        //     if(value)
        //     {
        //         var rank = JSON.parse(value);
        //         while(typeof rank ==="string" )
        //         {
        //             rank = JSON.parse(rank);
        //         }
        //         for(var val in rank)
        //         {
        //             var richName = (new cc.Node).addComponent(cc.RichText);
        //             var widget = richName.addComponent(cc.Widget);
        //             var name = rank[val]["playerName"];
        //             var grade = rank[val]["playerGrade"];
        //             var g = Number.parseInt(val)+1;
        //             richName.string = `<color=#ff0000><b>${g}</b>.</c><color=#af7fff>${name}:</c>`;
        //             richName.fontSize = 18;
        //             richName.lineHeight = 30;
        //             var richGrade = cc.instantiate(richName.node);
        //             richGrade.getComponent(cc.RichText).string = `<color=#ffff00>${grade}</c>`;
        //             this.nameNode.addChild(richName.node);
        //             this.gradeNode.addChild(richGrade);
        //             widget.left = 0;
        //             widget.isAlignLeft = true;
        //             widget.updateAlignment();
        //         }
                
        //     }
        // });
        // Ajax.Get('http://shimmer.neusoft.edu.cn/wechat/web/api/me',{}).then((value)=>{
        //     console.log(value);
        // })
    }

    // update (dt) {}
}
