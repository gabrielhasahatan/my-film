"use client"
import { FieldGroup } from "@/components/ui/field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Settings, ShieldCheck, User } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useQueryState } from "nuqs"
import { ReactElement } from "react"
import SettingContentSecurity from "./settings-content/settings-content-security"

const SettingsTabsSelect = () => {
  const searchParams = useSearchParams()
  const tabParams = searchParams.get("tabs")
  const [tab, setTab] = useQueryState("tabs", {
    defaultValue: tabParams ?? "profile"
  })

  const items: { value: string, title: string, Icon: ReactElement }[] = [
    { value: "profile", title: "Profile", Icon: <User className="h-4 w-4" /> },
    { value: "subscribe", title: "Subscribe", Icon: <Crown className="h-4 w-4" /> },
    { value: "security", title: "Security", Icon: <ShieldCheck className="h-4 w-4 text-rose-500" /> },
    { value: "account", title: "Account", Icon: <Settings className="h-4 w-4" /> },
  ]


  return (
    <div className="mt-40">
      <div className="mx-auto max-w-6xl min-h-[50vh] bg-neutral-900/70 p-4 rounded-2xl">
        <FieldGroup>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 gap-1 rounded-2xl">
              {items.map((item, i) => (
                <TabsTrigger
                  key={i}
                  value={item.value}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-neutral-400 transition data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  {item.Icon}
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <SettingsUserFormRendered tab={tab} />
        </FieldGroup>
      </div>
    </div>

  )
}

export default SettingsTabsSelect


const SettingsUserFormRendered = ({ tab }: { tab: string }) => {
  switch (tab) {
    case "profile":
      return (
        <div>ini profile</div>
      )
    case "subscribe":
      return (
        <div>subscribe is ongoing</div>
      )
    case "security":
      return (
        <SettingContentSecurity />
      )
    case "account":
      return (
        <div>account is ongoing</div>
      )
  }
}
