import { authOptions } from "@/lib/auth"
import { TrendingAllWeek } from "@/modules/AllTrending/lib/action"
import DashboardUser from "@/modules/Dashboard/components/dashboard-user"
import ErrorContainer from "@/shared/components/error-container"
import { GetImageLink } from "@/shared/types/consts"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { redirect } from "next/navigation"

const page = async () => {
  const session = await getServerSession(authOptions)

  const trendingPoster = await TrendingAllWeek()

  if (!session) {
    redirect("/login")
  }

  if (!trendingPoster.success) {
    return <ErrorContainer />
  }

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 text-white">
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        {trendingPoster.data.results ? (
          <Image
            src={`${GetImageLink}/${trendingPoster.data.results[0].backdrop_path}`}
            alt="Latar belakang profil"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-50"
          />
        ) : (
          <div className="h-full w-full bg-neutral-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 -mt-24 sm:-mt-28 md:-mt-32 pb-16">
        <DashboardUser />
      </div>
    </div>
  )
}

export default page
