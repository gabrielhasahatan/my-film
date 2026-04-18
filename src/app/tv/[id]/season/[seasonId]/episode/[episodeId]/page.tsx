const page = async (
  { params }: {
    params: Promise<{
      id: string,
      seasonId: string,
      episodeId: string
    }>
  }) => {

  const pageParams = await params
  console.log({ pageParams })

  return (
    <div></div>
  )
}

export default page
