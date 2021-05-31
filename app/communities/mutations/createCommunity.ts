import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateCommunity = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateCommunity), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const community = await db.community.create({ data: input })

  return community
})
