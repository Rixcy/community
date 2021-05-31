import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteCommunity = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteCommunity),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const community = await db.community.deleteMany({ where: { id } })

    return community
  }
)
