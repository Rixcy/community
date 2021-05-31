import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  Head,
} from "blitz"
import { ErrorBoundary } from "react-error-boundary"
import LoginForm from "app/auth/components/LoginForm"
import { Suspense } from "react"

import "app/core/styles/index.css"
import { Nav } from "app/core/components/Nav"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Suspense fallback="Loading...">
        <Nav />
        <ErrorBoundary
          FallbackComponent={RootErrorFallback}
          resetKeys={[router.asPath]}
          onReset={useQueryErrorResetBoundary().reset}
        >
          {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
