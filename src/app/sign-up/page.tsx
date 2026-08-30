import { authOptions } from "@/lib/auth"
import { RegisterForm } from "@/modules/Login/components/register-form"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const page = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/")
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  )
}

export default page
