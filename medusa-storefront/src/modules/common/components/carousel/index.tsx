"use client"

import React, { useCallback, useEffect, useState } from "react"
import { EmblaOptionsType } from "embla-carousel"
import { twMerge } from "tailwind-merge"
import useEmblaCarousel from "embla-carousel-react"

import ArrowLeftIcon from "@modules/common/icons/arrow-left"
import ArrowRightIcon from "@modules/common/icons/arrow-right"

type CarouselProps = {
  children: React.ReactNode
  options?: EmblaOptionsType
  controls?: "paginated" | "arrows"
  slideClassName?: string
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  options,
  controls,
  slideClassName,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return

    const updateState = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }

    setScrollSnaps(emblaApi.scrollSnapList())
    updateState()

    emblaApi.on("select", updateState)
    emblaApi.on("reInit", updateState)

    return () => {
      emblaApi.off("select", updateState)
      emblaApi.off("reInit", updateState)
    }
  }, [emblaApi])

  return (
    <div className="relative w-full h-full">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {React.Children.map(children, (child, index) => (
            <div
              className={twMerge("flex-[0_0_100%] min-w-0", slideClassName)}
              key={index}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow navigation */}
      {controls === "arrows" && (
        <>
          <button
            className={twMerge(
              "absolute top-1/2 translate-y-1/2 left-6 rounded-full p-2 border border-black",
              canScrollPrev
                ? "bg-black text-white"
                : "bg-transparent text-black cursor-default"
            )}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ArrowLeftIcon aria-label="Scroll previous slide" />
          </button>
          <button
            className={twMerge(
              "absolute top-1/2 translate-y-1/2 right-6 rounded-full p-2 border border-black",
              canScrollNext
                ? "bg-black text-white"
                : "bg-transparent text-black cursor-default"
            )}
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ArrowRightIcon aria-label="Scroll next slide" />
          </button>
        </>
      )}

      {/* Dot navigation */}
      {controls === "paginated" && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center items-center">
          {scrollSnaps.map((_, index) => (
            <button
              className={twMerge("text-black text-base px-1")}
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={twMerge(
                  "px-1",
                  index === selectedIndex && "border-b border-black "
                )}
              >
                {index + 1}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
