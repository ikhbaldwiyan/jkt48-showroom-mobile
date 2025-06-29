import { useWindowDimensions } from "react-native";

const useLandscape = () => {
  const { width, height } = useWindowDimensions();
  return width > height;
};

export default useLandscape; 