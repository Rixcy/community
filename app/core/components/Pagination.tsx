import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from "@heroicons/react/solid"
import clsx from "clsx"
import { Link, LinkProps } from "./Link"

export type PaginationProps = {
  totalPages: number
  currentIndex: number
  prevLink: LinkProps["href"]
  nextLink: LinkProps["href"]
}

export const Pagination: React.VFC<PaginationProps> = (props) => {
  const { prevLink, nextLink, currentIndex, totalPages } = props

  const classes = (index: number) =>
    clsx(
      {
        "border-indigo-500 text-indigo-600": currentIndex === index,
        "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300":
          currentIndex !== index,
      },
      "border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
    )

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div className="-mt-px w-0 flex-1 flex">
        <Link
          href={prevLink}
          className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </Link>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {[...Array(totalPages)].map((_, index) => (
          <Link
            href={`/communities?page=${index + 1}`}
            className={classes(index + 1)}
            aria-current={index + 1 === currentIndex ? "page" : undefined}
          >
            {index + 1}
          </Link>
        ))}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <Link
          href={nextLink}
          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          Next
          <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  )
}
