import { authOptions } from "@/lib/auth"
import DashboardTabsSelect from "@/modules/Dashboard/components/DashboardTabsSelect"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const page = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }
  return (
    <div className="mt-20">
      <DashboardTabsSelect />
    </div>
  )
}

export default page
