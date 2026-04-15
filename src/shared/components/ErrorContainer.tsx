"use client"
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ErrorContainer = () => {
  const router = useRouter()
  return (
    <>
      <Alert className='bg-gray-800/50 my-10 text-gray-50'>
        <Info />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There's something wrong!, you can refresh
        </AlertDescription>
        <AlertAction>
          <Button variant="outline" onClick={() => {
            router.refresh()
          }}>Refresh</Button>
        </AlertAction>
      </Alert>
    </>
  )
}

export default ErrorContainer
