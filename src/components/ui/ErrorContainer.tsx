import { Alert, AlertAction, AlertDescription, AlertTitle } from "./alert"
import { Button } from "./button"
import { Info } from 'lucide-react';

const ErrorContainer = () => {
  return (
    <>
      <Alert>
        <Info />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
        <AlertAction>
          <Button variant="outline">Enable</Button>
        </AlertAction>
      </Alert>
    </>
  )
}

export default ErrorContainer
