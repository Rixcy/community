import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCommunity from "app/communities/queries/getCommunity"
import updateCommunity from "app/communities/mutations/updateCommunity"
import { CommunityForm, FORM_ERROR } from "app/communities/components/CommunityForm"
import { Container } from "app/core/components/Container"
import { Heading } from "app/core/components/Heading"
import { LinkButton } from "app/core/components/LinkButton"
import { ChevronLeftIcon } from "@heroicons/react/solid"

export const EditCommunity = () => {
  const router = useRouter()
  const communityId = useParam("communityId", "number")
  const [community, { setQueryData }] = useQuery(getCommunity, { id: communityId })
  const [updateCommunityMutation] = useMutation(updateCommunity)

  return (
    <>
      <Head>
        <title>Edit {community.name}</title>
      </Head>

      <Heading
        title={`Edit ${community.name}`}
        rightActions={
          <LinkButton href={Routes.ShowCommunityPage({ communityId: community.id })}>
            <ChevronLeftIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Back
          </LinkButton>
        }
      />

      <Container>
        <CommunityForm
          submitText="Update Community"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCommunity}
          initialValues={community}
          onSubmit={async (values) => {
            try {
              const updated = await updateCommunityMutation({
                id: community.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowCommunityPage({ communityId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Container>
    </>
  )
}

const EditCommunityPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditCommunity />
    </Suspense>
  )
}

EditCommunityPage.authenticate = true
EditCommunityPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCommunityPage
