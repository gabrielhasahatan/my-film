import * as z from "zod/v3";

export const createNewPasswordSchema = z.object({
  password: z.string(),
  new_password: z.string().min(1, "Masukkan password baru anda"),
  new_password_confirmation: z.string().min(1, "Konfirmasi password baru anda")
}).refine((data) => data.new_password === data.new_password_confirmation, {
  message: "Password tidak sama",
  path: ["new_password_confirmation"],
})

export type CreateNewPasswordParams = z.infer<typeof createNewPasswordSchema>
