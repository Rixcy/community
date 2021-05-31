import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCommunity from "app/communities/queries/getCommunity"
import deleteCommunity from "app/communities/mutations/deleteCommunity"

export const Community = () => {
  const router = useRouter()
  const communityId = useParam("communityId", "number")
  const [deleteCommunityMutation] = useMutation(deleteCommunity)
  const [community] = useQuery(getCommunity, { id: communityId })

  return (
    <>
      <Head>
        <title>Community {community.id}</title>
      </Head>

      <div>
        <h1>Community {community.id}</h1>
        <pre>{JSON.stringify(community, null, 2)}</pre>

        <Link href={Routes.EditCommunityPage({ communityId: community.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCommunityMutation({ id: community.id })
              router.push(Routes.CommunitiesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowCommunityPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CommunitiesPage()}>
          <a>Communities</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Community />
      </Suspense>
    </div>
  )
}

ShowCommunityPage.authenticate = true
ShowCommunityPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCommunityPage
