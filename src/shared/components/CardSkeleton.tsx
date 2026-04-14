import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const CardSkeleton = () => {
  return (
    <>
      <Card className="max-w-full max-h-svh ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none">
        <CardHeader>
          <Skeleton className="aspect-video bg-gray-800 w-full" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="h-4 w-2/3 bg-gray-800" />
          <Skeleton className="h-4 w-1/2 bg-gray-800" />
        </CardContent>
      </Card>
    </>
  )
}

export default CardSkeleton
