import { Card, CardContent, CardHeader } from "./card"
import { Skeleton } from "./skeleton"

const CardSkeleton = () => {
  return (
    <>
      <Card className="max-w-full max-h-svh ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none">
        <CardHeader>
          <Skeleton className="aspect-video w-full" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    </>
  )
}

export default CardSkeleton
