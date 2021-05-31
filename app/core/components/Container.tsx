import clsx from "clsx"

export type ContainerProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  children: React.ReactNode
}

export const Container: React.VFC<ContainerProps> = (props) => {
  const { children, className, ...restProps } = props
  return (
    <div
      className={clsx("max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full", className)}
      {...restProps}
    >
      {children}
    </div>
  )
}
