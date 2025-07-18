import useApiConfig from "../store/useApiConfig";

export const cleanImage = (image, isDetail) => {
  return isDetail
    ? image?.replace("m.jpeg", "l.jpeg")
    : image?.replace("s.jpeg", "l.jpeg");
};

export const formatName = (name, hideGroup) => {
  let memberName;

  if (name === "JKT48") {
    return "JKT48";
  }

  if (name === "JKT48_OlineM") {
    return "Oline";
  }

  if (name === "officialJKT48") {
    return "JKT48"
  }

  !hideGroup
    ? (memberName = name ? name?.replace("JKT48_", "") + " JKT48" : "Loading")
    : (memberName = name?.includes("JKT48_")
      ? name?.replace("JKT48_", "")
      : name?.replace("JKT48", ""));
  return memberName;
};

export const formatViews = (str) => {
  const nf = new Intl.NumberFormat();
  const formatView = nf.format(str ?? 0);
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
    return `${remainingMinutes} menit`;
  } else {
    return `${hours} jam ${remainingMinutes} menit`;
  }
};

export const parseDescription = (description) => {
  const result = description
    .split("\r\n")
    .map((item) => item.replace(/"/g, "").split(":"))
    .filter((item) => item.length > 1)
    .map((item) => {
      if (item[0] === "Twitter" || item[0] === "Instagram") {
        return [item[0], item.pop()];
      }
      return item;
    });

  return Object.fromEntries(result);
};

export const getSquareImage = (image) => {
  return image?.replace("_m.jpeg", "_square_m.jpeg");
};

export const getIDNLiveTime = (value) => {
  function format_two_digits(n) {
    return n < 10 ? "0" + n : n;
  }

  var dt = new Date(value);

  var time =
    format_two_digits(dt.getHours()) + ":" + format_two_digits(dt.getMinutes());
  return time;
};

export const monthNames = [
  { name: "January", short: "01" },
  { name: "February", short: "02" },
  { name: "March", short: "03" },
  { name: "April", short: "04" },
  { name: "May", short: "05" },
  { name: "June", short: "06" },
  { name: "July", short: "07" },
  { name: "August", short: "08" },
  { name: "September", short: "09" },
  { name: "October", short: "10" },
  { name: "November", short: "11" },
  { name: "December", short: "12" }
];

export const hasMultiRoomAccess = (profile) => {
  const { MINIMUM_WATCH_MULTI_lIVE, IS_MULTI_LIVE_RELEASE, IS_MULTI_LIVE_CLOSED } = useApiConfig.getState();

  if (IS_MULTI_LIVE_CLOSED) {
    return false
  }

  if (profile?.is_donator ||
    profile?.is_developer ||
    profile?.top_leaderboard ||
    profile?.can_farming_multi ||
    profile?.is_multi_live || profile?.can_3_room || profile?.totalWatchLive >= MINIMUM_WATCH_MULTI_lIVE || IS_MULTI_LIVE_RELEASE) {
    return true;
  } else {
    return false;
  }
}