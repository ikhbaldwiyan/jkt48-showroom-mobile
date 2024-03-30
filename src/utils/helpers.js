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

export const getTimes = (times) => {
  function formatTime(n) {
    return n < 10 ? '0' + n : n;
  }

  function getTimes(dateInput) {
    var date = new Date(dateInput);
    var time = `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
    return time;
  }

  var date = new Date();

  const hours = date.getHours() + ':' + date.getMinutes();
  const streamStarted = new Date(Date.now() - 1000 * (60 * 5) ) 

  return times ? getTimes(times * 1000) : 'TBD';
}
