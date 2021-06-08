import { Container } from "./Container"

export type HeadingProps = {
  title: string
  rightActions?: React.ReactNode
  bottomActions?: React.ReactNode
}

export const Heading: React.VFC<HeadingProps> = (props) => {
  const { title, rightActions, bottomActions } = props
  return (
    <div className="w-full bg-gray-700 py-12 px-8 mb-8">
      <Container className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            {title}
          </h2>
          {bottomActions && (
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6 text-gray-400">
              {bottomActions}
            </div>
          )}
        </div>
        {rightActions && <div className="mt-4 flex md:mt-0 md:ml-4">{rightActions}</div>}
      </Container>
    </div>
  )
}
