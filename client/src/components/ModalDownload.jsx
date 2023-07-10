import React, { lazy } from "react";

const LoaderProgress = lazy(() => import("./LoaderProgress"));
const LoaderInfoDownload = lazy(() =>
  import("../components/LoaderInfoDownload")
);

import { getDataAPI } from "../utils/fetchData";
import { useSelector } from "react-redux";

import { replaceTitleVideo } from "../utils/replaceTitleVideo";
import FileSaver from "file-saver";

const ModalDownload = ({
  loading,
  titleVideo,
  qualityDl,
  dataInfoDownload,
}) => {
  const { videoDL, audioDL } = useSelector((state) => state.download);

  const handleDownload = async () => {
    try {
      if (videoDL && videoDL.type === "mp4") {
        const title = replaceTitleVideo(titleVideo + qualityDl);
        const res = await getDataAPI(
          `download_file?title=${title}&type=${videoDL.type}`
        );
        const url = res.data.path;

        FileSaver.saveAs(`http://localhost:8000${url}.mp4`, `${title}.mp4`);
      } else if (audioDL && audioDL.type === "mp3") {
        const title = replaceTitleVideo(titleVideo + qualityDl);
        const res = await getDataAPI(
          `download_file?title=${title}&type=${audioDL.type}`
        );
        const url = res.data.path;

        FileSaver.saveAs(`http://localhost:8000${url}.mp3`, `${title}.mp3`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div className="modal_download">
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div class="modal-header ">
                <h6 class="modal-title text-center w-100 text-uppercase">
                  <span className="text-decoration-underline px-2 fw-bold text-danger">
                    Nội dung:
                  </span>
                  {`${titleVideo}`}
                </h6>
              </div>
              <div className="modal-body text-center">
                {loading ? (
                  <div className="d-flex flex-column align-items-center w-100 gap-2">
                    <LoaderProgress />
                    <LoaderInfoDownload />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={handleDownload}
                      className="border border-none outline-none rounded px-4 py-2"
                      style={{
                        backgroundColor: "var(--color-green)",
                        color: "var(--color-light)",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <i
                        className="fa-solid fa-download"
                        style={{ fontSize: "12px" }}
                      ></i>
                      <span style={{ fontSize: "var(--fs-md)" }}>
                        Tải xuống
                      </span>
                    </button>
                  </div>
                )}
              </div>
              <div class="modal-footer">
                <div className="content_thanks_modal">
                  <span
                    className="text-decoration-underline px-2 fw-bold text-success"
                    style={{ fontSize: "var(--fs-sm)" }}
                  >
                    Cảm ơn:
                  </span>
                  <span style={{ fontSize: "var(--fs-sm)" }}>
                    Chúng tôi xin chân thành cảm ơn vì đã sử dụng website của
                    chúng tôi. Sự ủng hộ và tin tưởng của Quý khách hàng là động
                    lực lớn để chúng tôi ngày càng hoàn thiện và cung cấp dịch
                    vụ tốt hơn.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalDownload;
