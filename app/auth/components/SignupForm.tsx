import { Routes, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { Link } from "app/core/components/Link"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className="bg-white flex flex-1">
      <div className="flex-1 flex flex-col justify-start md:justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img className="h-12 w-auto" src="/community-logo-small.svg" alt="Community" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href={Routes.LoginPage()}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <Form
              submitText="Create Account"
              schema={Signup}
              initialValues={{ email: "", password: "", name: "" }}
              onSubmit={async (values) => {
                try {
                  await signupMutation(values)
                  props.onSuccess?.()
                } catch (error) {
                  if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                    // This error comes from Prisma
                    return { email: "This email is already being used" }
                  } else {
                    return { [FORM_ERROR]: error.toString() }
                  }
                }
              }}
            >
              <LabeledTextField
                name="email"
                label="Email"
                placeholder="you@example.com"
                autoComplete="email"
              />
              <LabeledTextField
                name="name"
                label="Name"
                placeholder="Joe Bloggs"
                autoComplete="name"
              />
              <LabeledTextField
                name="password"
                label="Password"
                placeholder="Password"
                autoComplete="current-password"
                type="password"
              />
            </Form>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  )
}

export default SignupForm
