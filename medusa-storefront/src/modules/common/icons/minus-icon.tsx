import { IconProps } from "types/icon"

export default function MinusIcon({
  size = "24",
  color = "currentColor",
  ...attributes
}: IconProps) {
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
        d="M19 12.75H5V11.25H19V12.75Z"
        fill={color}
      />
    </svg>
  )
}
