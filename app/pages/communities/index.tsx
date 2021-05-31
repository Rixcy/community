import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCommunities from "app/communities/queries/getCommunities"

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
    <Layout title="Communities">
      <ul>
        {communities.map((community) => (
          <li key={community.id}>
            <Link href={Routes.ShowCommunityPage({ communityId: community.id })}>
              <a>{community.name}</a>
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
    </Layout>
  )
}

const CommunitiesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Communities</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCommunityPage()}>
            <a>Create Community</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CommunitiesList />
        </Suspense>
      </div>
    </>
  )
}

CommunitiesPage.authenticate = true
CommunitiesPage.getLayout = (page) => <Layout>{page}</Layout>

export default CommunitiesPage
