module.exports = {
  name: "skinanim",
  execute(player, args, respond, proxy) {
    const enabled = proxy.toggleSkinAnim()
    respond(`§bSkin AnimatedImageData is now §l${enabled ? "ENABLED" : "DISABLED"}§r`)
  }
}
