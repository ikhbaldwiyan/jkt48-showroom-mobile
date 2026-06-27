import { JKT48_SHOWROOM_WEB } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box } from "native-base";
import { useEffect, useLayoutEffect, useState } from "react";
import WebView from "react-native-webview";
import Loading from "../../components/atoms/Loading";
import moment from "moment";

const ReplayDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route?.params || {};
  const videoId = item?.youtube_id ?? item?.id;
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Replay ${item?.member} - ${moment(item?.date).format(
        "DD MMMM YYYY"
      )}`,
    });
  }, [item]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box bg="secondary" flex={1}>
      {isLoading ? (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          justifyContent="center"
          alignItems="center"
          bg="secondary"
        >
          <Loading color="white" />
        </Box>
      ) : (
        <WebView
          allowsFullscreenVideo
          source={{
            uri: `${JKT48_SHOWROOM_WEB}/replay/${item?.member?.toLowerCase()}/${videoId}?view_type=android`,
          }}
          style={{ flex: 1, backgroundColor: "#282C34" }}
        />
      )}
    </Box>
  );
};

export default ReplayDetail;
