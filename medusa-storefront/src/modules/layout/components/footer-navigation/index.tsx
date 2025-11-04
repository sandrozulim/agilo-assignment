import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function FooterNavigation() {
  return (
    <nav className="lg:order-1 md:w-full md:max-w-96">
      <ul className="flex justify-between gap-16 text-xs md:text-base text-black">
        <div className="flex flex-col gap-6 lg:gap-4">
          <LocalizedClientLink href={"#"}>FAQ</LocalizedClientLink>
          <LocalizedClientLink href={"#"}>Help</LocalizedClientLink>
          <LocalizedClientLink href={"#"}>Delivery</LocalizedClientLink>
          <LocalizedClientLink href={"#"}>Returns</LocalizedClientLink>
        </div>
        <div className="flex flex-col gap-6 lg:gap-4">
          <LocalizedClientLink href={"#"}>Instagram</LocalizedClientLink>
          <LocalizedClientLink href={"#"}>TikTok</LocalizedClientLink>
          <LocalizedClientLink href={"#"}>Pinterest</LocalizedClientLink>
          <LocalizedClientLink href={"#"}>Facebook</LocalizedClientLink>
        </div>
        <div className="flex flex-col gap-6 lg:gap-4">
          <LocalizedClientLink href={"#"}>Privacy Policy</LocalizedClientLink>
          <LocalizedClientLink href={"#"}>Cookie Policy</LocalizedClientLink>
          <LocalizedClientLink href={"#"}>Terms Of Use</LocalizedClientLink>
        </div>
      </ul>
    </nav>
  )
}
