const prefix = require("./prefix");
module.exports = (msg) => {
  if (msg.author.bot) return;
  if (msg.content === `${prefix}what is my avatar?`) {
    msg.reply(msg.author.displayAvatarURL());
  }
};
