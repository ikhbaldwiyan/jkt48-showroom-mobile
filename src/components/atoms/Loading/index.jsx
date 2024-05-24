import React from "react";
import { Box, Spinner } from "native-base";

const Loading = ({ size = 50, color = "primary"}) => {
  return (
    <Box flex="1" justifyContent="center" alignItems="center">
      <Spinner size={size} color={color} />
    </Box>
  );
};

export default Loading;
