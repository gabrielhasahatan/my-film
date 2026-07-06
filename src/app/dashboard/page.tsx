import { authOptions } from "@/lib/auth"
import CollectionsComments from "@/modules/Collection/components/CollectionsComments"
import DashboardUser from "@/modules/Dashboard/components/DashboardUser"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const page = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }
  return (
    <div>
      <CollectionsComments />
    </div>
  )
}

export default page
