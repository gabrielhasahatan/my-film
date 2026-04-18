"use client"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useTvDetailContext } from "./tv-detail-provider"

const TvSeasonDropdownButton = ({ onChangeSelect }: { onChangeSelect: (value: string) => void }) => {
  const { detail } = useTvDetailContext()
  const [alignItemWithTrigger] = useState(true)

  return (
    <>
      <FieldGroup className="w-full max-w-[150px] sm:max-w-xs">
        <Field className="bg-white/50 rounded-lg">
          <Select onValueChange={onChangeSelect} defaultValue={detail.seasons[1].season_number.toString()}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              position={alignItemWithTrigger ? "item-aligned" : "popper"}
            >
              <SelectGroup className="bg-gray-200 text-black">
                {detail.seasons.map((data, index) => {
                  return (
                    data.episode_count > 0 ?
                      <SelectItem key={index} value={data.season_number.toString()}>{data.name}</SelectItem>
                      : null
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>
    </>
  )
}

export default TvSeasonDropdownButton
