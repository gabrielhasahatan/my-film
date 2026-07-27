import * as z from "zod/v3";

export const createWatchListSchema = z.object({
  media_id: z.string(),
  media_type: z.string()
})


export type CreateWatchListParams = z.infer<typeof createWatchListSchema>
