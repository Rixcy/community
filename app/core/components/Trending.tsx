import { ChatAltIcon } from "@heroicons/react/solid"

const trendingPosts = [
  {
    id: 1,
    user: {
      name: "Floyd Miles",
      imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    body: "What books do you have on your bookshelf just to look smarter than you actually are?",
    comments: 291,
  },
  // More posts...
]

export const Trending: React.VFC = () => {
  return (
    <section aria-labelledby="trending-heading">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 id="trending-heading" className="text-base font-medium text-gray-900">
            Trending
          </h2>
          <div className="mt-6 flow-root">
            <ul className="-my-4 divide-y divide-gray-200">
              {trendingPosts.map((post) => (
                <li key={post.id} className="flex py-4 space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={post.user.imageUrl}
                      alt={post.user.name}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-800">{post.body}</p>
                    <div className="mt-2 flex">
                      <span className="inline-flex items-center text-sm">
                        <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                          <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                          <span className="font-medium text-gray-900">{post.comments}</span>
                        </button>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <a
              href="#"
              className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View all
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
