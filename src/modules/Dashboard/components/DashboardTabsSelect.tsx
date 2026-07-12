"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"
import { useQueryState } from 'nuqs'
import DashboardSettings from "./tabs_content/DashboardSettings"
import CollectionsComments from "./collections/CollectionsComments"
import { Cog, Settings } from "lucide-react"

const DashboardTabsSelect = () => {
  const searchParams = useSearchParams()
  const tabParams = searchParams.get("tab")
  const [tab, setTab] = useQueryState("tab", {
    defaultValue: tabParams ?? "settings"
  })

  const tabsItems: { value: string, title: string }[] = [
    { value: "settings", title: "Settings" },
    { value: "collections-watch", title: "Koleksi Tontonan" },
    { value: "comments", title: "Komentar" },
  ]



  return (
    <div className="w-full">
      <div className="flex items-center flex-col h-full gap-10">
        <Tabs
          value={tab}
          onValueChange={setTab}
          className="flex max-w-md flex-row items-start justify-center gap-4 "
          orientation="horizontal">
          <TabsList className="gap-4 bg-[#262626]">
            {tabsItems.map((value, i) => {
              return (
                <TabsTrigger key={i} value={value.value} className="ring ring-white/10 py-4 px-6 transition-all ease-in-out duration-300 text-lg font-semibold hover:cursor-pointer text-zinc-400 data-[state=active]:bg-purple-400/60 data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:ring-1 data-[state=active]:ring-zinc-500 [&_svg:not([class*='size-'])]:size-7">
                  <Cog />
                  {value.title}
                </TabsTrigger>
              )
            })}
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
