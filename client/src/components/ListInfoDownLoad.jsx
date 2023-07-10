import React, { Suspense, lazy } from "react";
import "../styles/ListInfoDownLoad.scss";

const TabDownload = lazy(() => import("../components/TabDownload"));
const ListRelatedVideos = lazy(() => import("../components/ListRelatedVideos"));
const Loader = lazy(() => import("../components/Loader"));

const ListInfoDownLoad = ({
  dataInfoDownload,
  video,
  audio,
  linkDownload,
  setLinkDownload,
}) => {
  return (
    <React.Fragment>
      {dataInfoDownload.titleVideo && dataInfoDownload.thumbnail ? (
        <div className="list_download">
          <div className="content_left">
            <img
              src={dataInfoDownload?.thumbnail}
              alt="thumbnail"
              className="thumbnail"
            />
            <h6 className="title_download">{dataInfoDownload?.titleVideo}</h6>
            <Suspense fallback={<Loader />}>
              <TabDownload
                video={video}
                audio={audio}
                linkDownload={linkDownload}
                titleVideo={dataInfoDownload.titleVideo}
                dataInfoDownload={dataInfoDownload}
              />
            </Suspense>
          </div>
          <div className="content_right">
            <ListRelatedVideos
              dataInfoDownload={dataInfoDownload}
              setLinkDownload={setLinkDownload}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default ListInfoDownLoad;
