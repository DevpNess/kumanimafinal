
'use client'
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import  {Button} from "@/components/ui/button"
import { ModeToggle } from "@/components/theme-button"
import { Input } from "@/components/ui/input"
import ButtonAuth from "./ButtonAuth"
import DialogSearch from "@/components/dialogSearch"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
export default function MainNav() {
    
    const pathname = usePathname()
    const navigation = [
        { id: 1, title: "Inicio", href: "/" },
        { id: 2, title: "Manga", href: "/manga" }, 
        { id: 3, title: "Anime", href: "/anime" },
        { id: 4, title: "Actualizaciones", href: "/actualizaciones" },
        { id: 5, title: "Clasificacion", href: "/clasificacion" }]
    return (
        <div className="items-center flow-root">
            <div className="m-4 hidden md:flex px-[20px]">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Image
                        src="/media/logo_letras_cabeza.svg"
                        width={190}
                        height={150}
                        alt="Picture of the author"
                    />
                </Link>

                <nav className="flex items-center gap-4 text-sm lg:gap-6">
                    {navigation.map(page =>
                        <Link key={page.id}
                            href={page.href}
                            className={cn(
                                "transition-colors hover:text-foreground/80 text-md ",
                                pathname === page.href ? "text-foreground" : "red text-foreground/60"
                            )}
                        >
                            {page.title}
                        </Link>
                    )}
                </nav>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <DialogSearch/>
                    <ButtonAuth/>
                </div>
            </div>
        </div>
    )
} 