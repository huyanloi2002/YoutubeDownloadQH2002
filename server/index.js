require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

app.use(
  "/api/qhuy19112002/youtube_downloader/v1",
  require("./routes/youtubeDownloaderRouter")
);
app.use("/public", express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log("Server listening on port: ", port);
});
