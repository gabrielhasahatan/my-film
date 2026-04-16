import TvDetailList from "@/modules/TvDetail/components/tv-detail-list"
import TvDetailProvider from "@/modules/TvDetail/components/tv-detail-provider"
import ErrorContainer from "@/shared/components/ErrorContainer"
import { TvListDao } from "@/shared/lib/dao"

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const detail = await TvListDao.detail(id)

  if (!detail.success) {
    return <ErrorContainer />
  }


  return (
    <TvDetailProvider detail={detail.data}>
      <TvDetailList />
    </TvDetailProvider>
  )
}

export default page
