import React from 'react'
import { Box } from "native-base"
import Header from "../Header"

const Layout = ({ children }) => {
  return (
    <Box flex="1" bg="secondary">
      <Header />
      {children}
    </Box>
  )
}

export default Layout