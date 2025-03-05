import firestore from "@react-native-firebase/firestore";
import useApiConfig from "../store/useApiConfig";

const fetchApiConfig = async () => {
  try {
    const document = await firestore()
      .collection("app_config")
      .doc("env")
      .get();

    if (document.exists) {
      const config = document.data();
      useApiConfig.getState().setApiConfig(config);
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching API config:", error);
  }
};

export default fetchApiConfig;
