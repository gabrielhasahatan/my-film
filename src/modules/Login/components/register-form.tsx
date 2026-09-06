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
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { SignUp } from "../lib/action"

const formSchema = z.object({
  username: z.string().min(3, "Minimal panjang username adalah 3"),
  email: z.string().email("Masukkan format email yang benar"),
  password: z.string().min(1, "Masukkan password anda"),
  password_confirmation: z.string().min(1, "Konfirmasi password anda")
}).refine((data) => data.password === data.password_confirmation, {
  message: "Password tidak sama",
  path: ["password_confirmation"],
});
export type FormRegisterValue = z.infer<typeof formSchema>

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<FormRegisterValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    }
  })


  const onSubmit = async (value: FormRegisterValue) => {
    startTransition(async () => {
      const response = await SignUp(value)
      if (response.success) {
        toast.success(response.data.message)
        router.replace('/login')
      } else {
        toast.error(response.data.message)
      }
    })
  }


  return (
    <div className={cn("flex flex-col gap-6 text-[#FAFAFA]", className)} {...props}>
      <Card className="ring-white/50 bg-[#171717] shadow-none">
        <CardContent>
          <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)} id="form-register">
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      type="text"
                      autoComplete="off"
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
              <Controller
                name="password_confirmation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="password_confirmation"
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
                  form="form-register"
                  className="h-11 w-full text-base cursor-pointer bg-white text-black hover:bg-white/90"
                >
                  Daftar
                  {isPending && <Spinner />}
                </Button>
              </Field>
              <Field>
                <FieldDescription className="text-center text-white/50">
                  Already have an account? <Link href="/login" className="text-[#FAFAFA] underline underline-offset-4">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
