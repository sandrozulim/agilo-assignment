import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  items: Record<string, string>
}

export default function Navigation({ items }: Props) {
  return (
    <nav>
      <ul className="flex items-center gap-8">
        {Object.entries(items).map(([label, href]) => (
          <li key={href}>
            <LocalizedClientLink
              className="capitalize text-base text-black"
              href={"#"}
            >
              {label}
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
