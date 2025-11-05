import { HttpTypes } from "@medusajs/types"
import Carousel from "@modules/common/components/carousel"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <>
      <Carousel
        options={{ containScroll: "trimSnaps", skipSnaps: true }}
        controls="paginated"
        slideClassName="md:basis-[80%] mr-4 last:mr-0"
      >
        {images.map((img, i) => (
          <div className="relative aspect-[3/4] h-full">
            <Image
              className="object-cover"
              key={img.id}
              src={img.url}
              fill
              sizes="(min-width: 1024px) 100vw, 50vw"
              priority={i <= 2 ? true : false}
              // TODO - alt attribute
              alt={""}
            />
          </div>
        ))}
      </Carousel>
    </>
  )
}

export default ImageGallery
