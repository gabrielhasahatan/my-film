"use client"

import { Clapperboard, Film, House, MenuIcon, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react';
import SearchDialog from '@/modules/Search/components/search-form';
import AvatarProfileUser from './AvatarProfileUser';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
type NavigationItem = {
  title: string
  href: string
}[]

const navigationData: NavigationItem = [
  {
    title: "Home",
    href: "/"
  },
  {
    title: "Kedua",
    href: "/movie"
  },
  {
    title: "Ketiga",
    href: "/movie"
  },
  {
    title: "Keempat",
    href: "/movie"
  },
]

const Navbar = () => {
  const pathName = usePathname()
  const [openSearchDialog, setOpenSearchDialog] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 1);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <SearchDialog open={openSearchDialog} onOpen={setOpenSearchDialog} />
      <div className={` fixed w-full top-0 px-10 z-50`}>
        <div className={`transition-all ease-out duration-500 mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 rounded-full py-2 sm:px-6 ${isScrolled ? `bg-black/20 mt-1 backdrop-blur-sm` : `bg-transparent mt-0`}`}>
          <div className='text-white flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16'>
            <Link href='/' className={`flex gap-2 hover:text-primary max-md:hiddenhover:text-primary max-md:hidden px-3 py-2 rounded-full ${pathName === '/' ? `bg-purple-950/50 font-semibold` : ``}`}>
              <House color={`${pathName == '/' ? 'purple' : 'white'}`} />
              Home
            </Link>
            <Link href='/tv' className={`flex gap-2 hover:text-primary max-md:hiddenhover:text-primary max-md:hidden px-3 py-2 rounded-full ${pathName.startsWith('/tv') ? `bg-purple-950/50 font-semibold` : ``}`}>
              <Clapperboard color={`${pathName.startsWith('/tv') ? 'purple' : 'white'}`} />
              Tv Series
            </Link>
            <Link href='/movie' className={`flex gap-2 hover:text-primary max-md:hiddenhover:text-primary max-md:hidden px-3 py-2 rounded-full ${pathName.startsWith('/movie') ? `bg-purple-950/50 font-semibold` : ``}`}>
              <Film color={`${pathName.startsWith('/movie') ? 'purple' : 'white'}`} />
              Film
            </Link>
            <a href='#' className='hover:text-primary max-md:hidden'>
              Contacts
            </a>
          </div>
          <div className='flex items-center gap-6'>
            <Button className={`cursor-pointer`} variant='ghost' size='icon' onClick={() => {
              setOpenSearchDialog(!openSearchDialog)
            }}>
              <SearchIcon color='white' />
            </Button>
            <div className=' text-white'>
              <AvatarProfileUser />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className='md:hidden' asChild>
                <Button variant='outline' size='icon'>
                  <MenuIcon />
                  <span className='sr-only'>Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56 bg-white/30 backdrop-blur-sm md:hidden' align='end'>
                <DropdownMenuGroup>
                  {navigationData.map((item, index) => (
                    <DropdownMenuItem key={index}>
                      <a href={item.href}>{item.title}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
