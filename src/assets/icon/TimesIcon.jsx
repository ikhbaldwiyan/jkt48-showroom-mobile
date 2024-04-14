import React from 'react'
import { SvgXml } from 'react-native-svg';

const TimesIcon = ({ size }) => {
  return (
    <SvgXml xml={`
      <svg width=${size ?? "18"} height=${size ?? "18"} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 0.28125C4.18359 0.28125 0.28125 4.18359 0.28125 9C0.28125 13.8164 4.18359 17.7188 9 17.7188C13.8164 17.7188 17.7188 13.8164 17.7188 9C17.7188 4.18359 13.8164 0.28125 9 0.28125ZM9 16.0312C5.11523 16.0312 1.96875 12.8848 1.96875 9C1.96875 5.11523 5.11523 1.96875 9 1.96875C12.8848 1.96875 16.0312 5.11523 16.0312 9C16.0312 12.8848 12.8848 16.0312 9 16.0312ZM11.1727 12.3609L8.18789 10.1918C8.07891 10.1109 8.01562 9.98438 8.01562 9.85078V4.07812C8.01562 3.84609 8.20547 3.65625 8.4375 3.65625H9.5625C9.79453 3.65625 9.98438 3.84609 9.98438 4.07812V9.05977L12.3328 10.7684C12.5227 10.9055 12.5613 11.1691 12.4242 11.359L11.7633 12.2695C11.6262 12.4559 11.3625 12.498 11.1727 12.3609Z" fill="white"/>
      </svg>
    `} />
  )
}

export default TimesIcon