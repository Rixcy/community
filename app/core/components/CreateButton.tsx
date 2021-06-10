import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { classNames } from "../utils/classnames"
import { Link } from "./Link"
import { Routes } from "blitz"

const items = [
  {
    name: "Community",
    description: "Create a new community",
    href: Routes.NewCommunityPage(),
  },
  {
    name: "Post",
    description: "Create a new post",
    href: "#",
  },
]

export const CreateButton: React.VFC = () => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? "text-white bg-gray-900" : "text-gray-300 bg-gray-800 hover:bg-gray-700",
              "group rounded-md inline-flex items-center text-sm px-3 py-2 font-medium hover:text-text-white focus:outline-none ring-offset-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            )}
          >
            <span>Create</span>
            <ChevronDownIcon
              className={classNames(
                open ? "text-gray-600" : "text-gray-400",
                "ml-2 h-5 w-5 group-hover:text-gray-500"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  {items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-m-3 p-3 block rounded-md hover:bg-gray-100 transition ease-in-out duration-150"
                    >
                      <p className="text-base font-medium text-gray-900">{item.name}</p>
                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
