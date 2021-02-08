const prefix = require("./prefix");
module.exports = (msg) => {
  if (msg.author.bot) return;
  if (msg.content === `${prefix}ping`) {
    msg.reply("pong");
  }
};
