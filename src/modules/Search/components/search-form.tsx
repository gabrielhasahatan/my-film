"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { VisuallyHidden } from "radix-ui";
import { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import SearchList from "./search-list";

const SearchDialog = ({ open, onOpen }: { open: boolean, onOpen: (open: boolean) => void }) => {
  const [searchValue, setSearchValue] = useState<string | null>(null)

  const debounced = useDebouncedCallback((val) => {
    setSearchValue(val)
  }, 1000)
  console.log({ searchValue })


  return (
    <>
      <Dialog open={open} onOpenChange={(val) => {
        onOpen(val)
      }}>
        <form>
          <DialogContent className="sm:max-w-md  md:max-w-4xl bg-black/90 border-white/60 border h-svh overflow-y-scroll no-scrollbar flex flex-col">
            <VisuallyHidden.Root>
              <DialogTitle>Search</DialogTitle>
            </VisuallyHidden.Root>
            <FieldGroup className="text-white/80 h-full">
              <Field className={``}>
                <div className="flex  top-7 right-0 md:right-4 items-center border pl-4 gap-2 border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-md w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 30" fill="#6B7280">
                    <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
                  </svg>
                  <Input type="text" onChange={(e) => debounced(e.target.value)} placeholder="Search" className="w-full h-full bg-transparent text-gray-500 text-sm placeholder-gray-500 outline-none border-none ring-0

    focus:outline-none focus:ring-0 focus:border-none
    focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none" />
                </div>
              </Field>
            </FieldGroup>
            {
              searchValue ? <SearchList searchQuery={searchValue} onClose={() => { onOpen(false); setSearchValue(null) }} /> : <div>Kocong</div>
            }
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default SearchDialog
