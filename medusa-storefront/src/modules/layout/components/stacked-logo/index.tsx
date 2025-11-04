import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function StackedLogo() {
  return (
    <>
      <LocalizedClientLink
        href="/"
        className="block w-fit text-black text-xl/none md:text-2xl/none font-medium"
      >
        <span className="block w-fit">Sofa</span>
        <span className="block w-fit">Society</span>
        <span className="block w-fit">Co.</span>
      </LocalizedClientLink>
      <span className="text-xs inline-block mt-4">{`© ${new Date().getFullYear()}, Sofa Society`}</span>
    </>
  )
}
