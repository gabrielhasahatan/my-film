"use client"
import { MenuIcon, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState } from 'react';
import SearchDialog from '@/modules/Search/components/search-form';
import AvatarProfileUser from './AvatarProfileUser';
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
  const [openSearchDialog, setOpenSearchDialog] = useState(false)


  return (
    <>
      <SearchDialog open={openSearchDialog} onOpen={setOpenSearchDialog} />
      <div className='fixed w-full top-0 z-50'>
        <div className='mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-7 sm:px-6'>
          <div className='text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16'>
            <a href='/' className='hover:text-primary max-md:hidden'>
              Home
            </a>
            <a href='#' className='hover:text-primary max-md:hidden'>
              Products
            </a>
            <a href='#' className='hover:text-primary max-md:hidden'>
              About Us
            </a>
            <a href='#' className='hover:text-primary max-md:hidden'>
              Contacts
            </a>
          </div>
          <div className='flex items-center gap-6'>
            <Button className={`cursor-pointer`} variant='ghost' size='icon' onClick={() => {
              setOpenSearchDialog(!openSearchDialog)
            }}>
              <SearchIcon />
            </Button>
            <div className='bg-gray-200 p-2 rounded-xl ring ring-purple-500 ring-offset-0'>
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
