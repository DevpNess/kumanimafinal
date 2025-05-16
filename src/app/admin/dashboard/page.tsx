"use client";
import { useSession } from "next-auth/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import React, { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Menu from './components/Menu';
import MangaBusqueda from './components/MangaBusqueda';
import MangaEdicion from './components/MangaEdicion';
import MangaAgregar from './components/MangaAgregar';
import MangaAgregarCapitulo from './components/MangaAgregarCapitulo';
import MangaActualizar from './components/MangaActualizar';
import MangaValidar from './components/MangaValidar';
import AnimeBusqueda from './components/AnimeBusqueda';
import AnimeEdicion from './components/AnimeEdicion';
import AnimeAgregar from './components/AnimeAgregar';
import AnimeAgregarCapitulo from './components/AnimeAgregarCapitulo';
import AnimeActualizar from './components/AnimeActualizar';
import AnimeValidar from './components/AnimeValidar';

interface MangaSite {
  id: number;
  name: string;
  domain: string;
  SelectorName: string;
  SelectorDescription: string;
  SelectorStatus: string;
  SelectorType: string;
  SelectorAuthor: string;
  SelectorScan: string;
  SelectorGenres: string;
  SelectorBanner: string;
  SelectorNumberChapters: string;
  SelectorImageChapter: string;
}

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

const componentMap = (mangaSite: MangaSite[] = []) => ({
  'manga-busqueda': <MangaBusqueda sitios={mangaSite || []} />,
  'manga-edicion': <MangaEdicion sitios={mangaSite || []} />,
  'manga-agregar': <MangaAgregar sitios={mangaSite || []} />,
  'manga-agregar-capitulo': <MangaAgregarCapitulo sitios={mangaSite || []} />,
  'manga-actualizar': <MangaActualizar sitios={mangaSite || []} />,
  'manga-validar': <MangaValidar sitios={mangaSite || []} />,
  'anime-busqueda': <AnimeBusqueda sitios={mangaSite || []} />,
  'anime-edicion': <AnimeEdicion sitios={mangaSite || []} />,
  'anime-agregar': <AnimeAgregar sitios={mangaSite || []} />,
  'anime-agregar-capitulo': <AnimeAgregarCapitulo sitios={mangaSite || []} />,
  'anime-actualizar': <AnimeActualizar sitios={mangaSite || []} />,
  'anime-validar': <AnimeValidar sitios={mangaSite || []} />,
} as Record<string, React.ReactNode>);

const Dashboard = () => {
  const [selected, setSelected] = React.useState('manga-busqueda');
  const [mangaSite, setMangaSite] = useState<MangaSite[]>([]);
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/scraping/mangascraping')
      .then(response => response.json())
      .then(data => {
        setMangaSite(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching manga sites:', error);
        setIsLoading(false);
      });
  }, []);

  if (status === "loading" || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-screen min-h-screen w-full bg-[#18181b]">
      <Menu selected={selected} onSelect={setSelected} />
      <div className="flex-1 p-6 overflow-auto m-[10px] rounded-xl shadow-md bg-[#09090b]">
        {componentMap(mangaSite)[selected]}
      </div>
    </div>
  );
};
export default Dashboard;
