import { UserEntity } from "@/modules/Dashboard/types/entity"

export type TokenResponse = {
  message: string,
  access_token: string,
  token_type: string,
  created_at: string,
  expires_in: string,
  user: UserEntity
}
