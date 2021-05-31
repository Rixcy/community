import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCommunity from "app/communities/mutations/createCommunity"
import { CommunityForm, FORM_ERROR } from "app/communities/components/CommunityForm"

const NewCommunityPage: BlitzPage = () => {
  const router = useRouter()
  const [createCommunityMutation] = useMutation(createCommunity)

  return (
    <div>
      <h1>Create New Community</h1>

      <CommunityForm
        submitText="Create Community"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCommunity}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const community = await createCommunityMutation(values)
            router.push(`/communities/${community.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CommunitiesPage()}>
          <a>Communities</a>
        </Link>
      </p>
    </div>
  )
}

NewCommunityPage.authenticate = true
NewCommunityPage.getLayout = (page) => <Layout title={"Create New Community"}>{page}</Layout>

export default NewCommunityPage
