import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductInfo from "@modules/products/templates/product-info"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div data-testid="product-container">
        <section className="lg:flex justify-between gap-8 xl:gap-[3.75rem] max-w-[1440px] mx-auto lg:py-16 xl:px-24">
          {product.images?.length && product.images.length > 1 && (
            <div className="lg:w-full">
              <ImageGallery images={product.images} />
            </div>
          )}
          <div className="px-4 py-8 lg:pr-24 xl:pr-0 lg:w-full lg:max-w-[540px]">
            <ProductInfo product={product} />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  )
}

export default ProductTemplate
