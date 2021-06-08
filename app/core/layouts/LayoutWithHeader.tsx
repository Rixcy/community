import { ReactNode } from "react"
import Layout from "./Layout"
import { Heading, HeadingProps } from "../components/Heading"
import { Container } from "../components/Container"

type LayoutProps = {
  title: string
  children: ReactNode
  headingProps?: HeadingProps
}

const LayoutWithHeader = ({ title, children, headingProps }: LayoutProps) => {
  return (
    <Layout title={title}>
      <Heading title={title} {...headingProps} />

      <Container>{children}</Container>
    </Layout>
  )
}

export default LayoutWithHeader
