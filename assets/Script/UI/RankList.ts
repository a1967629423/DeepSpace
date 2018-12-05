import Ajax from "../Tools/Web/Ajax";
import GradeManage from "../GradeManage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankList extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
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
        //             var rich = (new cc.Node).addComponent(cc.RichText);
        //             var name = rank[val]["playerName"];
        //             var grade = rank[val]["playerGrade"];
        //             var g = Number.parseInt(val)+1;
        //             rich.string = `<color=#ff0000><b>${g}</b>.</c><color=#af7fff>${name}:</c>   <color=#ffff00>${grade}</c>`;
        //             rich.fontSize = 26;
        //             rich.lineHeight = 30;
        //             this.node.addChild(rich.node);
        //         }
                
        //     }
        // });
        Ajax.Get('http://shimmer.neusoft.edu.cn/wechat/web/api/me',{}).then((value)=>{
            console.log(value);
        })
    }

    // update (dt) {}
}
