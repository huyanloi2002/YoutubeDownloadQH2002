import { TYPES } from "../actions/actionTypes";

const initialState = {
  loading: false,
  videoDL: {},
  audioDL: {},
  error: null,
  percent: 0,
};

const downloadReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.DOWNLOAD_VIDEO_REQUEST:
    case TYPES.DOWNLOAD_AUDIO_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case TYPES.DOWNLOAD_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videoDL: action.payload,
        error: null,
      };
    case TYPES.DOWNLOAD_AUDIO_SUCCESS:
      return {
        ...state,
        loading: false,
        audioDL: action.payload,
        error: null,
      };
    case TYPES.DOWNLOAD_VIDEO_FAIL:
    case TYPES.DOWNLOAD_AUDIO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default downloadReducer;
