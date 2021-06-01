import { Suspense } from "react"
import { Head, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCommunities from "app/communities/queries/getCommunities"
import { Container } from "app/core/components/Container"
import { Heading } from "app/core/components/Heading"
import { Link } from "app/core/components/Link"
import { Pagination } from "app/core/components/Pagination"

const ITEMS_PER_PAGE = 10

export const CommunitiesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 1
  const [{ communities, hasMore, count }] = usePaginatedQuery(getCommunities, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <>
      <div className="flex-1">
        cc
        <ul>
          {communities.map((community) => (
            <li key={community.id}>
              <Link href={Routes.ShowCommunityPage({ communityId: community.id })}>
                {community.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Pagination
        currentIndex={page}
        totalPages={10}
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
