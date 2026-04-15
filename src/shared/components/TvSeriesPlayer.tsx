const TvSeriesPlayer = ({ idSeries, seasonSeries, episodeSeries }: { idSeries: string, seasonSeries: string, episodeSeries: string }) => {
  return (
    <>
      <iframe
        src={`https://vidsrcme.ru/embed/tv?tmdb=76479&season=1&episode=2`}
        style={{ width: "100%", aspectRatio: "16/7" }}
        referrerPolicy="origin"
        allowFullScreen
        title={idSeries}
      >
      </iframe>    </>
  )
}

export default TvSeriesPlayer
