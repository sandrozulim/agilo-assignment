"use client"

import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import { useRouter } from "next/navigation"
import ColorPicker from "./color-picker"
import QuantitySelect from "./quantity-select"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled: globalDisabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => {
      const newOptions = { ...prev, [optionId]: value }

      // If material changed, reset color
      if (optionId === materialOption?.id) {
        newOptions[colorOption?.id ?? ""] = undefined
      }

      return newOptions
    })
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = selectedVariant?.id ?? null

    if (params.get("v_id") === value) return

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString(), { scroll: false })
  }, [selectedVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: quantity,
      countryCode,
    })

    setIsAdding(false)
  }

  const materialOption = product.options?.find((o) => o.title === "Materials")
  const colorOption = product.options?.find((o) => o.title === "Color")

  const availableColors = useMemo(() => {
    // Find variants that match the selected material
    const matchingVariants = product.variants?.filter((variant) => {
      const map = optionsAsKeymap(variant.options)
      if (!map) return false
      return map[materialOption?.id ?? ""] === options[materialOption?.id ?? ""]
    })

    // Collect all color values from those variants
    const allowedColorValues = new Set(
      matchingVariants?.map((variant) => {
        const map = optionsAsKeymap(variant.options)
        return map ? map[colorOption?.id ?? ""] : undefined
      })
    )

    // Filter the original color values to only include those allowed
    return colorOption?.values?.filter((v) => allowedColorValues.has(v.value))
  }, [options, product.variants])

  return (
    <>
      <div ref={actionsRef}>
        <ProductPrice product={product} variant={selectedVariant} />
        <p className="mt-8 text-grey-500 text-xs md:text-base max-w-[480px]">
          {product.description}
        </p>
        {(product.variants?.length ?? 0) > 1 && (
          <div className="mt-8 md:mt-16 flex flex-col gap-8">
            {materialOption && (
              <OptionSelect
                option={materialOption}
                current={options[materialOption.id]}
                updateOption={setOptionValue}
                title={materialOption.title ?? ""}
                data-testid="product-options"
                disabled={!!globalDisabled || isAdding}
              />
            )}
            {colorOption && options[materialOption?.id ?? ""] && (
              <ColorPicker
                option={{ ...colorOption, values: availableColors }}
                current={options[colorOption.id]}
                updateOption={setOptionValue}
                disabled={!!globalDisabled || isAdding}
              />
            )}
          </div>
        )}

        <div className="mt-8 md:mt-24 flex flex-col gap-4 md:flex-row">
          <QuantitySelect
            quantity={quantity}
            setQuantity={setQuantity}
            disabled={
              !selectedVariant || !inStock || !!globalDisabled || isAdding
            }
          />
          <button
            className="w-full disabled:pointer-events-none disabled:bg-grey-200 disabled:text-white hover:bg-grey-800 active:bg-grey-800 font-normal py-4 bg-black text-white text-base/[100%] rounded-base transition-colors"
            onClick={handleAddToCart}
            disabled={
              !selectedVariant || !inStock || !!globalDisabled || isAdding
            }
            data-testid="add-product-button"
          >
            {!selectedVariant
              ? "Select variant"
              : !inStock
              ? "Out of stock"
              : "Add to cart"}
          </button>
        </div>
        <p className="text-xs text-grey-500 mt-4">Estimate delivery 2-3 days</p>
      </div>
    </>
  )
}
