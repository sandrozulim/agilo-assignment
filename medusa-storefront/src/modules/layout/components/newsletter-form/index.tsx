import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function NewsletterForm() {
  return (
    <div className="text-black md:max-w-xl lg:max-w-96">
      <h2 className="text-lg md:text-xl mb-2 md:font-medium">
        Join our newsletter
      </h2>
      <p className="text-xs md:text-base mb-4">
        We will also send you our discount coupons!
      </p>
      <form className="flex justify-between items-stretch gap-2 mb-4">
        <input
          className="w-full px-4 py-2.5 rounded-base bg-white text-xs md:text-base placeholder:text-grey-500 placeholder:text-xs"
          type="email"
          name="email"
          placeholder="Your email"
        />
        <button className="px-4 py-2.5 h-full text-white text-xs bg-black rounded-base capitalize">
          subscribe
        </button>
      </form>
      <p className="text-xs text-grey-500">
        By subscribing you agree to with our{" "}
        <LocalizedClientLink className="underline underline-offset-2" href="#">
          Privacy Policy
        </LocalizedClientLink>{" "}
        and provide consent to receive updates from our company.
      </p>
    </div>
  )
}
