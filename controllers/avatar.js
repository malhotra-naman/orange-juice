module.exports = (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "what is my avatar") {
    msg.reply(msg.author.displayAvatarURL());
  }
};
