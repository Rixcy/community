import { ReactNode } from "react"
import { Head } from "blitz"
import { Nav } from "../components/Nav"

type LayoutProps = {
  title?: string
  children: ReactNode
  blank?: boolean
}

const Layout = ({ title, children, blank }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "shop"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!blank && <Nav />}

      <div className="flex flex-col flex-1">{children}</div>
    </>
  )
}

export default Layout
