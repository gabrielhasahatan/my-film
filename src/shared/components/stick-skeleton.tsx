import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const StickSkeleton = () => {
  return (
    <>
      <Card className="max-w-full max-h-svh ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none flex flex-row !gap-0">
        <div>
          <Skeleton className="h-30 w-30 bg-gray-800" />
        </div>
        <div className="w-full flex gap-3 flex-col justify-end">
          <CardHeader className="flex flex-col gap-2">
            <Skeleton className="h-4 w-2/3 bg-gray-800" />
            <Skeleton className="h-4 w-1/2 bg-gray-800" />
          </CardHeader>
          <CardContent >
            <Skeleton className="h-10 bg-gray-800 w-full" />
          </CardContent>
        </div>
      </Card>
    </>
  )
}

export default StickSkeleton
