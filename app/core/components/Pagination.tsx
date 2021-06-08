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

  console.log({ totalPages })

  const classes = (index: number) =>
    clsx(
      {
        "border-indigo-400 text-indigo-500": currentIndex === index,
        "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300":
          currentIndex !== index,
      },
      "border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
    )

  const canGoBack = () => currentIndex - 1 > 0
  const canGoForward = () => currentIndex + 1 <= totalPages

  const hoverClasses = "hover:text-gray-700 hover:border-gray-300"

  const shouldTruncate = totalPages > 7

  const truncatedPages = {
    initialChunk: [currentIndex - 2, currentIndex - 1, currentIndex],
    lastChunk: [totalPages - 2, totalPages - 1, totalPages],
  }

  if (currentIndex === 1) {
    truncatedPages.initialChunk = [currentIndex, currentIndex + 1, currentIndex + 2]
    truncatedPages.lastChunk = [totalPages - 2, totalPages - 1, totalPages]
  }

  if (currentIndex === 2) {
    truncatedPages.initialChunk = [currentIndex - 1, currentIndex, currentIndex + 1]
    truncatedPages.lastChunk = [totalPages - 2, totalPages - 1, totalPages]
  }

  if (currentIndex >= totalPages - 2) {
    truncatedPages.initialChunk = [1, 2, 3]
    truncatedPages.lastChunk = [totalPages - 2, totalPages - 1, totalPages]
  }

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div className="-mt-px w-0 flex-1 flex">
        <Link
          href={canGoBack() ? prevLink : undefined}
          className={clsx(
            "border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 ",
            canGoBack() && hoverClasses
          )}
          isDisabled={!canGoBack()}
        >
          <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </Link>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {shouldTruncate &&
          truncatedPages.initialChunk.map((index) => (
            <Link
              href={`/communities?page=${index}`}
              className={classes(index)}
              aria-current={index === currentIndex ? "page" : undefined}
            >
              {index}
            </Link>
          ))}
      </div>
      {!shouldTruncate &&
        [...Array(totalPages)].map((_, index) => (
          <Link
            href={`/communities?page=${index + 1}`}
            className={classes(index + 1)}
            aria-current={index + 1 === currentIndex ? "page" : undefined}
          >
            {index + 1}
          </Link>
        ))}
      {shouldTruncate && (
        <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium select-none">
          ...
        </span>
      )}
      {shouldTruncate &&
        truncatedPages.lastChunk.map((index) => (
          <Link
            href={`/communities?page=${index}`}
            className={classes(index)}
            aria-current={index === currentIndex ? "page" : undefined}
          >
            {index}
          </Link>
        ))}

      <div className="-mt-px w-0 flex-1 flex justify-end">
        <Link
          href={canGoForward() ? nextLink : undefined}
          className={clsx(
            "border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500",
            canGoForward() && hoverClasses
          )}
          isDisabled={!canGoForward()}
        >
          Next
          <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  )
}
