import React from 'react'
import { SvgXml } from 'react-native-svg';

const SendIcon = () => {
  return (
    <SvgXml xml={`
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.439 2.62195L18.2703 17.5657C18.0312 18.6204 17.4078 18.8829 16.5218 18.386L11.6937 14.8282L9.36403 17.0688C9.10622 17.3266 8.89059 17.5423 8.39372 17.5423L8.74059 12.6251L17.689 4.53914C18.0781 4.19226 17.6047 4.00008 17.0843 4.34695L6.02184 11.3126L1.25934 9.82195C0.223404 9.49851 0.204654 8.78601 1.47497 8.28914L20.1031 1.11258C20.9656 0.789139 21.7203 1.30476 21.439 2.62195Z" stroke="white"/>
      </svg>
    `} />
  )
}

export default SendIcon