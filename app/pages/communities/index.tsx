import { Suspense } from "react"
import { Head, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCommunities from "app/communities/queries/getCommunities"
import { Container } from "app/core/components/Container"
import { Heading } from "app/core/components/Heading"
import { Link } from "app/core/components/Link"

const ITEMS_PER_PAGE = 100

export const CommunitiesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ communities, hasMore }] = usePaginatedQuery(getCommunities, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <>
      <ul>
        {communities.map((community) => (
          <li key={community.id}>
            <Link href={Routes.ShowCommunityPage({ communityId: community.id })}>
              {community.name}
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
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
      <Container>
        <p>
          <Link href={Routes.NewCommunityPage()}>
            <a>Create Community</a>
          </Link>
        </p>

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
