"use client"
import { Button } from "@/components/ui/button"
import { signInGoogle } from "@/lib/authAction"

const SignIn = () => {

  return (
    <div className="mt-20 bg-amber-50 ">
      <Button className="cursor-pointer" onClick={() => {
        signInGoogle()
      }}>LOGIN</Button>

    </div>
  )
}

export default SignIn
