import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetCommunitiesInput
  extends Pick<Prisma.CommunityFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCommunitiesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: communities,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.community.count({ where }),
      query: (paginateArgs) => db.community.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      communities,
      nextPage,
      hasMore,
      count,
    }
  }
)
