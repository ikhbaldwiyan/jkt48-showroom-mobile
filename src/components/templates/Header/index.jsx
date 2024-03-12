import React, { Component } from 'react'
import { Box, Image, Text } from "native-base"
import Logo from "../../atoms/Logo"
import UserIcon from "../../../assets/image/ava.png";

const Header = () => {
  return (
    <Box p="4" bg="black" flexDirection="row" justifyContent="space-between" alignItems="center">
      <Logo isHeader />
      <Box flexDirection="row" alignItems="center">
        <Text color="white" fontWeight="semibold" mr="2">Inzoid</Text>
        <Image style={{ width: 40, height: 40 }} source={UserIcon} alt="avatar" />
      </Box>
    </Box>
  )
}

export default Header