import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
const TvPopularEmpty = () => {
  return (
    <Empty className="text-white/40">
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page recommendations you're looking for doesn't exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription>
          Need help? <a href="https://www.instagram.com/gabrielhasahatan">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}

export default TvPopularEmpty
