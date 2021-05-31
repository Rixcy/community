import clsx from "clsx"
import { Link } from "../Link"
import type { LinkProps } from "../Link"
import { useRouter } from "@blitzjs/core"

export type NavItemProps = LinkProps & {
  /**
   * This can be used to override the active state, useful for things like highlighting on root url
   */
  active?: boolean
}

export const NavItem: React.VFC<NavItemProps> = (props) => {
  const { children, className, active, ...restProps } = props

  const router = useRouter()

  console.log({ router })

  const isActive = active ?? router.pathname.startsWith(restProps.href)

  const classes = clsx(
    "hover:text-white px-3 py-2 rounded-md text-sm font-medium",
    { "bg-gray-900 text-white": isActive, "text-gray-300 hover:bg-gray-700": !isActive },
    className
  )

  return (
    <Link className={classes} {...restProps}>
      {children}
    </Link>
  )
}
