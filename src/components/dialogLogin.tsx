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
import { FaGoogle } from 'react-icons/fa'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
export default function DialogLogin(props: { children: React.ReactNode }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');
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

  const handleGoogleLogin = async () => {
    setGoogleError('');
    setGoogleLoading(true);
    try {
      const res = await signIn('google', { redirect: false });
      if (res?.error) {
        setGoogleError('Error al iniciar sesión con Google. Intenta nuevamente.');
      }
    } catch (e) {
      setGoogleError('Error inesperado con Google.');
    } finally {
      setGoogleLoading(false);
    }
  }

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
        {/* Botón de Google debajo del formulario */}
        <div className="flex flex-col gap-2 mt-4">
          <span className="text-center text-sm text-muted-foreground mb-1">O inicia sesión con</span>
          <Button
            type="button"
            variant="outline"
            className={`w-full flex items-center gap-2 justify-center border border-gray-300 hover:bg-gray-100 font-semibold shadow-sm transition-all ${googleLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            style={{ background: 'white', color: '#222' }}
          >
            {googleLoading ? <AiOutlineLoading3Quarters className="animate-spin text-lg text-red-500" /> : <FaGoogle className="text-lg text-red-500" />}
            {googleLoading ? 'Conectando...' : 'Iniciar sesión con Google'}
          </Button>
          {googleError && <span className="text-center text-xs text-red-500 mt-1">{googleError}</span>}
        </div>
      </DialogContent>
    </Dialog>
  )
}