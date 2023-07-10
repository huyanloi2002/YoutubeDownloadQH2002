export const replaceTitleVideo = (string) => {
  if (string) {
    return string.replace(/[^\w]/g, "");
  }
};
