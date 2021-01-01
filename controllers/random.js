module.exports = (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "|random") {
    const attachement = new MessageAttachment("https://picsum.photos/200");
    msg.channel.send(attachement);
  }
};
