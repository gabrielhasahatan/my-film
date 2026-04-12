"use client"
const MoviePlayer = ({ id }: { id: string }) => {
  return (
    <div>
      <iframe
        src={`https://vidsrc.xyz/embed/movie?tmdb=${id}`}
        style={{ width: "100%", aspectRatio: "16/9" }}
        referrerPolicy="origin"
        allowFullScreen
        title={id}
      >
      </iframe>
    </div>
  )
}

export default MoviePlayer
