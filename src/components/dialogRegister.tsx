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
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaGoogle } from 'react-icons/fa'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { signIn } from "next-auth/react";

export default function DialogLogin(props: { children: React.ReactNode }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    const [googleLoading, setGoogleLoading] = useState(false);
    const [googleError, setGoogleError] = useState('');

    const onSubmit = handleSubmit(async (data) => {
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
            alert('Registrado')
        }
    });

    const handleGoogleRegister = async () => {
        setGoogleError('');
        setGoogleLoading(true);
        try {
            const res = await signIn('google', { redirect: false });
            if (res?.error) {
                setGoogleError('Error al registrarse con Google. Intenta nuevamente.');
            }
        } catch (e) {
            setGoogleError('Error inesperado con Google.');
        } finally {
            setGoogleLoading(false);
        }
    }

    console.log(errors);

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline">{props.children}</Button>
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
                <form action="" onSubmit={onSubmit}>
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
                            <Input id="nickName" type="text" className="col-span-3" placeholder="username123" {...register("nickName", {
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
                    <div className="flex flex-col gap-2 mb-2">
                        <span className="text-center text-sm text-muted-foreground mb-1">O regístrate con</span>
                        <Button
                            type="button"
                            variant="outline"
                            className={`w-full flex items-center gap-2 justify-center border border-gray-300 hover:bg-gray-100 font-semibold shadow-sm transition-all ${googleLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                            onClick={handleGoogleRegister}
                            disabled={googleLoading}
                            style={{ background: 'white', color: '#222' }}
                        >
                            {googleLoading ? <AiOutlineLoading3Quarters className="animate-spin text-lg text-red-500" /> : <FaGoogle className="text-lg text-red-500" />}
                            {googleLoading ? 'Conectando...' : 'Registrarse con Google'}
                        </Button>
                        {googleError && <span className="text-center text-xs text-red-500 mt-1">{googleError}</span>}
                    </div>
                    <DialogFooter>
                        <Button type="submit">Registrarme</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}