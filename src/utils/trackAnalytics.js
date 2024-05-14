import analytics from "@react-native-firebase/analytics";

export default trackAnalytics = (event, data) => {
  analytics().logEvent(event, data);
};
