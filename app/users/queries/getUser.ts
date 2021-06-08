import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetUser = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetUser), resolver.authorize(), async ({ id }) => {
  const user = await db.user.findFirst({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  })

  if (!user) throw new NotFoundError()

  return user
})
