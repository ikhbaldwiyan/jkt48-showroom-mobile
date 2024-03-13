export const cleanImage = (image, isDetail) => {
  return isDetail
    ? image?.replace("m.jpeg", "l.jpeg")
    : image?.replace("s.jpeg", "l.jpeg");
};

export const formatName = (name) => {
  return name?.replace("JKT48_", " ") + " JKT48";
};

export const formatViews = (str) => {
  const nf = new Intl.NumberFormat();
  const formatView = nf.format(str);
  const views = formatView.replace(/,/g, ".");

  return views;
};
