import React, { lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadVideo, downloadAudio } from "../redux/actions/downloadAction";
import "../styles/TabDownload.scss";

const ModalDownload = lazy(() => import("../components/ModalDownload"));
const Loader = lazy(() => import("../components/Loader"));

const TabDownload = ({
  video,
  audio,
  linkDownload,
  titleVideo,
  dataInfoDownload,
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.download);
  const [qualityDl, setQualityDl] = useState("");

  const sizeAudioMB = audio?.contentLength / (1024 * 1024);

  const handleClickDownloadVideo = (qualityItem) => {
    dispatch(downloadVideo({ url: linkDownload, quality: qualityItem }));
    setQualityDl(qualityItem);
  };

  const handleClickDownloadAudio = (qualityItem) => {
    dispatch(downloadAudio({ url: linkDownload, quality: qualityItem }));
    setQualityDl(qualityItem);
  };

  return (
    <React.Fragment>
      <div className="tab_download">
        <div className="group-tabs">
          {/*Nav tabs*/}
          <ul className="nav nav-tabs" role="tablist">
            <li role="presentation">
              <a
                href="#video"
                aria-controls="video"
                role="tab"
                data-bs-toggle="tab"
                className="active"
              >
                <i className="fa-solid fa-video"></i>
                <span>Video</span>
              </a>
            </li>
            <li role="presentation">
              <a
                href="#audio"
                aria-controls="audio"
                role="tab"
                data-bs-toggle="tab"
              >
                <i className="fa-solid fa-music"></i>
                <span>Audio</span>
              </a>
            </li>
          </ul>
          {/* Tab panes */}
          <div className="tab-content">
            <div
              role="tabpanel"
              className="tab-pane fade show active"
              id="video"
            >
              <table className="table_info_video">
                <thead>
                  <tr>
                    <th>Loại tệp</th>
                    <th>Kích thước</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {video &&
                    video?.map((item, index) => {
                      const sizeVideoMB = item.contentLength / (1024 * 1024);
                      return (
                        <tr key={index}>
                          <td>{item.quality}</td>
                          <td>{`${(sizeVideoMB + sizeAudioMB).toFixed(
                            2
                          )} MB`}</td>
                          <td>
                            <button
                              onClick={() =>
                                handleClickDownloadVideo(item.quality)
                              }
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              className="btn_action"
                            >
                              <i className="fa-regular fa-circle-down"></i>
                              <span>Tải xuống</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div role="tabpanel" className="tab-pane fade" id="audio">
              <table className="table_info_audio">
                <thead>
                  <tr>
                    <th>Loại tệp</th>
                    <th>Kích thước</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{audio.quality ? "MP3" : ""}</td>
                    <td>{`${sizeAudioMB.toFixed(2)} MB`}</td>
                    <td>
                      <button
                        onClick={() => handleClickDownloadAudio(audio.quality)}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        className="btn_action"
                      >
                        <i className="fa-regular fa-circle-down"></i>
                        <span>Tải xuống</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <ModalDownload
          loading={loading}
          titleVideo={titleVideo}
          qualityDl={qualityDl}
          dataInfoDownload={dataInfoDownload}
        />
      </Suspense>
    </React.Fragment>
  );
};

export default TabDownload;
