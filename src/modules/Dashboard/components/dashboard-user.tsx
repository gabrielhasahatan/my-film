"use client"

import { useSession } from "next-auth/react"
import DashboardTabsSelect from "./dashboard-tabs-select"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Settings } from "lucide-react"
import DashboardShareButton from "./dashboard-share-button"
import CollectionStats from "@/modules/Collection/components/collections-stats"

const DashboardUser = () => {
  const { status, data: session } = useSession()
  const user = session?.user
  const username = user?.username || "?"
  const userInitial = username.charAt(0).toUpperCase()

  return (
    <div className="bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-neutral-800 p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-neutral-950 overflow-hidden bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-4xl font-bold flex-shrink-0 shadow-lg">
          {user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={username}
              fill
              sizes="112px"
              className="object-cover"
            />
          ) : (
            <span>{userInitial}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white truncate">
                {username}
              </h1>
              <p className="text-neutral-400 text-sm mt-0.5">
                @{user?.email ? user.email.split("@")[0] : username.toLowerCase()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/settings?tabs=profile"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 font-medium text-sm text-neutral-200 hover:text-white transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Edit Profil</span>
              </Link>
              <DashboardShareButton username={username} />
            </div>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 text-xs sm:text-sm mt-4">
            <Calendar className="w-4 h-4 text-neutral-500" />
            <span>Anggota Komunitas Film</span>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-neutral-800/80">
        <CollectionStats />
      </div>
      <div className="mt-8">
        <DashboardTabsSelect />
      </div>
    </div>
  )
}

export default DashboardUser
