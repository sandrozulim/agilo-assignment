import { IconProps } from "types/icon"

export default function MenuIcon({
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
        d="M2.25 5.09473H21.75V6.59473H2.25V5.09473ZM2.25 11.0947H21.75V12.5947H2.25V11.0947ZM2.25 17.0947H21.75V18.5947H2.25V17.0947Z"
        fill={color}
      />
    </svg>
  )
}
