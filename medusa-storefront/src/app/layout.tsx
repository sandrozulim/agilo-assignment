import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Mona_Sans } from "next/font/google"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

const monaSans = Mona_Sans({
  preload: true,
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mona-sans",
})

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body className={`${monaSans.className}`}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
