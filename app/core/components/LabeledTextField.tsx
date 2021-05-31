import { ExclamationCircleIcon } from "@heroicons/react/solid"
import clsx from "clsx"
import { forwardRef, PropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  (props, ref) => {
    const { label, outerProps, name, ...restProps } = props

    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()

    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]

    const errorClasses = clsx({
      "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500":
        error,
    })

    const baseClasses = clsx(
      {
        "border-gray-300 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500":
          !error,
      },
      "appearance-none block w-full px-3 py-2 border rounded-md shadow-md focus:outline-none sm:text-sm"
    )

    return (
      <div {...outerProps}>
        <label className="text-sm font-medium text-gray-700 block">
          {label}
          <div className="relative rounded-md shadow-sm mt-1">
            <input
              disabled={isSubmitting}
              className={clsx(baseClasses, errorClasses)}
              {...register(name)}
              {...restProps}
            />
            {error && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            )}
          </div>
        </label>

        {error && (
          <div role="alert" className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextField
