import { TYPES } from "../actions/actionTypes";

const initialState = {
  loading: false,
  dataInfoDownloadId: {},
  error: null,
};

const infoDownloadIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_INFO_DOWNLOAD_ID_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case TYPES.GET_INFO_DOWNLOAD_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        dataInfoDownloadId: action.payload,
        error: null,
      };
    case TYPES.GET_INFO_DOWNLOAD_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default infoDownloadIdReducer;
