import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Navigation from "../navigation"
import HeaderActions from "@modules/layout/components/header-actions"

const desktopNavItems = {
  about: "/about",
  inspiration: "/inspiration",
  shop: "/shop",
}

export default async function Header() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 h-[4.5rem] flex items-center z-50 bg-white">
      <header className="w-full px-4 py-6 lg:px-24 max-w-[1440px] mx-auto">
        <div className="relative flex items-center justify-between text-black">
          <h1 className="font-medium text-lg/[90%]">
            <LocalizedClientLink href={"/"}>SofaSocietyCo.</LocalizedClientLink>
          </h1>
          <div className="max-md:hidden">
            <Navigation items={desktopNavItems} />
          </div>
          <HeaderActions regions={regions} />
        </div>
      </header>
    </div>
  )
}
