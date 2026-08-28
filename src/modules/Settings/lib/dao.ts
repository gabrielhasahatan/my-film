import { SafeApiResponse } from "@/lib/safeApiRequest";
import { UpdatePasswordResponses } from "../types/entity";
import { safeApiInternalRequest } from "@/lib/safeApiInternalRequest";
import { CreateNewPasswordParams } from "../types/params";

export const ProfileUserDao = {
  baseUrl: `${process.env.AUTH_HOST}/api/users`,

  updatePassword: function({ value }: { value: CreateNewPasswordParams }): Promise<SafeApiResponse<UpdatePasswordResponses>> {
    return safeApiInternalRequest<UpdatePasswordResponses>(`${this.baseUrl}/passwords`, {
      method: "PATCH",
      body: JSON.stringify(value)
    })
  }
}
