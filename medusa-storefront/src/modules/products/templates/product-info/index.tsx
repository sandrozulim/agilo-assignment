import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="flex flex-col gap-y-4" id="product-info">
      <div className="flex flex-col gap-2">
        {product.collection && (
          <LocalizedClientLink
            className="text-base text-grey-500"
            href={`/collections/${product.collection.handle}`}
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <h2 className="text-black text-lg md:text-2xl font-semibold">
          {product.title}
        </h2>
      </div>
    </div>
  )
}

export default ProductInfo
