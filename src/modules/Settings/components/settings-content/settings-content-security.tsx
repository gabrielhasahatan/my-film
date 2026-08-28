import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Eye, EyeOff, KeyRound, UserRoundKey } from "lucide-react"
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateNewPasswordParams, createNewPasswordSchema } from "../../types/params";
import { updatePassowrdUser } from "../../lib/action";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

const SettingContentSecurity = () => {
  return (
    <div>
      <UpdatePasswordForm />
    </div>
  )
}

export default SettingContentSecurity

function NewPasswordInput({ field, fieldState }: { field: any, fieldState: any }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Input
        {...field}
        type={visible ? "text" : "password"}
        autoComplete="off"
        aria-invalid={fieldState.invalid}
        className="border-white/20 bg-transparent outline-none focus-visible:ring-1 focus-visible:border-black/20 text-white h-13 pr-10"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition"
        aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}


const UpdatePasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const form = useForm<CreateNewPasswordParams>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      new_password: "",
      new_password_confirmation: "",
    }
  })

  const watchedValues = form.watch();
  const isFormEmpty =
    !watchedValues.password ||
    !watchedValues.new_password ||
    !watchedValues.new_password_confirmation;

  const onSubmit = async (value: CreateNewPasswordParams) => {
    startTransition(async () => {
      const response = await updatePassowrdUser({ value: value })
      if (response.success) {
        toast.success(response.data.message)
        signOut({ callbackUrl: `/login?callbackUrl=${pathname}?${searchParams}` })
      } else {
        toast.error(response.data.message)
      }
    })
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-2xl border bg-[#0B0909] p-6">
        <div className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-rose-500" />
          <h2 className="text-lg font-semibold text-white">Change Password</h2>
        </div>
        <p className="mt-1 text-sm text-neutral-500">
          Update your password to keep your account secure.
        </p>
        <div className="mt-5 border-t border-neutral-800" />
        <CardContent className="py-3">
          <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)} id="form-register">
            <FieldGroup className="gap-4">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="text-white">
                    <FieldLabel htmlFor="password">Current Password</FieldLabel>
                    <NewPasswordInput field={{ ...field, id: "password" }} fieldState={fieldState} />
                    {fieldState.invalid && (
                      <FieldError className="text-red-400 italic text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="new_password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="text-white">
                    <FieldLabel htmlFor="new_password">New Password</FieldLabel>
                    <NewPasswordInput field={{ ...field, id: "new_password" }} fieldState={fieldState} />
                    {fieldState.invalid && (
                      <FieldError className="text-red-400 italic text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="new_password_confirmation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="text-white">
                    <FieldLabel htmlFor="new_password">New Password Confirmation</FieldLabel>
                    <NewPasswordInput field={{ ...field, id: "new_password_confirmation" }} fieldState={fieldState} />
                    {fieldState.invalid && (
                      <FieldError className="text-red-400 italic text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild className="text-white">
                  <Button variant="outline" disabled={isPending || isFormEmpty} className="h-12 text-sm">
                    {isPending && <Spinner className="mr-2 h-4 w-4" />}
                    <UserRoundKey />
                    Update Password
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#0B0909] text-white border border-solid border-white/30">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be signed out and logged in again with your new password.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      type="submit"
                      form="form-register"
                      className="text-base cursor-pointer bg-white text-black hover:bg-white/90"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </FieldGroup>
          </form>
        </CardContent>
      </div>
    </div>
  )
}
