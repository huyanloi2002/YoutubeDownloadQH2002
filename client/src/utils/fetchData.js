import axios from "axios";

export const getDataAPI = async (url, data) => {
  const res = await axios.get(`/api/qhuy19112002/youtube_downloader/v1/${url}`);
  return res;
};
export const postDataAPI = async (url, data) => {
  const res = await axios.post(
    `/api/qhuy19112002/youtube_downloader/v1/${url}`,
    data
  );
  return res;
};
