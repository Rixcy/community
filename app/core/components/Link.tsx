import type { LinkProps as NextLinkProps } from "next/link"
import NextLink from "next/link"

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> & {
  nextLinkProps?: Omit<NextLinkProps, "href">
  children: React.ReactNode
  href: string
}

export const Link: React.VFC<LinkProps> = (props) => {
  const { href, nextLinkProps, children, ...restProps } = props

  const hasHttp = href.startsWith("http")

  // https://css-tricks.com/all-about-mailto-links/#open-in-new-tab-sometimes-does-matter
  const isMailToLink = href.startsWith("mailto:")

  const isTelLink = href.startsWith("tel:")

  const externalProps =
    hasHttp || isMailToLink
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : null

  return hasHttp || isMailToLink || isTelLink || href === "#" ? (
    <a href={href} {...externalProps} {...restProps}>
      {children}
    </a>
  ) : (
    <NextLink href={href} passHref {...nextLinkProps}>
      <a {...restProps}>{children}</a>
    </NextLink>
  )
}
