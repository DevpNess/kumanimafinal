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


export default function ButtonAuth() {
  //Codigo Login y Register
    const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  //Codigo de formulario de Login

  const onSubmitLogin = handleSubmit(async (data) => {
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
  //Codigo de formulario de Register
  const onSubmitRegister = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
        return alert("Passwords do not match");
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
        alert('Registrado')
    }
});


  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        <DropdownUser/>
      </>
    );
  }
  return (
    <>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Inicio de Sesión</Button>
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
        <form action="" onSubmit={onSubmitLogin}>
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
    <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline">Registrarme</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[40%]">
                <DialogHeader>
                    <DialogTitle>
                        Registro
                    </DialogTitle>
                    <DialogDescription>
                        Completa la información para registrarte.
                    </DialogDescription>
                </DialogHeader>
                <form action="" onSubmit={onSubmitRegister}>
                    <div className="grid grid-cols-4 gap-4 py-4" >
                        <div className="grid items-center gap-1.5 col-span-2">
                            <Label htmlFor="name">Nombre<span className="text-red-500">*</span></Label>
                            <Input id="name" type="text" className="col-span-3" placeholder="" {...register("name", {
                                required: {
                                    value: true,
                                    message: 'El nombre no puede estar vació'
                                }
                            })}
                            />
                            {errors.name && (
                                typeof errors.name.message === 'string' ? (
                                    <span className="text-red-500">{errors.name.message}</span>
                                ) : <span className="text-red-500">error</span>
                            )}
                        </div>
                        <div className="grid items-center gap-1.5 col-span-2">
                            <Label htmlFor="lastName">Apellido<span className="text-red-500">*</span></Label>
                            <Input id="lastName" type="text" className="col-span-3" placeholder="" {...register("lastName", {
                                required: {
                                    value: true,
                                    message: 'El apellido no puede estar vació'
                                }
                            })}
                            />
                            {errors.lastName && (
                                typeof errors.lastName.message === 'string' ? (
                                    <span className="text-red-500">{errors.lastName.message}</span>
                                ) : <span className="text-red-500">error</span>
                            )}
                        </div>
                        <div className="grid items-center gap-1.5 col-span-4">
                            <Label htmlFor="nickName">Nickname<span className="text-red-500">*</span></Label>
                            <Input id="nickName" type="text" className="col-span-3" placeholder="username123" 
                            
                            {...register("nickName", {
                                required: {
                                    value: true,
                                    message: 'El NickName no puede estar vació'
                                }
                            })}
                            />
                            {errors.nickName && (
                                typeof errors.nickName.message === 'string' ? (
                                    <span className="text-red-500">{errors.nickName.message}</span>
                                ) : <span className="text-red-500">error</span>
                            )}
                        </div>
                        <div className="grid items-center gap-1.5 col-span-4">
                            <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
                            <Input id="email" type="email" className="col-span-3" placeholder="user@email.com" {...register("email", {
                                required: {
                                    value: true,
                                    message: 'El email es obligatorio'
                                }
                            })}
                            />
                            {errors.email && (
                                typeof errors.email.message === 'string' ? (
                                    <span className="text-red-500">{errors.email.message}</span>
                                ) : <span className="text-red-500">error</span>
                            )}
                        </div>
                        <div className="grid items-center gap-1.5 col-span-4">
                            <Label htmlFor="birthDate">Fecha de nacimiento<span className="text-red-500">*</span></Label>
                            <Input id="birthDate" type="date" className="col-span-3" placeholder="" {...register("birthDate", {
                                required: {
                                    value: true,
                                    message: 'La fecha de nacimiento es obligatoria'
                                }
                            })}
                            />
                            {errors.birthDate && (
                                typeof errors.birthDate.message === 'string' ? (
                                    <span className="text-red-500">{errors.birthDate.message}</span>
                                ) : <span className="text-red-500">error</span>
                            )}
                        </div>
                        <div className="grid items-center gap-1.5 col-span-4">
                            <Label htmlFor="password">Contraseña<span className="text-red-500">*</span></Label>
                            <Input id="password" type="password" className="col-span-3" placeholder="********"
                                autoComplete="new-password"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'La contraseña no puede estar vacia'
                                    }
                                })}
                            />
                            {errors.password && (
                                typeof errors.password.message === 'string' ? (
                                    <span className="text-red-500">{errors.password.message}</span>
                                ) : <span className="text-red-500">error</span>
                            )}
                        </div>
                        <div className="grid items-center gap-1.5 col-span-4">
                            <Label htmlFor="confirmPassword">Confirma la contraseña<span className="text-red-500">*</span></Label>
                            <Input id="confirmPassword" type="password" className="col-span-3" placeholder="********"
                                autoComplete="new-password"
                                {...register("confirmPassword", {
                                    required: {
                                        value: true,
                                        message: 'Confirma la contraseña'
                                    }
                                })}
                            />
                            {errors.confirmPassword && (
                                typeof errors.confirmPassword.message === 'string' ? (
                                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                                ) : <span className="text-red-500">error</span>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Registrarme</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>
  );
}
