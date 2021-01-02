const axios = require("axios");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
async function getYoutubeVideo(msg) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&type=video&part=snippet&maxResults=1&q=${msg}`;
    const res = await axios.get(url);
    const { videoId } = res.data.items[0].id;
    const searchUrl = `https://www.youtube.com/watch?v=${videoId}`;
    return searchUrl;
  } catch (e) {
    console.log(e);
  }
}

module.exports = getYoutubeVideo;
