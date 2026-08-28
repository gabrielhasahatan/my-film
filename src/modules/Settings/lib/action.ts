"use server"

import { CreateNewPasswordParams } from "../types/params"
import { ProfileUserDao } from "./dao"

export const updatePassowrdUser = async ({ value }: { value: CreateNewPasswordParams }) => {
  return await ProfileUserDao.updatePassword({ value: value })
}
