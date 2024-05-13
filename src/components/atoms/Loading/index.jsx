import React from "react";
import { Box, Spinner } from "native-base";

const Loading = ({color = "primary"}) => {
  return (
    <Box flex="1" justifyContent="center" alignItems="center">
      <Spinner size={50} color={color} />
    </Box>
  );
};

export default Loading;
