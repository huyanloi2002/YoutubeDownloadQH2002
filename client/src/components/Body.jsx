import React, { Suspense, lazy, useEffect, useState } from "react";
import "../styles/Body.scss";
import { useDispatch, useSelector } from "react-redux";
import { getInfoDownload } from "../redux/actions/downloadAction";

const ListInfoDownLoad = lazy(() => import("../components/ListInfoDownLoad"));
const LoaderInfoDownload = lazy(() =>
  import("../components/LoaderInfoDownload")
);
const Error = lazy(() => import("../components/Error"));

const Body = () => {
  const dispatch = useDispatch();
  const { dataInfoDownload, loading, error } = useSelector(
    (state) => state.infoDownload
  );
  const [video, setVideo] = useState([]);
  const [audio, setAudio] = useState({});

  useEffect(() => {
    if (dataInfoDownload && dataInfoDownload.videoWEBM) {
      const { videoWEBM, audioWEBM } = dataInfoDownload;
      setVideo(videoWEBM);
      setAudio(audioWEBM);
    }
  }, [dataInfoDownload]);

  const [linkDownload, setLinkDownload] = useState("");

  useEffect(() => {
    if (linkDownload) {
      dispatch(getInfoDownload({ query: linkDownload }));
    }
  }, [dispatch, linkDownload]);

  const pasteContent = async () => {
    const text = await navigator.clipboard.readText();
    setLinkDownload(text);
  };
  return (
    <React.Fragment>
      <div className="body_youtube_downloader container">
        <div className="content_youtube_downloader">
          <h2 className="title_download mb-3">
            Trình tải xuống video, audio của Youtube
          </h2>
          <div className="form_info_download">
            <div className="form-group">
              <input
                type="text"
                id="inputInfoDownload"
                className="form-control input_get_info"
                placeholder="Vui lòng nhập thông tin liên kết."
                autoComplete="off"
                name="linkDownload"
                value={linkDownload}
                onChange={(e) => setLinkDownload(e.target.value)}
              />
              <button className="btn_get_info" onClick={() => pasteContent()}>
                <i className="fa-regular fa-paste"></i>
                <p>Dán</p>
              </button>
            </div>
          </div>
          {!loading ? (
            <div>
              {!error ? (
                <Suspense fallback={<LoaderInfoDownload />}>
                  <ListInfoDownLoad
                    video={video}
                    audio={audio}
                    dataInfoDownload={dataInfoDownload}
                    linkDownload={linkDownload}
                    setLinkDownload={setLinkDownload}
                  />
                </Suspense>
              ) : (
                <Suspense fallback={<LoaderInfoDownload />}>
                  <Error error={error} />
                </Suspense>
              )}
            </div>
          ) : (
            <LoaderInfoDownload />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Body;
