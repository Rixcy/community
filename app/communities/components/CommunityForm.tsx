import { Form, FormProps } from "app/core/components/Form"
import { FormContainer } from "app/core/components/FormContainer"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function CommunityForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <FormContainer>
      <Form<S> {...props}>
        <LabeledTextField name="name" label="Name" placeholder="Name" />
        <LabeledTextField
          name="avatarUrl"
          label="Avatar Url"
          placeholder="https://eu.ui-avatars.com/api/?name=John+Doe"
        />
        <LabeledTextField
          name="websiteUrl"
          label="Website Url"
          placeholder="https://us.example.com"
        />
        <LabeledTextField
          name="twitterUrl"
          label="Twitter Url"
          placeholder="https://twitter.com/our-community"
        />
        <LabeledTextField
          name="discordUrl"
          label="Discord Invite Link"
          placeholder="https://discord.com/invite/blitzjs"
        />
      </Form>
    </FormContainer>
  )
}
