const sillyChooser = require("sillyChooser");
module.exports.name = 'sillyChooser'
module.exports.apply = (ctx, options) => {
    let sc = new sillyChooser(options);
    ctx.middleware(async (meta, next) => {
        try {
            let message = meta.message;
            let userId = meta.userId;
            let reply = sc.apply(meta.selfId, userId, message);
            if (reply) return meta.$send(`[CQ:at,qq=${userId}]` + "\n" + reply);
            return next();
        }
        catch (ex) {
            console.log(ex);
            return next();
        }
    });
}
