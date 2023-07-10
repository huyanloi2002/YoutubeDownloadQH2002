import { combineReducers } from "redux";
import infoDownload from "./infoDownloadReducer";
import download from "./downloadReducer";

export default combineReducers({
  infoDownload,
  download,
});
