const ppysbQuery = require("ppysb-query-ripple");
module.exports.name = 'ppysbQuery'
module.exports.apply = (ctx, options) => {
    let pbq = new ppysbQuery(options);
    ctx.middleware(async (meta, next) => {
        try {
            let message = meta.message;
            let userId = meta.userId;
            let reply = await pbq.apply(userId, message);
            if (reply) return meta.$send(`[CQ:at,qq=${userId}]` + "\n" + reply);
            return next();
        }
        catch (ex) {
            console.log(ex);
            return next();
        }
    });
}
