import { ReactNode } from "react"
import { Head } from "blitz"
import { Nav } from "../components/Nav"

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

      <Nav />

      {children}
    </>
  )
}

export default Layout
