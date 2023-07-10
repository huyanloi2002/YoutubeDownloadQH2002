const router = require("express").Router();
const youtubeDownloaderCtrl = require("../controllers/youtubeDownloaderCtrl");

router.get("/info", youtubeDownloaderCtrl.infoDownload);
router.post("/download_video", youtubeDownloaderCtrl.downloadVideo);
router.post("/download_audio", youtubeDownloaderCtrl.downloadAudio);
router.get("/download_file", youtubeDownloaderCtrl.downloadFile);

module.exports = router;
