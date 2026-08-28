"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import * as z from "zod/v3";
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const formSchema = z.object({
  password: z.string().min(1, "Masukkan password anda")
})
type FormValue = z.infer<typeof formSchema>

const SessionErrorHandler = () => {
  const { data: session } = useSession();
  const hasError = (session as any)?.error === "RefreshAccessTokenError";
  const [isPending, startTransition] = useTransition()
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: ""
    }
  })
  const onSubmit = (value: FormValue) => {
    startTransition(async () => {
      const response = await signIn("credentials", {
        email: session?.user.email,
        password: value.password,
        redirect: false
      })
      if (response?.error) {
        toast.error("Password Wrong")
      } else {
        form.reset()
        toast.success("Success to Login Back")
      }
    })
  }

  if (!hasError) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[999] bg-black/20 backdrop-blur-sm no-doc-scroll shadow-lg shadow-white/50">
      <div className="fixed left-1/2 top-1/2 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 space-y-2 rounded-lg bg-black/80 p-4 shadow-lg border-white/30 border-solid border-[.5px]">
        <Label htmlFor={"login-again"} className="text-sm text-white font-semibold">
          Confirm your password before continue
        </Label>
        <form className="grid gap-1" onSubmit={form.handleSubmit(onSubmit)} id="form-login-again">
          <FieldGroup className="gap-2">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    className="border-white/20 bg-transparent outline-none focus-visible:ring-0 focus-visible:border-black/20 text-white"
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
                form="form-login-again"
                className="h-11 w-full text-base cursor-pointer bg-white text-black hover:bg-white/90"
              >
                Submit
                {isPending && <Spinner />}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default SessionErrorHandler;
