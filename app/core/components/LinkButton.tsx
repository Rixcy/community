import clsx from "clsx"
import { Link, LinkProps } from "./Link"

export type LinkButtonProps = LinkProps

export const LinkButton: React.VFC<LinkButtonProps> = (props) => {
  const { children, className, ...restProps } = props
  return (
    <Link
      className={clsx(
        "ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500",
        className
      )}
      {...restProps}
    >
      {children}
    </Link>
  )
}
