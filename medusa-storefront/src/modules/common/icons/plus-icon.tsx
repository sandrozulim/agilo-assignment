import { IconProps } from "types/icon"

export default function PlusIcon({
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
        d="M11.25 18.8132V11.8132V4.81323H12.75V18.8132H11.25Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 12.5632H5V11.0632H19V12.5632Z"
        fill={color}
      />
    </svg>
  )
}
