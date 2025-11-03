import React from "react"

import { IconProps } from "types/icon"

const ChevronDown: React.FC<IconProps> = ({
  size = "24",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.46973 9.26525L6.53039 8.20459L12.0001 13.6743L17.4697 8.20459L18.5304 9.26525L12.0001 15.7956L5.46973 9.26525Z"
        fill={color}
      />
    </svg>
  )
}

export default ChevronDown
