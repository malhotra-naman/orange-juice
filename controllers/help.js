const prefix = require("./prefix");

module.exports = (msg) => {
  if (msg.author.bot) return;
  if (msg.content === `${prefix}help`) {
    msg.channel.send(
      `Try the following commands! - ${prefix}what is my avatar?, ${prefix}kirby, ${prefix}who made you?, ${prefix}ping, ${prefix}random. To play songs - ${prefix}play, ${prefix}resume, ${prefix}pause, ${prefix}skip, ${prefix}volume. :D`
    );
  }
};
