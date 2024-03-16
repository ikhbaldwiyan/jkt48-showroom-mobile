import React from 'react'
import { HStack, Text } from "native-base"
import { UserIcon } from "../../../assets/icon"
import { formatViews } from "../../../utils/helpers"

const Views = ({ number }) => {
  return (
    <HStack bg="primary" px="2" h={30} justifyContent="center" alignItems="center" borderRadius={8}>
      <UserIcon />
      <Text ml="1" fontSize="14" fontWeight="semibold">
        {formatViews(number)}
      </Text>
    </HStack>
  )
}

export default Views