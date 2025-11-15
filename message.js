const scheduledMessages = new Map();

module.exports = {
  name: "message",
  description: "Send repeated messages to chat",
  usage: "!message <amount> <text>",
  aliases: ['msg', 'm'],
  
  execute(player, args, respond, proxy) {
    if (args[0]?.toLowerCase() === "stop") {
      const timeouts = scheduledMessages.get(player.id);
      if (timeouts && timeouts.length > 0) {
        timeouts.forEach(clearTimeout);
        scheduledMessages.delete(player.id);
        return respond(`§a[OK] Stopped ${timeouts.length} scheduled message(s).`);
      } else {
        return respond('§e⚠ No messages are currently scheduled.');
      }
    }

    if (args.length < 2) {
      return respond(
        '§e§l=== Message Command ===\n' +
        '§b!message <amount> <text> §7- Send message repeatedly\n' +
        '§b!message stop §7- Stop scheduled messages\n' +
        '§7§l' + '─'.repeat(25) + '\n' +
        '§7Examples:\n' +
        '§e!message 5 Hello everyone!\n' +
        '§e!message 10 Welcome to the server!'
      );
    }

    const amount = parseInt(args[0]);
    const message = args.slice(1).join(" ");
    const delay = 500;

    if (isNaN(amount) || amount < 1) {
      return respond('§c[X] Invalid amount! Must be a positive number.');
    }

    if (amount > 100) {
      return respond('§c[X] Amount limited to 100 messages to prevent spam.');
    }

    if (!message || message.trim().length === 0) {
      return respond('§c[X] Please provide a message to send.');
    }

    if (scheduledMessages.has(player.id)) {
      const prev = scheduledMessages.get(player.id);
      prev.forEach(clearTimeout);
      scheduledMessages.delete(player.id);
      respond('§e⚠ Stopped previous message loop.');
    }

    const timeouts = [];
    for (let i = 0; i < amount; i++) {
      const timeout = setTimeout(() => {
        try {
          player.upstream.queue('command_request', {
            command: `/me ${message}`,
            origin: { type: 5, uuid: "0", request_id: "0" },
            internal: false,
            version: 86
          });
        } catch (err) {
          console.error('[X] Error sending message:', err.message);
        }
      }, i * delay);
      timeouts.push(timeout);
    }

    scheduledMessages.set(player.id, timeouts);

    const duration = ((amount * delay) / 1000).toFixed(1);
    respond(
      `§a[OK] Scheduled ${amount} message(s)\n` +
      `§b"${message}"\n` +
      `§7Duration: ~${duration}s | Delay: ${delay}ms\n` +
      `§7Use §e!message stop §7to cancel`
    );
  }
};
