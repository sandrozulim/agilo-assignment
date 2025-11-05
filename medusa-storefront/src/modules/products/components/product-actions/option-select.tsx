import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import ChevronDown from "@modules/common/icons/chevron-down"
import React, { useState } from "react"

type Props = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

export default function OptionSelect({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOptionClick(value: string) {
    updateOption(option.id, value)
    setIsOpen(false)
  }

  return (
    <div className="md:max-w-[243px]">
      <div className="flex items-center gap-6 ">
        <span className="text-base text-black">{title}</span>
        {current && <span className="text-grey-500 capitalize">{current}</span>}
      </div>
      <div className="relative mt-4">
        <button
          className="relative text-base text-black flex gap-0.5 border border-grey-200 rounded-base px-4 py-3 w-full"
          aria-expanded={isOpen}
          aria-controls={`${option.title}-options`}
          aria-haspopup="listbox"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>{current || `Choose ${option.title}`}</span>
          <div className="absolute right-4">
            <ChevronDown />
          </div>
        </button>
        {isOpen && (
          <div
            className="absolute top-[calc(100%+0.4rem)] w-full bg-white rounded-base border border-grey-200 max-h-[198px] overflow-y-scroll z-50"
            id={`${option.title}-options`}
            role="listbox"
          >
            {option.values?.map((o) => (
              <button
                className={clx(
                  "block p-4 text-base hover:bg-grey-50 hover:cursor-pointer w-full text-left",
                  {
                    "font-semibold": o.value === current,
                  }
                )}
                key={o.id}
                onClick={() => handleOptionClick(o.value)}
                tabIndex={-1}
                role="option"
                aria-selected={o.value === current}
                data-testid="option-button"
                disabled={disabled}
              >
                {o.value}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
