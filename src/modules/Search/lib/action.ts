"use server"

import { SearchListDao } from "@/shared/lib/dao"

export const MultiSearchList = async ({ page, query }: { page: string, query: string }) => {
  return SearchListDao.multi({ page: page, query: query })
}
