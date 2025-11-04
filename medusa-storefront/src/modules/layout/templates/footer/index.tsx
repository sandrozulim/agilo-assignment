import FooterNavigation from "@modules/layout/components/footer-navigation"
import NewsletterForm from "@modules/layout/components/newsletter-form"
import StackedLogo from "@modules/layout/components/stacked-logo"

export default async function Footer() {
  return (
    <div className="bg-grey-50">
      <footer className="p-8 lg:px-24 lg:py-20 max-w-[1440px] mx-auto lg:flex lg:justify-between lg:gap-8">
        <div className="mb-16 lg:mb-0 lg:order-1">
          <NewsletterForm />
        </div>
        <div className="max-lg:hidden">
          <StackedLogo />
        </div>
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0 lg:hidden">
            <StackedLogo />
          </div>
          <FooterNavigation />
        </div>
      </footer>
    </div>
  )
}
