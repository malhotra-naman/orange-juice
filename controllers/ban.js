module.exports = (msg) => {
  if (msg.author.bot) return;
  if (!msg.guild) return;
  if (msg.content.startsWith("|ban")) {
    const user = msg.mentions.users.first();
    if (user) {
      const member = msg.guild.member(user);
      if (member) {
        member
          .ban({ reason: "They were bad! :O" })
          .then(() => {
            msg.reply(`Successfully banned ${user.tag}`);
          })
          .catch((err) => {
            msg.reply("I was unable to ban the member");
            console.log(err);
          });
      } else {
        msg.reply("That user is not present in the guild dumbo!");
      }
    } else {
      msg.reply("You didn't mention the person to ban!");
    }
  }
};
