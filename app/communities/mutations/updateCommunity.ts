import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateCommunity = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateCommunity),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const community = await db.community.update({ where: { id }, data })

    return community
  }
)
