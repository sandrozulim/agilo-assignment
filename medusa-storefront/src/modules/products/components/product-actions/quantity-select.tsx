import MinusIcon from "@modules/common/icons/minus-icon"
import PlusIcon from "@modules/common/icons/plus-icon"
import { twMerge } from "tailwind-merge"

type QuantitySelectProps = {
  quantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  minValue?: number
  maxValue?: number
  disabled?: boolean
}

export default function QuantitySelect({
  quantity,
  setQuantity,
  disabled = false,
  minValue = 1,
  maxValue = 9,
}: QuantitySelectProps) {
  const decrement = () => {
    if (disabled || quantity <= minValue) return
    setQuantity((prev) => Math.max(minValue, prev - 1))
  }

  const increment = () => {
    if (disabled || quantity >= maxValue) return
    setQuantity((prev) => Math.min(maxValue, prev + 1))
  }

  return (
    <div
      className={twMerge(
        "flex items-center justify-center gap-4 w-full py-3 text-[1.25rem]/[100%] rounded-base border border-grey-200 md:max-w-[136px]",
        disabled ? "text-grey-200" : "text-black"
      )}
      role="spinbutton"
      aria-label="Select quantity"
      aria-valuenow={quantity}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
    >
      <button
        className={
          disabled || quantity <= minValue ? "text-grey-200" : "text-black"
        }
        type="button"
        onClick={decrement}
        aria-label="Decrement quantity"
        disabled={disabled || quantity <= minValue}
      >
        <MinusIcon />
      </button>
      <span className="inline-block w-4 text-center">{quantity}</span>
      <button
        className={
          disabled || quantity >= maxValue ? "text-grey-200" : "text-black"
        }
        type="button"
        onClick={increment}
        aria-label="Increment quantity"
        disabled={disabled || quantity >= maxValue}
      >
        <PlusIcon />
      </button>
    </div>
  )
}
