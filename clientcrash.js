
let {vision} = require("../support/vision.js");
module.exports = {
    name: "clientcrash",
    execute(player, args, respond) {
      if (args.length == 0) {
        for (let i = 0; i < 5; i++) player.upstream.queue('mob_equipment', vision(player.runtime_id))
        return respond(`§a§lSent ClientCrash.`)
      }
    }
  }
