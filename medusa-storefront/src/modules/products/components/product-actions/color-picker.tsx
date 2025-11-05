import { twMerge } from "tailwind-merge"
import { HttpTypes } from "@medusajs/types"

type Props = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (optionId: string, value: string) => void
  disabled?: boolean
}

const COLOR_MAP: Record<string, string> = {
  brown: "#964B00",
  beige: "#F5F5DC",
  gray: "#808080",
  black: "#000000",
  green: "#008000",
}

export default function ColorPicker({
  option,
  current,
  updateOption,
  disabled = false,
}: Props) {
  function handleSelect(value: string) {
    if (disabled) return
    updateOption(option.id, value)
  }

  return (
    <div>
      <div className="flex items-center gap-6 text-base">
        <span className="text-black">{option.title}</span>
        {current && <span className="text-grey-500 capitalize">{current}</span>}
      </div>

      <div
        role="radiogroup"
        aria-label={option.title}
        className="flex flex-wrap gap-6 mt-4"
      >
        {option.values?.map((v) => {
          const isSelected = v.value === current
          return (
            <div key={v.id} className="relative flex flex-col items-center">
              <button
                type="button"
                role="radio"
                onClick={() => handleSelect(v.value)}
                aria-label={`Select ${v.value} color`}
                aria-checked={isSelected}
                disabled={disabled}
                className={twMerge(
                  "w-8 h-8 border border-transparent",
                  disabled && "opacity-50 pointer-events-none"
                )}
                style={{
                  backgroundColor: COLOR_MAP[v.value.toLowerCase()],
                }}
              />
              {isSelected && (
                <span className="absolute w-8 h-[1px] bg-black -bottom-2"></span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
