import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";

const trendingMovies = [
  { id: 1, title: "Stranger Things", img: "https://images.unsplash.com/photo-1618641986557-1de223cb2f4f?w=500&q=80" },
  { id: 2, title: "The Witcher", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80" },
  { id: 3, title: "Money Heist", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&q=80" },
  { id: 4, title: "Dark", img: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&q=80" },
  { id: 5, title: "Black Mirror", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80" },
];

const continueWatching = [
  { id: 6, title: "Breaking Bad", img: "https://images.unsplash.com/photo-1580204529202-8f6d73672a71?w=500&q=80" },
  { id: 7, title: "Peaky Blinders", img: "https://images.unsplash.com/photo-1633431305705-c2438b770dbc?w=500&q=80" },
  { id: 8, title: "Ozark", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80" },
];

const DashboardUser = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans">
      <section className="relative h-[70vh] w-full bg-zinc-900 md:h-[85vh]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        <div className="absolute bottom-1/4 left-0 flex w-full flex-col px-4 md:w-2/3 md:px-12 lg:w-1/2">
          <h2 className="mb-4 text-5xl font-extrabold uppercase drop-shadow-lg md:text-7xl">
            Interstellar
          </h2>
          <p className="mb-6 max-w-lg text-sm text-zinc-200 drop-shadow-md md:text-base">
            A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Experience the epic journey across the stars.
          </p>
          <div className="flex items-center gap-3">
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 font-semibold gap-2 px-8">
              <Play className="h-5 w-5 fill-black" /> Play
            </Button>
            <Button size="lg" variant="secondary" className="bg-zinc-500/50 text-white hover:bg-zinc-500/70 font-semibold gap-2 px-8 border-none backdrop-blur-sm">
              <Info className="h-5 w-5" /> More Info
            </Button>
          </div>
        </div>
      </section>
      <section className="relative z-10 -mt-20 flex flex-col gap-8 pb-20 px-4 md:px-12">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-zinc-100">Trending Now</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {trendingMovies.map((movie) => (
              <div
                key={movie.id}
                className="group relative h-40 w-72 shrink-0 snap-start cursor-pointer overflow-hidden rounded-md transition-all duration-300 hover:scale-105 hover:z-20 md:h-48 md:w-80"
              >
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:brightness-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-semibold text-white">{movie.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-zinc-100">Continue Watching for You</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {continueWatching.map((movie) => (
              <div
                key={movie.id}
                className="group relative h-40 w-72 shrink-0 snap-start cursor-pointer overflow-hidden rounded-md transition-all duration-300 hover:scale-105 hover:z-20 md:h-48 md:w-80"
              >
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4">
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-zinc-600">
                    <div className="h-full bg-red-600" style={{ width: `${Math.random() * 50 + 20}%` }} />
                  </div>
                  <p className="font-semibold text-white mb-2">{movie.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
}

export default DashboardUser
