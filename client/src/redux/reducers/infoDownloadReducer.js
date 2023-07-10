import { TYPES } from "../actions/actionTypes";

const initialState = {
  loading: false,
  dataInfoDownload: {},
  error: null,
};

const infoDownloadReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_INFO_DOWNLOAD_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case TYPES.GET_INFO_DOWNLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        dataInfoDownload: action.payload,
        error: null,
      };
    case TYPES.GET_INFO_DOWNLOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default infoDownloadReducer;
