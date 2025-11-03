import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartIcon from "@modules/common/icons/cart"
import MagnifierIcon from "@modules/common/icons/magnifier"
import { Suspense } from "react"
import CartButton from "../cart-button"
import { CountrySwitcher } from "../country-select"
import SideMenu from "../side-menu"
import { HttpTypes } from "@medusajs/types"

type Props = {
  regions: HttpTypes.StoreRegion[]
}

export default function HeaderActions({ regions }: Props) {
  return (
    <div className="flex gap-8 items-center">
      <div className="max-md:hidden">
        <CountrySwitcher regions={regions} />
      </div>
      <div className="max-md:hidden hover:cursor-pointer">
        <MagnifierIcon />
      </div>
      <Suspense
        fallback={
          <LocalizedClientLink href="/cart" data-testid="nav-cart-link">
            <CartIcon />
          </LocalizedClientLink>
        }
      >
        <CartButton />
      </Suspense>
      <SideMenu regions={regions} />
    </div>
  )
}
