import { TYPES } from "./actionTypes";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";

export const getInfoDownload =
  ({ query }) =>
  async (dispatch) => {
    let url, id;
    if (query) {
      const checkUrlYoutube =
        /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/;
      if (checkUrlYoutube.test(query)) {
        url = query;
      } else {
        id = query;
      }
    }
    try {
      dispatch({ type: TYPES.GET_INFO_DOWNLOAD_REQUEST, loading: true });
      const res = await getDataAPI(
        `info?${url ? "url" : "id"}=${url ? url : id}`
      );
      if (res && res.status === 200) {
        dispatch({
          type: TYPES.GET_INFO_DOWNLOAD_SUCCESS,
          payload: res.data.downloadData,
        });
      } else {
        dispatch({
          type: TYPES.GET_INFO_DOWNLOAD_FAIL,
          payload: res.data.msg,
        });
      }
    } catch (err) {
      dispatch({
        type: TYPES.GET_INFO_DOWNLOAD_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

export const downloadVideo =
  ({ url, quality }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: TYPES.DOWNLOAD_VIDEO_REQUEST,
        loading: true,
      });
      const res = await postDataAPI("download_video", { url, quality });

      if (res && res.status === 200) {
        dispatch({
          type: TYPES.DOWNLOAD_VIDEO_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: TYPES.DOWNLOAD_VIDEO_FAIL,
          payload: res.data.msg,
        });
      }
    } catch (err) {
      dispatch({
        type: TYPES.DOWNLOAD_VIDEO_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

export const downloadAudio =
  ({ url, quality }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: TYPES.DOWNLOAD_AUDIO_REQUEST,
        loading: true,
      });
      const res = await postDataAPI("download_audio", { url, quality });

      if (res && res.status === 200) {
        dispatch({
          type: TYPES.DOWNLOAD_AUDIO_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: TYPES.DOWNLOAD_AUDIO_FAIL,
          payload: res.data.msg,
        });
      }
    } catch (err) {
      dispatch({
        type: TYPES.DOWNLOAD_AUDIO_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
