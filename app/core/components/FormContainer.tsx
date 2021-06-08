import clsx from "clsx"

export type FormContainerProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  children: React.ReactNode
}

export const FormContainer: React.VFC<FormContainerProps> = (props) => {
  const { children, className, ...restProps } = props
  return (
    <div className={clsx("sm:w-full sm:max-w-md", className)} {...restProps}>
      {children}
    </div>
  )
}
