import React from "react";
import "../styles/ListRelatedVideos.scss";
import { useDispatch } from "react-redux";
import { getInfoDownload } from "../redux/actions/downloadAction";

const ListRelatedVideos = ({ dataInfoDownload, setLinkDownload }) => {
  const dispatch = useDispatch();

  const { relatedVideos } = dataInfoDownload;

  const handleClickInfoDownloadId = (videoId) => {
    setLinkDownload(`https://youtu.be/${videoId}`);
    dispatch(getInfoDownload({ query: videoId }));
  };

  return (
    <React.Fragment>
      <div className="list_related_videos">
        <p className="title_related">Video liên quan</p>
        <hr />
        <div className="content_related_videos">
          {relatedVideos &&
            relatedVideos.map((item, index) => {
              return (
                <div
                  className="related_video_card"
                  key={index}
                  onClick={() => handleClickInfoDownloadId(item.id)}
                >
                  <img
                    className="thumbnail_related"
                    src={item.thumbnails}
                    alt="thumbnail_related"
                  />
                  <p className="name_related">{item.title}</p>
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ListRelatedVideos;
