import React, { useState, useLayoutEffect, useEffect } from "react";
import { WebView } from "react-native-webview";
import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/atoms/Loading";
import { JKT48_SHOWROOM_WEB } from "@env";

const MultiShowroom = () => {
  const { setOptions } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setOptions({
      headerTitle: "Multi Showroom"
    });
  }, [setOptions]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box flex={1}>
      <WebView
        source={{ uri: `${JKT48_SHOWROOM_WEB}/multi-room?view_type=android` }}
        style={{ flex: 1, backgroundColor: "#282C34" }}
      />
      {isLoading && (
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
      )}
    </Box>
  );
};

export default MultiShowroom;
