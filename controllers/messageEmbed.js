const { MessageEmbed } = require("discord.js");
const prefix = require("./prefix");
module.exports = (msg) => {
  if (msg.author.bot) return;
  if (msg.content === `${prefix}who made you?`) {
    const embed = new MessageEmbed()
      .setTitle("Orange Juice")
      .setColor("#f77f00")
      .setDescription("A bot by Naman Malhotra");
    msg.channel.send(embed);
  }
};
