type NavbarLink = {
  label: string
  href: string
}

type NavbarProps = {
  brand?: string
  links?: NavbarLink[]
  actionLabel?: string
  actionHref?: string
}

const defaultLinks: NavbarLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
]

export function Navbar({
  brand = "Oceanic",
  links = defaultLinks,
  actionLabel = "Contacto",
  actionHref = "#contacto",
}: NavbarProps) {
  return (
    <header className="w-full">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 rounded-2xl border border-white/20 bg-slate-950/20 px-5 py-3 text-white shadow-lg backdrop-blur-md"
      >
        <a className="shrink-0 text-lg font-semibold tracking-tight" href="#inicio">
          {brand}
        </a>

        <ul className="hidden items-center gap-7 text-sm text-white/80 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a className="transition-colors hover:text-white" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          className="shrink-0 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20"
          href={actionHref}
        >
          {actionLabel}
        </a>
      </nav>
    </header>
  )
}
