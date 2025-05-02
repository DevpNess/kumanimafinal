'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import {signIn} from "next-auth/react"
import {useRouter} from "next/navigation"
export default function DialogLogin(props: { children: React.ReactNode }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = handleSubmit(async (data) => {

    
    const res = await signIn('credentials',{
      email:data.email,
      password: data.password,
      redirect: false,
      origin: 0,
    })
    if (res?.error) {
      console.log(res)
    }else{
      router.refresh()
    }
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{props.children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Inicio de Sesión
          </DialogTitle>
          <DialogDescription>
            Completa la información para ingresar.
          </DialogDescription>
        </DialogHeader>
        <form action="" onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Email<span className="text-red-500">*</span></Label>
              <Input id="email"  type="email" className="col-span-3" placeholder="user@email.com" {...register("email", { required: {
                    value: true,
                    message: 'Campo requerido'
                  } })} />
              {errors.email && (
                <span className="text-red-500">{errors.email.message &&('')}</span>
              )}
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label >Contraseña<span className="text-red-500">*</span></Label>
              <Input id="password" type="password" autoComplete='current-password' className="col-span-3" placeholder="****" {...register("password", {
                required: {
                  value: true,
                  message: 'Campo requerido'
                }
              })} />
              {errors.password && (
                <span className="text-red-500">{errors.password.message && ('')}</span>
              )}
            </div>
          </div>


          <DialogFooter>
            <Button type="submit">Continuar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}