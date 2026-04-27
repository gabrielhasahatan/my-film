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
import { Separator } from "@/components/ui/separator";

const SearchDialog = ({ open, onOpen }: { open: boolean, onOpen: (open: boolean) => void }) => {
  const [searchValue, setSearchValue] = useState<string | null>(null)

  const debounced = useDebouncedCallback((val) => {
    setSearchValue(val)
  }, 800)


  return (
    <>
      <Dialog open={open} onOpenChange={(val) => {
        onOpen(val)
        if (!val) setSearchValue(null)
      }}>
        <DialogContent className="sm:max-w-md md:max-w-2xl h-[80svh] bg-[#0d0d0d] border border-white/10 overflow-hidden flex flex-col p-0">
          <VisuallyHidden.Root>
            <DialogTitle>Search</DialogTitle>
          </VisuallyHidden.Root>

          <div className="sticky top-0 z-10 bg-[#0d0d0d] px-5 pt-5 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 h-11 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 30 30" fill="#6B7280">
                <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
              </svg>
              <Input
                type="text"
                onChange={(e) => debounced(e.target.value)}
                placeholder="Cari film, serial, dan lainnya..."
                className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none border-none ring-0
            focus:outline-none focus:ring-0 focus:border-none
            focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
            {searchValue ? (
              <>
                <p className="text-xs text-white/40 mb-3 uppercase tracking-widest">
                  Hasil untuk &quot;{searchValue}&quot;
                </p>
                <SearchList
                  searchQuery={searchValue}
                  onClose={() => { onOpen(false); setSearchValue(null) }}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white/20 gap-2">
                <p className="text-sm">Ketik sesuatu untuk mencari</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SearchDialog
