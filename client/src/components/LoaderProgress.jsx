import React from "react";
import "../styles/LoaderProgress.scss";

const LoaderProgress = () => {
  return (
    <React.Fragment>
      <div className="load_progress">
        <div className="progress"></div>
        <div className="progress_load"></div>
      </div>
    </React.Fragment>
  );
};

export default LoaderProgress;
