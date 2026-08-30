import SettingsUser from "@/modules/Settings/components/settings-user"
import { Suspense } from "react"

const page = () => {
  return (
    <Suspense fallback={null}>
      <SettingsUser />
    </Suspense>
  )
}

export default page
