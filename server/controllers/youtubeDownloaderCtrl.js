const ytdl = require("ytdl-core");
const fs = require("fs");
const replaceTitleVideo = require("../utils/replaceTitleVideo");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const youtubeDownloaderCtrl = {
  infoDownload: async (req, res) => {
    try {
      const videoURL = req.query.url;
      const videoId = req.query.id;

      let infoVideo;
      if (videoURL) {
        const checkUrlYoutube =
          /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/;

        if (!checkUrlYoutube.test(videoURL)) {
          return res.status(404).json({
            msg: "Không tìm thấy địa chỉ URL",
          });
        }

        infoVideo = await ytdl.getInfo(videoURL);
      }
      if (videoId) {
        const urlId = `https://youtu.be/${videoId}`;
        const checkUrlYoutube =
          /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/;

        if (!checkUrlYoutube.test(urlId)) {
          return res.status(404).json({
            msg: "Không tìm thấy địa chỉ URL",
          });
        }

        infoVideo = await ytdl.getInfo(urlId);
      }

      const titleVideo = infoVideo.videoDetails.title;
      const idVideo = infoVideo.videoDetails.videoId;
      const thumbnail = infoVideo.videoDetails.thumbnails;
      const urlVideo = infoVideo.videoDetails.video_url;

      const videos = infoVideo.formats.map((fm) => ({
        idTag: fm.itag,
        quality: fm.qualityLabel || fm.audioQuality || "Unknown",
        container: fm.container,
        contentLength: fm.contentLength,
        hasAudio: fm.hasAudio,
      }));

      const videoWEBM = videos.filter(
        (vd) => vd.container === "webm" && vd.hasAudio === false
      );
      const audioWEBM = videos.filter(
        (vd) => vd.container === "webm" && vd.hasAudio === true
      );

      const relatedVideos = infoVideo.related_videos.map((rv) => ({
        id: rv.id,
        title: rv.title,
        thumbnails: rv.thumbnails[1].url,
      }));

      const downloadData = {
        idVideo,
        titleVideo,
        thumbnail: thumbnail[thumbnail.length - 1].url,
        videoWEBM,
        audioWEBM: audioWEBM[0],
        relatedVideos,
        urlVideo,
      };
      res.json({ downloadData });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  downloadVideo: async (req, res) => {
    try {
      const videoURL = req.body.url;
      const qualityVideo = req.body.quality;

      const info = await ytdl.getInfo(videoURL);

      if (!info) {
        return res.status(404).json({
          msg: "Không thể tìm thấy video",
        });
      }

      const title = info.videoDetails.title;

      const formatVideo = info.formats.find(
        (fm) => fm.qualityLabel === qualityVideo && fm.container === "webm"
      );

      const videoFilePath = `public/video/${replaceTitleVideo(title)}.mp4`;
      const videoStream = ytdl(videoURL, { format: formatVideo });

      videoStream.pipe(fs.createWriteStream(videoFilePath));

      videoStream.on("end", () => {
        console.log("Tải xuống video hoàn tất");

        const audioFilePath = `public/video/${replaceTitleVideo(title)}.mp3`;
        const audioStream = ytdl(videoURL, { filter: "audioonly" });
        audioStream.pipe(fs.createWriteStream(audioFilePath));

        audioStream.on("end", () => {
          console.log("Tải xuống audio hoàn tất");

          const videoAndAudioFilePath = `public/video/${replaceTitleVideo(
            title + " " + qualityVideo
          )}.mp4`;

          const videoAndAudioStream = ffmpeg()
            .input(videoFilePath)
            .input(audioFilePath)
            .outputOptions("-c:v copy")
            .outputOptions("-c:a aac")
            .outputOptions("-strict -2")
            .save(videoAndAudioFilePath);

          videoAndAudioStream.on("progress", (progress) => {
            // socket.to(`${socketId}`).emit("progress", progress);
          });

          videoAndAudioStream.on("end", () => {
            fs.unlinkSync(videoFilePath);
            fs.unlinkSync(audioFilePath);

            res.json({
              msg: "Xuất video thành công",
              success: true,
              type: "mp4",
            });
          });
          videoAndAudioStream.on("error", () => {
            return res.status(404).json({
              msg: "Lỗi khi xuất video",
            });
          });
        });
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },

  downloadAudio: async (req, res) => {
    const videoURL = req.body.url;
    const qualityAudio = req.body.quality;

    try {
      const info = await ytdl.getInfo(videoURL);

      if (!info) {
        return res.status(404).json({
          msg: "Không thể tìm thấy video",
        });
      }

      const formatAudio = info.formats.find(
        (fm) => fm.audioQuality === qualityAudio && !fm.qualityLabel
      );

      const titleAudio = info.videoDetails.title;

      const stream = ytdl(videoURL, { format: formatAudio });

      stream.pipe(
        fs.createWriteStream(
          `public/audio/${replaceTitleVideo(
            titleAudio + " " + qualityAudio
          )}.mp3`
        )
      );

      stream.on("end", () => {
        res.json({
          msg: "Xuất audio thành công",
          success: true,
          type: "mp3",
        });
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  downloadFile: async (req, res) => {
    try {
      const title = req.query.title;
      const type = req.query.type;
      const path = `/public/${type === "mp4" ? "video" : "audio"}/${title}`;
      res.json({
        path,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },
};
module.exports = youtubeDownloaderCtrl;
