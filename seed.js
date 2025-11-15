module.exports = {
  name: "seed",
  description: "Display the world seed",
  usage: "!seed",
  
  execute(player, args, respond) {
    if (!player.seed) {
      return respond('§c[X] World seed not available yet. Join a world first.');
    }
    
    const seedArray = Array.isArray(player.seed) ? player.seed : [player.seed];
    const seedStr = seedArray.join(', ');
    
    respond(
      '§e§l=== World Seed ===\n' +
      `§bSeed: §a${seedStr}\n` +
      '§7§l' + '─'.repeat(20)
    );
  }
};

