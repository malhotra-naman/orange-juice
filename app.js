if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { Client } = require("discord.js");
const ytdl = require("ytdl-core");
const kick = require("./controllers/kick");
const ban = require("./controllers/ban");
const greet = require("./controllers/greet");
const pingPong = require("./controllers/pingPong");
const avatar = require("./controllers/avatar");
const kirby = require("./controllers/kirby");
const random = require("./controllers/random");
const messageEmbed = require("./controllers/messageEmbed");
const getYoutubeVideo = require("./controllers/youtubeSeach");
const help = require("./controllers/help");
const client = new Client();
const prefix = "`";
require("events").EventEmitter.defaultMaxListeners = 20;
const queue = new Map();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  //Status
  client.user
    .setActivity(`${prefix}help`, { type: "PLAYING" })
    .then((presence) =>
      console.log(`Activity set to ${presence.activities[0].name}`)
    )
    .catch(console.error);
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

//Server greeting
client.on("guildMemberAdd", greet);

//Help
client.on("message", help);

//Replies pong on ping
client.on("message", pingPong);

//Replies with user's avatar link
client.on("message", avatar);

//sending an attachment
client.on("message", kirby);

//random
client.on("message", random);

//message embed
client.on("message", messageEmbed);

//kicking and banning
client.on("message", kick);

client.on("message", ban);

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (!msg.guild) return;
  const serverQueue = queue.get(msg.guild.id);
  if (msg.content.startsWith(`${prefix}play`)) {
    execute(msg, serverQueue);
    return;
  } else if (msg.content.startsWith(`${prefix}skip`)) {
    skip(msg, serverQueue);
    return;
  } else if (msg.content.startsWith(`${prefix}stop`)) {
    stop(msg, serverQueue);
    return;
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  if (!args[1].startsWith("https://")) {
    const url = await getYoutubeVideo(message);
    args[1] = url;
  }

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url,
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );

  if (!serverQueue)
    return message.channel.send("There is no song that I could stop!");

  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url, { filter: "audioonly" }))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  client.on("message", async (msg) => {
    if (msg.author.bot) return;
    if (msg.content.startsWith(`${prefix}volume`)) {
      const volume = parseFloat(msg.content.substring(8));
      dispatcher.setVolume(volume);
    }
  });
  client.on("message", async (msg) => {
    if (msg.author.bot) return;
    if (msg.content == `${prefix}pause`) {
      dispatcher.pause();
    }
  });
  client.on("message", async (msg) => {
    if (msg.author.bot) return;
    if (msg.content == `${prefix}resume`) {
      dispatcher.resume();
    }
  });
}

client.login(process.env.BOT_TOKEN);
