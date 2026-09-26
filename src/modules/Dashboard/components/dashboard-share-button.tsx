"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { toast } from "sonner"

interface DashboardShareButtonProps {
  username: string
}

const DashboardShareButton = ({ username }: DashboardShareButtonProps) => {
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Profil ${username}`,
          text: `Lihat profil ${username} di Movie App`,
          url,
        })
      } catch {
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url)
        toast.success("Tautan profil disalin ke clipboard")
      } catch {
        toast.error("Gagal menyalin tautan")
      }
    }
  }

  return (
    <Button
      type="button"
      onClick={() => {
        toast.info("Ongoing feature")
      }}
      title="Bagikan Profil"
      aria-label="Bagikan Profil"
      className="w-10 h-10 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
    >
      <Share2 className="w-4 h-4" />
    </Button>
  )
}

export default DashboardShareButton
