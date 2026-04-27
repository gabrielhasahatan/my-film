"use client"

import { useUserAuthenticationContext } from "@/shared/components/AuthProvider";

const DashboardProfileUser = () => {
  const { user } = useUserAuthenticationContext()

  return (
    <>
      <div>NAMA : {user?.displayName ?? "Kosongg"}</div>
    </>
  )
}

export default DashboardProfileUser
