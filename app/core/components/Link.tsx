import { Link as BlitzLink, LinkProps as BlitzLinkProps, RouteUrlObject } from "blitz"

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> & {
  blitzLinkProps?: Omit<BlitzLinkProps, "href">
  children: React.ReactNode
  href: string | RouteUrlObject
}

export const Link: React.VFC<LinkProps> = (props) => {
  const { href, blitzLinkProps, children, ...restProps } = props

  const hasHttp = typeof href === "string" && href.startsWith("http")

  // https://css-tricks.com/all-about-mailto-links/#open-in-new-tab-sometimes-does-matter
  const isMailToLink = typeof href === "string" && href.startsWith("mailto:")

  const isTelLink = typeof href === "string" && href.startsWith("tel:")

  const externalProps =
    hasHttp || isMailToLink
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : null

  return hasHttp || isMailToLink || isTelLink || href === "#" ? (
    <a href={typeof href === "string" ? href : href.pathname} {...externalProps} {...restProps}>
      {children}
    </a>
  ) : (
    <BlitzLink href={href} passHref {...blitzLinkProps}>
      <a {...restProps}>{children}</a>
    </BlitzLink>
  )
}
