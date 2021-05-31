import { Sidebar } from "./Sidebar"
import { Tabs } from "./Tabs"
import { Trending } from "./Trending"
import { WhoToFollow } from "./WhoToFollow"

export const MultiColumn: React.VFC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8  py-10">
        <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
          <nav aria-label="Sidebar" className="sticky top-6 divide-y divide-gray-300">
            <Sidebar />
          </nav>
        </div>
        <main className="lg:col-span-9 xl:col-span-6">
          <Tabs />
        </main>
        <aside className="hidden xl:block xl:col-span-4">
          <div className="sticky top-6 space-y-4">
            <WhoToFollow />
            <Trending />
          </div>
        </aside>
      </div>
    </div>
  )
}
