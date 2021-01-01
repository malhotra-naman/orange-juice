const { Client, MessageAttachment, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const client = new Client();
require("events").EventEmitter.defaultMaxListeners = 15;
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

//Server greeting
client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "member-log"
  );
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}!`);
});

//Replies pong on ping
client.on("message", (msg) => {
  if (message.author.bot) return;
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

//Replies with user's avatar link
client.on("message", (msg) => {
  if (msg.content === "what is my avatar") {
    if (message.author.bot) return;
    msg.reply(msg.author.displayAvatarURL());
  }
});

//sending an attachment
client.on("message", (msg) => {
  if (message.author.bot) return;
  if (msg.content === "|kirby") {
    const attachement = new MessageAttachment(
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/SSU_Kirby_artwork.png/220px-SSU_Kirby_artwork.png"
    );
    msg.channel.send(`${msg.author}`, attachement);
  }
});

client.on("message", (msg) => {
  if (message.author.bot) return;
  if (msg.content === "|random") {
    const attachement = new MessageAttachment("https://picsum.photos/200");
    msg.channel.send(attachement);
  }
});

//message embed
client.on("message", (msg) => {
  if (message.author.bot) return;
  if (msg.content === "who made you?") {
    const embed = new MessageEmbed()
      .setTitle("Orange Juice")
      .setColor("#f77f00")
      .setDescription("A bot by Naman Malhotra");
    msg.channel.send(embed);
  }
});

//kicking and banning
client.on("message", (msg) => {
  if (message.author.bot) return;
  if (!msg.guild) return;
  if (msg.content.startsWith("|kick")) {
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
});

client.on("message", (msg) => {
  if (message.author.bot) return;
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
});

client.on("message", async (msg) => {
  if (message.author.bot) return;
  if (!msg.guild) return;
  if (msg.content.startsWith("|join")) {
    const url = msg.content.substring(6);
    if (msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.join();

      console.log("Connection Successful!");

      const dispatcher = connection.play(ytdl(url, { filter: "audioonly" }));
      client.on("message", async (msg) => {
        if (message.author.bot) return;
        if (msg.content == "|pause") {
          dispatcher.pause();
        }
      });
      client.on("message", async (msg) => {
        if (message.author.bot) return;
        if (msg.content == "|resume") {
          dispatcher.resume();
        }
      });
      client.on("message", async (msg) => {
        if (message.author.bot) return;
        if (msg.content.startsWith("|volume")) {
          const volume = parseFloat(msg.content.substring(8));
          dispatcher.setVolume(volume);
        }
      });
      client.on("finish", () => {
        console.log("Finished playing!");
        dispatcher.destroy();
      });
    }
  } else {
    msg.reply("You need to join a voice channel first!");
  }
});

client.login(process.env.BOT_TOKEN);
