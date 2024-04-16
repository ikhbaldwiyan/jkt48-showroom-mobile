export const cleanImage = (image, isDetail) => {
  return isDetail
    ? image?.replace("m.jpeg", "l.jpeg")
    : image?.replace("s.jpeg", "l.jpeg");
};

export const formatName = (name, hideGroup) => {
  let memberName;
  !hideGroup
    ? memberName = name?.replace("JKT48_", "") + " JKT48"
    : memberName = name?.replace("JKT48_", "");
  return memberName;
};

export const formatViews = (str) => {
  const nf = new Intl.NumberFormat();
  const formatView = nf.format(str);
  const views = formatView.replace(/,/g, ".");

  return views;
};

export const getTimes = (times) => {
  function formatTime(n) {
    return n < 10 ? "0" + n : n;
  }

  function getTimes(dateInput) {
    var date = new Date(dateInput);
    var time = `${formatTime(date.getHours())}:${formatTime(
      date.getMinutes()
    )}`;
    return time;
  }

  var date = new Date();

  const hours = date.getHours() + ":" + date.getMinutes();
  const streamStarted = new Date(Date.now() - 1000 * (60 * 5));

  return times ? getTimes(times * 1000) : "TBD";
};

export const getLiveDuration = (start, end) => {
  // Given start and end dates
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Calculate the duration in milliseconds
  const duration = endDate - startDate;
  // Convert the duration to hours, minutes, and seconds
  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);

  // Output the live time duration
  let durationString = ``;
  if (hours > 0) {
    durationString += `${hours} hours, `;
  }
  durationString += `${minutes} minutes, ${seconds} seconds.`;

  return durationString;
};

export const getLiveDurationMinutes = (duration) => {
  const minutes = Math.floor(duration / 60000);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} minutes`;
  } else {
    return `${hours} hours ${remainingMinutes} minutes`;
  }
};
