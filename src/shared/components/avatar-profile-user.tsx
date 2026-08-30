"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner"
import { Clapperboard, Film, HelpCircle, House, LogIn, LogOut, Settings, User, UserPlus } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const AvatarProfileUser = () => {
  const { data, status } = useSession()
  const pathName = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  console.log({ data })

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted animate-pulse">
        <Spinner className="text-muted-foreground" />
      </div>
    )
  }

  const LoggedInTrigger = data && (
    <button className="flex items-center gap-3 rounded-xl px-2.5 py-1.5 cursor-pointer hover:bg-white/10 hover:backdrop-blur-3xl transition-all ease-in-out duration-75 rounded-xl border border-white/20">
      <Avatar className="">
        <AvatarImage src={data.user.imageUrl} alt={data.user.username} />
        <AvatarFallback className="bg-purple-100 text-black font-semibold text-sm">
          {data.user.username[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="lg:flex flex-col items-start text-left min-w-0 hidden">
        <span className="text-sm font-semibold text-foreground leading-tight truncate max-w-[130px]">
          {data.user.username}
        </span>
      </div>
    </button>
  )

  const GuestTrigger = !data && (
    <button className="flex items-center gap-2 h-9 px-3 rounded-full border border-border bg-background hover:bg-accent transition-colors duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-400">
      <User className="h-4 w-4 text-muted-foreground" />
    </button>
  )

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {data ? LoggedInTrigger : GuestTrigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-black/80 backdrop-blur-sm shadow-xl border border-white/20 rounded-xl p-1"
        align="end"
        sideOffset={8}
      >
        {data ? (
          <>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-white">
              <Avatar className="h-9 w-9 shrink-0 ring-2 ring-purple-200">
                <AvatarImage src={data.user.imageUrl} alt={data.user.username} />
                <AvatarFallback className="bg-purple-100 text-purple-700 font-bold text-sm">
                  {data.user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-foreground truncate">
                  {data.user.username}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {data.user.email}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator className="mt-1 mb-4 bg-white/20" />
            <div className="text-white grid grid-cols-1 gap-2 font-medium lg:hidden">
              <Link
                href="/"
                className={`flex flex-row items-center justify-start gap-1 md:gap-2 hover:text-primary px-3 py-2 rounded-full hover:bg-purple-950/50 transition-all ease-in duration-200 ${pathName === '/' ? 'font-semibold' : ''
                  }`}
              >
                <House color={pathName === '/' ? 'purple' : 'white'} />
                <span className="text-xs md:text-base">Home</span>
              </Link>

              <Link
                href="/tv"
                className={`flex flex-row items-center justify-start gap-1 md:gap-2 hover:text-primary px-3 py-2 rounded-full hover:bg-purple-950/50 transition-all ease-in duration-200 ${pathName.startsWith('/tv') ? 'font-semibold' : ''
                  }`}
              >
                <Clapperboard color={pathName.startsWith('/tv') ? 'purple' : 'white'} />
                <span className="text-xs md:text-base">Tv Series</span>
              </Link>

              <Link
                href="/movie"
                className={`flex flex-row items-center justify-start gap-1 md:gap-2 hover:text-primary px-3 py-2 rounded-full hover:bg-purple-950/50 transition-all ease-in duration-200 ${pathName.startsWith('/movie') ? 'font-semibold' : ''
                  }`}
              >
                <Film color={pathName.startsWith('/movie') ? 'purple' : 'white'} />
                <span className="text-xs md:text-base">Film</span>
              </Link>
              <DropdownMenuSeparator className="my-4 bg-white/20" />
            </div>
            <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-gray-300 focus:bg-accent gap-2.5 px-3 py-2 text-white">
              <Link href="/dashboard">
                <User className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-gray-300 focus:bg-accent gap-2.5 px-3 py-2 text-white">
              <Link href="/settings?tabs=profile">
                <Settings className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>Pengaturan</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-gray-300 focus:bg-accent gap-2.5 px-3 py-2 text-white">
              <Link href="/help">
                <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>Bantuan</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="rounded-lg cursor-pointer gap-2.5 px-3 py-2 text-red-600 focus:bg-red-200 focus:text-red-600"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>

              <AlertDialogContent className="bg-white rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Keluar dari akun?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Anda akan mengakhiri sesi ini. Klik <strong>Keluar</strong> untuk melanjutkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer rounded-lg">
                    Batal
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700 text-white cursor-pointer rounded-lg transition-colors"
                    onClick={() => signOut({ redirect: true })}
                  >
                    Keluar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : (
          <div className="p-2 space-y-1.5 text-white">
            <p className="text-xs text-muted-foreground font-medium px-2 pt-1 pb-2">
              Masuk untuk melanjutkan
            </p>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-accent transition-colors duration-150"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk</span>
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors duration-150 shadow-sm shadow-purple-200"
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar</span>
            </Link>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarProfileUser
