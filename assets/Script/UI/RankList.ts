import Ajax from "../Tools/Web/Ajax";
import GradeManage from "../GradeManage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankList extends cc.Component {
    @property(cc.Node)
    nameNode:cc.Node = null;
    @property(cc.Node)
    gradeNode:cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var rank = [{playerName:"d0",playerGrade:10000},{playerName:"d1",playerGrade:5000}];
        for(var val in rank)
        {
            var richName = (new cc.Node).addComponent(cc.RichText);
            var widget = richName.addComponent(cc.Widget);
            var name = rank[val]["playerName"];
            var grade = rank[val]["playerGrade"];
            var g = Number.parseInt(val)+1;
            richName.string = `<color=#ff0000><b>${g}</b>.</c><color=#af7fff>${name}:</c>`;
            richName.fontSize = 18;
            richName.lineHeight = 30;
            var richGrade = cc.instantiate(richName.node);
            richGrade.getComponent(cc.RichText).string = `<color=#ffff00>${grade}</c>`;
            this.nameNode.addChild(richName.node);
            this.gradeNode.addChild(richGrade);
            widget.left = 0;
            widget.isAlignLeft = true;
            widget.updateAlignment();
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
