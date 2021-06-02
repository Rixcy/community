import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCommunity from "app/communities/queries/getCommunity"
import deleteCommunity from "app/communities/mutations/deleteCommunity"
import { Container } from "app/core/components/Container"
import { Heading } from "app/core/components/Heading"
import { LinkButton } from "app/core/components/LinkButton"
import { CalendarIcon } from "@heroicons/react/solid"
import formatRelative from "date-fns/formatRelative"
import subDays from "date-fns/subDays"

export const Community = () => {
  const router = useRouter()
  const communityId = useParam("communityId", "number")
  const [deleteCommunityMutation] = useMutation(deleteCommunity)
  const [community] = useQuery(getCommunity, { id: communityId })

  let timeText = `Created ${formatRelative(subDays(new Date(community.createdAt), 3), new Date())}`

  // Sometimes there can be some ms delay with updating vs. creating, cater for this by removing 2 numbers at the end
  const updatedAt = Number(new Date(community.updatedAt).getTime().toString().slice(0, -2))
  const createdAt = Number(new Date(community.createdAt).getTime().toString().slice(0, -2))

  if (updatedAt > createdAt) {
    timeText = `Updated ${formatRelative(subDays(new Date(community.updatedAt), 3), new Date())}`
  }

  return (
    <>
      <Heading
        title={community.name}
        rightActions={<LinkButton href={Routes.CommunitiesPage()}>Back</LinkButton>}
        bottomActions={
          <div className="mt-2 flex items-center text-sm text-gray-400">
            <CalendarIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-300"
              aria-hidden="true"
            />
            {timeText}
          </div>
        }
      />
      <Head>
        <title>Community {community.id}</title>
      </Head>

      <Container>
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
      </Container>
    </>
  )
}

const ShowCommunityPage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Community />
      </Suspense>
    </>
  )
}

ShowCommunityPage.authenticate = true
ShowCommunityPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCommunityPage
