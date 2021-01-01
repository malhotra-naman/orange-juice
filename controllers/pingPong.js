module.exports = (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "ping") {
    msg.reply("pong");
  }
};
