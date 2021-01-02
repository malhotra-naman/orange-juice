const axios = require("axios");
const { MessageAttachment } = require("discord.js");
module.exports = async (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "|random") {
    axios
      .get("https://picsum.photos/200")
      .then((res) => {
        const attachment = new MessageAttachment(
          res.request._redirectable._currentUrl
        );
        msg.channel.send(attachment);
      })
      .catch((e) => console.log(e));
  }
};
