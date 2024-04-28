import React from "react";
import { Box, Spinner } from "native-base";

const Loading = () => {
  return (
    <Box flex="1" justifyContent="center" alignItems="center">
      <Spinner size={50} color="white" />
    </Box>
  );
};

export default Loading;
