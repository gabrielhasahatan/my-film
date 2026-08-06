"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod/v3";
import { ArrowRight } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string(),
  password: z.string()
})
type FormValue = z.infer<typeof formSchema>

export const LoginForm = () => {
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
    <Card className="border-white/20 bg-white/95 p-2 shadow-2xl shadow-black/25 backdrop-blur">
      <CardHeader className="space-y-3 pb-2 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-semibold text-white shadow-lg shadow-slate-950/20">
          TM
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Selamat datang kembali
          </CardTitle>
          <CardDescription>
            Masuk untuk mengelola watchlist anda.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)} id="form-login">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input {...field} id="email" type="email" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input {...field} id="password" type="password" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <Button type="submit" form="form-login" className="h-11 w-full text-base cursor-pointer hover:bg-black/20">
                Masuk
                {isPending ? <Spinner /> : <ArrowRight className="size-4" />
                }
              </Button>
            </Field>
            <Field>
              <Button type="button" variant="outline" className="h-11 w-full bg-white cursor-pointer hover:bg-black/20">
                Masuk dengan Google
              </Button>
            </Field>
            <Field>
              <p className="text-center text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <a href="#" className="font-medium text-slate-950 underline-offset-4 hover:underline">
                  Daftar sekarang
                </a>
              </p>
            </Field>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
