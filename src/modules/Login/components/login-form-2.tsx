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
import { useRouter, useSearchParams } from "next/navigation"
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
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? "/"
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
        router.push(callbackUrl)
        router.refresh()
      }
    })
  }


  return (
    <div className={cn("flex flex-col gap-6 text-[#FAFAFA]", className)} {...props}>
      <Card className="ring-white/50 bg-[#171717] shadow-none">
        <CardContent>
          <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)} id="form-login">
            <FieldGroup>
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
                  Don&apos;t have an account? <Link href="/sign-up" className="text-[#FAFAFA] underline underline-offset-4">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
