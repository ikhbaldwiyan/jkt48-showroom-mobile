import React from 'react'
import { Box, Text } from "native-base";
import { TimesFill } from "../../../assets/icon";
import { getTimes } from "../../../utils/helpers";

const Times = ({start_time}) => {
  return (
    <Box 
      p="1" 
      px="2" 
      mx="2" 
      flexDir="row"
      alignItems="center" 
      bg="primary" 
      borderRadius="lg"
    >
      <TimesFill size={20} />
      <Text ml="1">
        {getTimes(start_time)}
      </Text>
    </Box>
  )
}

export default Times;