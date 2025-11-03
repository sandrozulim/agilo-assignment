import { retrieveCart } from "@lib/data/cart"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartIcon from "@modules/common/icons/cart"

export default async function CartButton() {
  const cart = await retrieveCart().catch(() => null)

  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  return (
    <LocalizedClientLink
      className="relative text-black"
      href="/cart"
      data-testid="nav-cart-link"
      aria-label="View cart"
    >
      <CartIcon aria-hidden />
      <div
        className="absolute top-0 -right-1 size-[0.9375rem] text-[0.625rem]/[110%] bg-black text-white rounded-full flex justify-center items-center"
        aria-hidden
      >
        <span>{totalItems}</span>
      </div>
      <span className="sr-only" aria-live="polite">
        {`${totalItems} items in cart`}
      </span>
    </LocalizedClientLink>
  )
}
