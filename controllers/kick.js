module.exports = (msg) => {
  if (msg.author.bot) return;
  if (!msg.guild) return;
  if (msg.content.startsWith(`${prefix}kick`)) {
    const user = msg.mentions.users.first();
    if (user) {
      const member = msg.guild.member(user);
      if (member) {
        member
          .kick({ reason: "They were bad!" })
          .then(() => {
            msg.reply(`Successfully kicked ${user.tag}`);
          })
          .catch((err) => {
            msg.reply("I was unable to kick the member");
            console.log(err);
          });
      } else {
        msg.reply("That user is not present in the guild dumbo!");
      }
    } else {
      msg.reply("You didn't mention the person to kick!");
    }
  }
};
