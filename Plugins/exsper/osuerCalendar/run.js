'use strict';

const Activity = require('./Activity');
const fs = require('fs');

function run(meta, eventPath) {
    try {
        const qqId = meta.userId;
        fs.readFile(eventPath, (err,data) => {
            if(err) {
                console.log(err);
                return meta.$send("一些不好的事情发生了");
            }
            let events = JSON.parse(data.toString());
            let activity = new Activity(qqId, events);
            let statList = activity.getStatList();
            let output = `[CQ:at,qq=${qqId}]` + "\n";
            output = output + "今日运势：" + statList.luck + "\n";
            output = output + "今日mod：" + statList.mod;
            if (statList.specialMod) output = output + ", " + statList.specialMod + "（？\n";
            else output = output + "\n";
            statList.goodList.map((item) => {
                output = output + "宜：" + item.name + "\n\t" + item.good + "\n";
            });
            statList.badList.map((item) => {
                output = output + "忌：" + item.name + "\n\t" + item.bad + "\n";
            });
            return meta.$send(output);
        })
    } catch (ex) {
        console.log(ex);
        return meta.$send("一些不好的事情发生了");
    }

}


module.exports = run;