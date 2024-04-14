import React from 'react'
import { SvgXml } from 'react-native-svg';

const RightArrow = () => {
  return (
    <SvgXml xml={`
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="18" height="18" fill="url(#pattern0_103_2517)"/>
        <defs>
        <pattern id="pattern0_103_2517" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_103_2517" transform="scale(0.0104167)"/>
        </pattern>
        <image id="image0_103_2517" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAtklEQVR4nO3YwQ2DMBREQTpPjun655ACcCzQrsRMAcbyA2M4DgAAAAAAAAAAAAAAgIeZmU96Do82PyKEA4hQEECEggAiFAQQoSCACAUBRCgIIEJBABEKAohQEGAvwp8X4OoICwNyZ4SNwbkywuJg3BVhc2DWvARoXnxPQHjxBQgvPucsfpg7P8y2E2bPD/PCDXPaCXPUDHPOD/ORFeYLN8zvhbCZeafnAAAAAAAAAAAAAAAAHFW+iaEkFbNXv+oAAAAASUVORK5CYII="/>
        </defs>
      </svg>
    `} />
  )
}

export default RightArrow