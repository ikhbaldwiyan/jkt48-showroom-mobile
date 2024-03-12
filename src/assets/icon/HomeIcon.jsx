import React from 'react'
import { SvgXml } from 'react-native-svg';

const HomeIcon = () => {
  return (
    <SvgXml xml={`
      <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.6836 10.8359L12.0297 1.18907C11.9602 1.11942 11.8776 1.06417 11.7867 1.02647C11.6958 0.988766 11.5984 0.96936 11.5 0.96936C11.4016 0.96936 11.3042 0.988766 11.2133 1.02647C11.1224 1.06417 11.0398 1.11942 10.9703 1.18907L1.31642 10.8359C1.03517 11.1172 0.875793 11.4992 0.875793 11.8977C0.875793 12.725 1.54845 13.3977 2.37579 13.3977H3.39298V20.2813C3.39298 20.6961 3.72814 21.0313 4.14298 21.0313H10V15.7813H12.625V21.0313H18.857C19.2719 21.0313 19.607 20.6961 19.607 20.2813V13.3977H20.6242C21.0227 13.3977 21.4047 13.2406 21.6859 12.957C22.2695 12.3711 22.2695 11.4219 21.6836 10.8359Z" fill="#24A2B7"/>
      </svg>
    `} />
  )
}

export default HomeIcon