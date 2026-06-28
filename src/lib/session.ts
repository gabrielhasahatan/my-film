import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth";

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  } else {
    return session.user
  }
}
