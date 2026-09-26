"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, Eye, MessageSquareText } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useQueryState } from "nuqs"
import CollectionsComments from "@/modules/Collection/components/collections-comments"
import Link from "next/link"
import CollectionsWatchList from "@/modules/Collection/components/collections-watch-list"

const DashboardTabsSelect = () => {
  const searchParams = useSearchParams()
  const tabParams = searchParams.get("tabs")
  const [tab, setTab] = useQueryState("tabs", {
    defaultValue: tabParams ?? "watch_lists"
  })

  return (
    <div className="w-full">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 rounded-2xl bg-neutral-900/80 border border-neutral-800 !h-fit">
          <TabsTrigger
            value="watch_lists"
            className="group flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-400 transition data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            <Bookmark className="w-6 h-6 group-data-[state=active]:text-purple-900 group-data-[state=active]:stroke-3 transition-colors" />
            Daftar tontonan
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="group flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-400 transition data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            <MessageSquareText className="group-data-[state=active]:text-purple-900 group-data-[state=active]:stroke-3 transition-colors" />
            Komentar
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-400 transition data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            <Eye className="w-4 h-4" />
            Aktivitas
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-8">
        <DashboardContentRenderer tab={tab} />
      </div>
    </div>
  )
}

export default DashboardTabsSelect

const DashboardContentRenderer = ({ tab }: { tab: string }) => {
  switch (tab) {
    case "comments":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Komentar & Ulasan Anda</h2>
            <CollectionsComments />
          </div>
        </div>
      )
    case "watch_lists":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Daftar tontonan Anda</h2>
            <CollectionsWatchList />
          </div>
        </div>
      )
    case "activity":
      return (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-8 text-center text-neutral-400">
          <Eye className="mx-auto mb-3 h-8 w-8 text-neutral-500" />
          <p className="text-base font-medium text-neutral-200">Riwayat Tontonan & Interaksi</p>
          <p className="mt-1 text-sm text-neutral-400">
            Aktivitas menonton dan reaksi film terbaru Anda akan dicatat di sini.
          </p>
          <Link
            href="/movie"
            className="inline-block mt-4 text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Mulai jelajahi film &rarr;
          </Link>
        </div>
      )
    default:
      return null
  }
}
