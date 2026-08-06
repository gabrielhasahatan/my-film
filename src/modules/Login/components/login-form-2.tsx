"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod/v3";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email("Masukkan format email yang benar"),
  password: z.string().min(1, "Masukkan password anda")
})
type FormValue = z.infer<typeof formSchema>

export function LoginForm2({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })


  const onSubmit = (value: FormValue) => {
    startTransition(async () => {
      const response = await signIn("credentials", {
        email: value.email,
        password: value.password,
        redirect: false
      })
      if (response?.error) {
        toast.error("Email or Password Wrong")
      } else {
        toast.success("Login Success")
        router.replace("/")
      }
    })
  }


  return (
    <div className={cn("flex flex-col gap-6 text-[#FAFAFA]", className)} {...props}>
      <Card className="ring-white/50 bg-[#171717] shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Welcome back</CardTitle>
          <CardDescription className="text-white/50">
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)} id="form-login">
            <FieldGroup>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  className="border-white/10 bg-transparent text-[#FAFAFA] hover:bg-white/5 hover:text-[#FAFAFA]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="border-white/10 bg-transparent text-[#FAFAFA] hover:bg-white/5 hover:text-[#FAFAFA]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="text-white/50 *:data-[slot=field-separator-content]:bg-[#171717] before:border-white/10 after:border-white/10">
                Or continue with
              </FieldSeparator>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      autoComplete="off"
                      placeholder="me@example.com"
                      aria-invalid={fieldState.invalid}
                      className="border-white/10 bg-transparent placeholder:text-white/40"
                    />
                    {fieldState.invalid && (
                      <FieldError className="text-red-400 italic text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link href="#" className="text-sm text-white/50 hover:text-[#FAFAFA] underline-offset-4 hover:underline transition-all ease-in duration-100">
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      className="border-white/10 bg-transparent"
                    />
                    {fieldState.invalid && (
                      <FieldError className="text-red-400 italic text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button
                  type="submit"
                  form="form-login"
                  className="h-11 w-full text-base cursor-pointer bg-white text-black hover:bg-white/90"
                >
                  Login
                  {isPending && <Spinner />}
                </Button>
              </Field>
              <Field>
                <FieldDescription className="text-center text-white/50">
                  Don&apos;t have an account? <a href="#" className="text-[#FAFAFA] underline underline-offset-4">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-white/50">
        By clicking continue, you agree to our <a href="#" className="underline underline-offset-4 hover:text-[#FAFAFA]">Terms of Service</a>{" "}
        and <a href="#" className="underline underline-offset-4 hover:text-[#FAFAFA]">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
