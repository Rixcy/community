import { Suspense } from "react"
import { Head, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCommunities from "app/communities/queries/getCommunities"
import { Container } from "app/core/components/Container"
import { Heading } from "app/core/components/Heading"
import { Link } from "app/core/components/Link"
import { Pagination } from "app/core/components/Pagination"

const ITEMS_PER_PAGE = 1

export const CommunitiesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 1
  const [{ communities, hasMore, count }] = usePaginatedQuery(getCommunities, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
  })

  console.log({ count })

  return (
    <>
      <div className="flex-1 flex flex-col w-full">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-500 text-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {communities.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        No communities could be found.{" "}
                        <Link
                          href={Routes.NewCommunityPage()}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Create one?
                        </Link>
                      </td>
                    </tr>
                  )}
                  {communities.map((community) => (
                    <tr key={community.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {community.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">stuff</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">stff</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">stuff</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Pagination
        currentIndex={page}
        totalPages={count}
        prevLink={Routes.CommunitiesPage({ page: page - 1 })}
        nextLink={Routes.CommunitiesPage({ page: page + 1 })}
      />
    </>
  )
}

const CommunitiesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Communities</title>
      </Head>

      <Heading title="Communities" rightActions={<RightActions />} />
      <Container className="flex flex-col flex-1 pb-8">
        <Suspense fallback={<div>Loading...</div>}>
          <CommunitiesList />
        </Suspense>
      </Container>
    </>
  )
}

CommunitiesPage.authenticate = true
CommunitiesPage.getLayout = (page) => <Layout>{page}</Layout>

export default CommunitiesPage

const RightActions = () => (
  <Link
    href={Routes.NewCommunityPage()}
    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
  >
    Create
  </Link>
)
