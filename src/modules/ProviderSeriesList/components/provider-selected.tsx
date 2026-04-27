import { ChevronDown, SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type ProviderEntity = {
  name: string
  id: number
}

const PROVIDERS: ProviderEntity[] = [
  { id: 8, name: "Netflix" },
  { id: 9, name: "Prime Video" },
  { id: 337, name: "Disney+" },
  { id: 1825, name: "HBO" },
]

const PROVIDER_META: Record<number, { color: string; slug: string }> = {
  8: { color: "#E50914", slug: "netflix" },
  9: { color: "#00A8E1", slug: "prime" },
  337: { color: "#0063E5", slug: "disney-plus" },
  1825: { color: "#8B5CF6", slug: "hbo" },
}

const getProviderMeta = (id: number) =>
  PROVIDER_META[id] ?? { color: "#a855f7", slug: "series" }

const DropdownMenu = ({
  providers,
  currentId,
  onSelect,
  onClose,
}: {
  providers: ProviderEntity[]
  currentId: number
  onSelect: (provider: ProviderEntity) => void
  onClose: () => void
}) => (
  <>
    <div className="fixed inset-0 z-40" onClick={onClose} />
    <div className="absolute top-full left-0 mt-2 z-50 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl py-2 min-w-[220px] shadow-2xl">
      {providers.map((prov) => {
        const isActive = prov.id === currentId
        const { color } = getProviderMeta(prov.id)
        return (
          <button
            key={prov.id}
            onClick={() => { onSelect(prov); onClose() }}
            className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition flex items-center gap-2"
          >
            <span
              className="font-bold"
              style={{ color: isActive ? color : "rgba(255,255,255,0.9)" }}
            >
              {prov.name}
            </span>
            <span className="text-white/50">Originals Series</span>
            {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />}
          </button>
        )
      })}
    </div>
  </>
)

const ProviderSelected = ({ onSelectChange }: { onSelectChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [current, setCurrent] = useState(PROVIDERS[0])

  const { color, slug } = getProviderMeta(current.id)

  const handleSelect = (provider: ProviderEntity) => {
    setCurrent(provider)
    onSelectChange(provider.id.toString())
  }

  return (
    <div className="flex items-center gap-4 relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 group"
      >
        <h2 className="text-xl font-black tracking-tight text-white">
          <span style={{ color }}>{current.name}</span> Originals Series
        </h2>
        <ChevronDown
          size={16}
          className={`text-white/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <DropdownMenu
          providers={PROVIDERS}
          currentId={current.id}
          onSelect={handleSelect}
          onClose={() => setIsOpen(false)}
        />
      )}

      <Link
        href={`/tv/${slug}`}
        style={{ "--hover-color": color } as React.CSSProperties}
        className="[&:hover]:text-[var(--hover-color)] text-white transition ease-in-out duration-300 flex text-xs items-end gap-2"
      >
        <SquareArrowOutUpRight />
        See More
      </Link>
    </div>
  )
}

export default ProviderSelected
