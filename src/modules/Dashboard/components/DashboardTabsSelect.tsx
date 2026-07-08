"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"
import { useQueryState } from 'nuqs'
import DashboardSettings from "./tabs_content/DashboardSettings"
import CollectionsComments from "./collections/CollectionsComments"
import { Settings } from "lucide-react"

const DashboardTabsSelect = () => {
  const searchParams = useSearchParams()
  const tabParams = searchParams.get("tab")
  const [tab, setTab] = useQueryState("tab", {
    defaultValue: tabParams ?? "settings"
  })



  return (
    <div className="w-full">
      <div className="flex items-center flex-col h-full gap-10">
        <Tabs
          value={tab}
          onValueChange={setTab}
          className="flex max-w-md flex-row items-start justify-center gap-4 "
          orientation="horizontal">
          <TabsList className="">
            <TabsTrigger value="settings" className="text-xl p-5 bg-[#0C0C0C] text-white data-[state=active]:">
              <Settings />
              Settings
            </TabsTrigger>
            <TabsTrigger value="collections-watch" className="text-xl p-5 bg-[#0C0C0C] text-white data-[state=active]:">Koleksi</TabsTrigger>
            <TabsTrigger value="comments" className="text-xl p-5 bg-[#0C0C0C] text-white data-[state=active]:">Komentar</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="w-full max-w-3xl justify-center flex ">
          <TasbContentRenderer tab={tab} />
        </div>
      </div>
    </div>
  )
}

export default DashboardTabsSelect


const TasbContentRenderer = ({ tab }: { tab: string }) => {
  switch (tab) {
    case "settings":
      return <DashboardSettings />
    case "collections-watch":
      return <div className="text-white">ONGOING</div>
    case "comments":
      return <CollectionsComments />
    default:
      return <DashboardSettings />
  }
}
