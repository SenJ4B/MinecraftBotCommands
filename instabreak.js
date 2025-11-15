module.exports = {
  name: 'instabreak',
  description: 'Toggle instant block breaking',
  usage: '!instabreak',
  aliases: ['ib'],
  
  execute(player, args, respond, proxy) {
    if (typeof proxy.breakToggle !== 'boolean') {
      proxy.breakToggle = false;
    }
    
    proxy.breakToggle = !proxy.breakToggle;
    const status = proxy.breakToggle ? '§a[OK] ENABLED' : '§c[X] DISABLED';
    const icon = proxy.breakToggle ? '⚡' : '🔨';
    
    respond(
      `§9§l=== §bInstabreak ${icon} §9===\n` +
      `§6Status: ${status}\n` +
      (proxy.breakToggle 
        ? '§a[OK] Blocks will break instantly' 
        : '§7Normal breaking speed') + '\n' +
      '§9§l' + '═'.repeat(20)
    );
  }
};
