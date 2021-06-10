import clsx from "clsx"
import { Link, LinkProps } from "./Link"

export type LinkButtonProps = LinkProps & {
  /**
   * Whether or not to show an outline version of the button or not
   */
  secondary?: boolean
}

export const LinkButton: React.VFC<LinkButtonProps> = (props) => {
  const { children, className, secondary, ...restProps } = props
  return (
    <Link
      className={clsx(
        "ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500",
        {
          "bg-indigo-500 hover:bg-indigo-600 text-white": !secondary,
          "bg-indigo-100 hover:bg-indigo-200 text-indigo-700": secondary,
        },
        className
      )}
      {...restProps}
    >
      {children}
    </Link>
  )
}
