import { Link as BlitzLink, LinkProps as BlitzLinkProps, RouteUrlObject } from "blitz"
import clsx from "clsx"

export type LinkProps = {
  anchorProps?: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href">
  blitzLinkProps?: Omit<BlitzLinkProps, "href">
  href: string | RouteUrlObject | undefined
  onClick?: () => void | Promise<void>
  className?: string
  isDisabled?: boolean
  children: React.ReactNode
}

export const Link: React.VFC<LinkProps> = (props) => {
  const { href, blitzLinkProps, children, isDisabled, className, ...restProps } = props

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

  const classes = clsx({ "opacity-80 cursor-not-allowed": isDisabled }, className)

  if (!href) {
    return (
      <div className={clsx("select-none", classes)} {...restProps}>
        {children}
      </div>
    )
  }

  return hasHttp || isMailToLink || isTelLink || href === "#" ? (
    <a
      href={typeof href === "string" ? href : href.pathname}
      {...externalProps}
      {...restProps}
      className={classes}
      aria-disabled={isDisabled}
    >
      {children}
    </a>
  ) : (
    <BlitzLink href={href} passHref {...blitzLinkProps}>
      <a aria-disabled={isDisabled} {...restProps} className={classes}>
        {children}
      </a>
    </BlitzLink>
  )
}
