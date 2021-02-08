const { MessageAttachment } = require("discord.js");
const prefix = require("./prefix");
module.exports = (msg) => {
  if (msg.author.bot) return;
  if (msg.content === `${prefix}kirby`) {
    const attachement = new MessageAttachment(
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/SSU_Kirby_artwork.png/220px-SSU_Kirby_artwork.png"
    );
    msg.channel.send(`${msg.author}`, attachement);
  }
};
