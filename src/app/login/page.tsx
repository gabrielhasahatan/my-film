import { authOptions } from "@/lib/auth"
import { LoginForm } from "@/modules/Login/components/LoginForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const Page = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/dashboard")
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

export default Page
