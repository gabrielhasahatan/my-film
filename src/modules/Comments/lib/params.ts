import * as z from "zod/v3";

export const createCommentSchema = z.object({
  media_type: z.string(),
  media_id: z.string(),
  content: z.string().min(1, { message: "Komentar tidak boleh kosong" }),
  parent_id: z.string().optional(),
  backdrop: z.string().optional().nullable()
})


export type CreateCommentParams = z.infer<typeof createCommentSchema>
