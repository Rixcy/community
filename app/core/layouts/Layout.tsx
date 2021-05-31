import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "shop"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex-1">{children}</div>
    </>
  )
}

export default Layout
