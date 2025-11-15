/**
 * Set Accounts Command
 * Manage proxy accounts (create, list, remove)
 */

const { setAccountCount, getAccounts, removeAccount } = require('../super/accounts');

module.exports = {
  name: 'setaccs',
  description: 'Manage proxy accounts',
  usage: '!setaccs <number|list|remove>',
  
  execute(player, args, respond, proxy) {
    if (!args.length) {
      return respond(
        '§e§l=== Account Management ===\n' +
        '§b!setaccs <number> §7- Set total accounts\n' +
        '§b!setaccs list §7- List all accounts\n' +
        '§b!setaccs remove all §7- Remove all accounts\n' +
        '§7§l' + '─'.repeat(25)
      );
    }

    const command = args[0].toLowerCase();

    if (command === 'list') {
      const accounts = getAccounts();
      if (!accounts.length) {
        return respond('§c[X] No accounts found.');
      }
      
      const accountList = accounts
        .map((acc, index) => `  §b${index + 1}. §a${acc.name}`)
        .join('\n');
      
      return respond(
        `§e§l=== Accounts (${accounts.length}) ===\n` +
        accountList + '\n' +
        '§7§l' + '═'.repeat(20)
      );
    }

    if (command === 'remove') {
      if (!args[1]) {
        return respond(
          '§e§l=== Remove Accounts ===\n' +
          '§b!setaccs remove <index> §7- Remove specific account\n' +
          '§b!setaccs remove all §7- Remove all accounts\n' +
          '§7§l' + '─'.repeat(20)
        );
      }

      const accounts = getAccounts();

      if (args[1].toLowerCase() === 'all') {
        const count = accounts.length;
        accounts.forEach((_, idx) => removeAccount(idx));
        return respond(
          `§a✓ Removed all accounts (${count})\n` +
          '§7At least one account will remain'
        );
      } else {
        const index = parseInt(args[1], 10) - 1;
        if (isNaN(index) || index < 0 || index >= accounts.length) {
          return respond(`§c[X] Invalid account index! Use 1-${accounts.length}`);
        }
        
        const removed = accounts[index].name;
        const success = removeAccount(index);
        
        if (!success) {
          return respond('§c[X] Cannot remove the last account!');
        }
        
        const remainingAccounts = getAccounts();
        return respond(
          `§a✓ Account removed: §f${removed}\n` +
          `§7Remaining accounts: ${remainingAccounts.length}`
        );
      }
    }

    const count = parseInt(command, 10);
    if (isNaN(count) || count <= 0) {
      return respond('§c[X] Invalid account count! Must be a positive number.');
    }
    
    if (count > 50) {
      return respond('§c[X] Account count limited to 50!');
    }

    const success = setAccountCount(count);
    
    if (!success) {
      return respond('§c[X] Failed to create accounts. Check console for errors.');
    }
    
    const accounts = getAccounts();
    const accountList = accounts
      .map((acc, index) => `  §b${index + 1}. §a${acc.name}`)
      .join('\n');

    respond(
      `§e§l=== Account Count Updated ===\n` +
      `§bNew count: §a${count}\n` +
      `§e§lAccounts:\n${accountList}\n` +
      '§7§l' + '═'.repeat(25)
    );

    console.log(`✓ Account count updated to ${count}`);
    console.log('Current accounts:', accounts.map(a => a.name).join(', '));
  }
};
