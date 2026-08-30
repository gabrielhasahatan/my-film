"use server"

import { safeApiRequest, SafeApiResponse } from "@/lib/safeApiRequest"
import { FormRegisterValue } from "../components/register-form"

type SignUpEntityResponse = {
  message: string
}

export const SignUp = async (value: FormRegisterValue): Promise<SafeApiResponse<SignUpEntityResponse>> => {
  return await safeApiRequest<SignUpEntityResponse>(`${process.env.AUTH_ENDPOINT}/api/users/sign_up`, {
    method: "POST",
    body: JSON.stringify({ user: value }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

