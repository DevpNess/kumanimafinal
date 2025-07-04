"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import DropdownUser from "@/components/dropdownUser";
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
import {useRouter} from "next/navigation"
import { FaGoogle } from 'react-icons/fa'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


export default function ButtonAuth() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { data: session, status } = useSession();

  // Login
  const onSubmitLogin = handleSubmit(async (data) => {
    setGoogleError('');
    const res = await signIn('credentials',{
      email:data.email,
      password: data.password,
      redirect: false,
      origin: 0,
    })
    if (res?.error) {
      setGoogleError('Error al iniciar sesión.');
    }else{
      router.refresh();
    }
  });

  // Registro
  const onSubmitRegister = handleSubmit(async (data) => {
    setGoogleError('');
    if (data.password !== data.confirmPassword) {
        setGoogleError('Las contraseñas no coinciden');
        return;
    }
    const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
            name: data.name,
            lastName: data.lastName,
            nickName: data.nickName,
            email: data.email,
            password: data.password,
            birthDate: data.birthDate
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
      const resLogin = await signIn('credentials',{
        email:data.email,
        password: data.password,
        redirect: false,
        origin: 0,
      })
      if (resLogin?.error) {
        setGoogleError('Error al iniciar sesión después de registrarse.');
      }else{
        router.refresh();
      }
    } else {
      setGoogleError('Error al registrar usuario.');
    }
  });

  // Google Auth (compartido)
  const handleGoogle = async () => {
    setGoogleError('');
    setGoogleLoading(true);
    try {
      const res = await signIn('google', { redirect: false });
      if (res?.error) {
        setGoogleError('Error con Google. Intenta nuevamente.');
      }
    } catch (e) {
      setGoogleError('Error inesperado con Google.');
    } finally {
      setGoogleLoading(false);
    }
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (session) {
    return <DropdownUser/>;
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{isRegister ? 'Registrarme' : 'Inicio de Sesión'}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isRegister ? 'Registro' : 'Inicio de Sesión'}</DialogTitle>
            <DialogDescription>
              {isRegister ? 'Completa la información para registrarte.' : 'Completa la información para ingresar.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={isRegister ? onSubmitRegister : onSubmitLogin}>
            <div className={isRegister ? "grid grid-cols-4 gap-4 py-4" : "grid gap-4 py-4"}>
              {isRegister ? (
                <>
                  <div className="grid items-center gap-1.5 col-span-2">
                    <Label htmlFor="name">Nombre<span className="text-red-500">*</span></Label>
                    <Input id="name" type="text" {...register("name", { required: { value: true, message: 'El nombre no puede estar vació' } })} />
                    {errors.name && <span className="text-red-500">{typeof errors.name.message === 'string' ? errors.name.message : 'error'}</span>}
                  </div>
                  <div className="grid items-center gap-1.5 col-span-2">
                    <Label htmlFor="lastName">Apellido<span className="text-red-500">*</span></Label>
                    <Input id="lastName" type="text" {...register("lastName", { required: { value: true, message: 'El apellido no puede estar vació' } })} />
                    {errors.lastName && <span className="text-red-500">{typeof errors.lastName.message === 'string' ? errors.lastName.message : 'error'}</span>}
                  </div>
                  <div className="grid items-center gap-1.5 col-span-4">
                    <Label htmlFor="nickName">Nickname<span className="text-red-500">*</span></Label>
                    <Input id="nickName" type="text" placeholder="username123" {...register("nickName", { required: { value: true, message: 'El NickName no puede estar vació' } })} />
                    {errors.nickName && <span className="text-red-500">{typeof errors.nickName.message === 'string' ? errors.nickName.message : 'error'}</span>}
                  </div>
                  <div className="grid items-center gap-1.5 col-span-4">
                    <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
                    <Input id="email" type="email" placeholder="user@email.com" {...register("email", { required: { value: true, message: 'El email es obligatorio' } })} />
                    {errors.email && <span className="text-red-500">{typeof errors.email.message === 'string' ? errors.email.message : 'error'}</span>}
                  </div>
                  <div className="grid items-center gap-1.5 col-span-4">
                    <Label htmlFor="birthDate">Fecha de nacimiento<span className="text-red-500">*</span></Label>
                    <Input id="birthDate" type="date" {...register("birthDate", { required: { value: true, message: 'La fecha de nacimiento es obligatoria' } })} />
                    {errors.birthDate && <span className="text-red-500">{typeof errors.birthDate.message === 'string' ? errors.birthDate.message : 'error'}</span>}
                  </div>
                  <div className="grid items-center gap-1.5 col-span-4">
                    <Label htmlFor="password">Contraseña<span className="text-red-500">*</span></Label>
                    <Input id="password" type="password" autoComplete="new-password" {...register("password", { required: { value: true, message: 'La contraseña no puede estar vacia' } })} />
                    {errors.password && <span className="text-red-500">{typeof errors.password.message === 'string' ? errors.password.message : 'error'}</span>}
                  </div>
                  <div className="grid items-center gap-1.5 col-span-4">
                    <Label htmlFor="confirmPassword">Confirma la contraseña<span className="text-red-500">*</span></Label>
                    <Input id="confirmPassword" type="password" autoComplete="new-password" {...register("confirmPassword", { required: { value: true, message: 'Confirma la contraseña' } })} />
                    {errors.confirmPassword && <span className="text-red-500">{typeof errors.confirmPassword.message === 'string' ? errors.confirmPassword.message : 'error'}</span>}
                  </div>
                </>
              ) : (
                <>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Email<span className="text-red-500">*</span></Label>
                    <Input id="email" type="email" placeholder="user@email.com" {...register("email", { required: { value: true, message: 'Campo requerido' } })} />
                    {errors.email && <span className="text-red-500">{errors.email.message && ('')}</span>}
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Contraseña<span className="text-red-500">*</span></Label>
                    <Input id="password" type="password" autoComplete='current-password' placeholder="****" {...register("password", { required: { value: true, message: 'Campo requerido' } })} />
                    {errors.password && <span className="text-red-500">{errors.password.message && ('')}</span>}
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button type="submit">{isRegister ? 'Registrarme' : 'Continuar'}</Button>
            </DialogFooter>
          </form>
          {/* Botón de Google debajo del formulario */}
          <div className="flex flex-col gap-2 mt-4">
            <span className="text-center text-sm text-muted-foreground mb-1">O {isRegister ? 'regístrate' : 'inicia sesión'} con</span>
            <Button
              type="button"
              variant="outline"
              className={`w-full flex items-center gap-2 justify-center border border-gray-300 hover:bg-gray-100 font-semibold shadow-sm transition-all ${googleLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              onClick={handleGoogle}
              disabled={googleLoading}
              style={{ background: 'white', color: '#222' }}
            >
              {googleLoading ? <AiOutlineLoading3Quarters className="animate-spin text-lg text-red-500" /> : <FaGoogle className="text-lg text-red-500" />}
              {googleLoading ? 'Conectando...' : isRegister ? 'Registrarse con Google' : 'Iniciar sesión con Google'}
            </Button>
            {googleError && <span className="text-center text-xs text-red-500 mt-1">{googleError}</span>}
          </div>
          <div className="flex justify-center mt-2">
            <Button variant="link" type="button" onClick={() => { setIsRegister(!isRegister); setGoogleError(''); reset(); }}>
              {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
