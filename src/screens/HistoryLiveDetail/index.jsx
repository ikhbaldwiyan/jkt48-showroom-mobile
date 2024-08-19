import React, { useLayoutEffect } from "react";
import { WebView } from "react-native-webview";
import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";

const HistoryLiveDetail = ({ route }) => {
  const { setOptions } = useNavigation();
  const { url, title } = route.params;

  useLayoutEffect(() => {
    setOptions({
      headerTitle: title,
    });
  }, [setOptions]);

  return (
    <Box flex={1}>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </Box>
  );
};

export default HistoryLiveDetail;
