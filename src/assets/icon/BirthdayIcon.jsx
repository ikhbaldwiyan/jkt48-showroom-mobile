import React from 'react'
import { SvgXml } from 'react-native-svg';

const BirthdayIcon = () => {
  return (
    <SvgXml xml={`
      <svg width="18" height="20" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5 18C20.1866 18 20.0347 16.5 18.0078 16.5C15.972 16.5 15.8129 18 14.5039 18C13.2057 18 13.0295 16.5 11 16.5C8.99178 16.5 8.78666 18 7.50781 18C6.18837 18 6.04522 16.5 4.00391 16.5C1.96264 16.5 1.81705 18 0.5 18V14.25C0.5 13.0078 1.50781 12 2.75 12H3.5V5.25H6.5V12H9.5V5.25H12.5V12H15.5V5.25H18.5V12H19.25C20.4922 12 21.5 13.0078 21.5 14.25V18ZM21.5 24H0.5V19.5C2.53231 19.5 2.6922 18 4.00391 18C5.31411 18 5.46889 19.5 7.50781 19.5C9.51608 19.5 9.72111 18 11 18C12.3194 18 12.4625 19.5 14.5039 19.5C16.5363 19.5 16.6961 18 18.0078 18C19.2963 18 19.4727 19.5 21.5 19.5V24ZM5 4.5C4.16797 4.5 3.5 3.83203 3.5 3C3.5 1.54688 5 1.92188 5 0C5.5625 0 6.5 1.38281 6.5 2.625C6.5 3.86719 5.83203 4.5 5 4.5ZM11 4.5C10.168 4.5 9.5 3.83203 9.5 3C9.5 1.54688 11 1.92188 11 0C11.5625 0 12.5 1.38281 12.5 2.625C12.5 3.86719 11.832 4.5 11 4.5ZM17 4.5C16.168 4.5 15.5 3.83203 15.5 3C15.5 1.54688 17 1.92188 17 0C17.5625 0 18.5 1.38281 18.5 2.625C18.5 3.86719 17.832 4.5 17 4.5Z" fill="white"/>
      </svg>
    `} />
  )
}

export default BirthdayIcon