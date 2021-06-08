import { Form, FormProps } from "app/core/components/Form"
import { FormContainer } from "app/core/components/FormContainer"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function UserForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <FormContainer>
      <Form<S> {...props}>
        <LabeledTextField name="name" label="Name" placeholder="Name" />
      </Form>
    </FormContainer>
  )
}
