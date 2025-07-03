"use client";
import { useSession } from "next-auth/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import React, { useState, useEffect } from 'react';
import { Check, ChevronsUpDown, Home, BarChart2, Settings, BookOpen, Users, Database, FileText, LifeBuoy, Search, Library, Layers, MessageCircle, ArrowUpRight, ArrowDownRight, LogOut } from "lucide-react"
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
import MangaBusqueda from './components/Manga/MangaBusqueda';
import MangaEdicion from './components/MangaEdicion';
import MangaAgregar from './components/MangaAgregar';
import MangaAgregarCapitulo from './components/MangaAgregarCapitulo';
import MangaActualizar from './components/MangaActualizar';
import MangaValidar from './components/MangaValidar';
import AnimeBusqueda from './components/Anime/AnimeBusqueda';
import AnimeEdicion from './components/AnimeEdicion';
import AnimeAgregar from './components/AnimeAgregar';
import AnimeAgregarCapitulo from './components/AnimeAgregarCapitulo';
import AnimeActualizar from './components/AnimeActualizar';
import AnimeValidar from './components/AnimeValidar';
import ScrapingDashboard from './components/ScrapingDashboard';
import TablaRegistros from './components/TablaRegistros';
import ModalEdicionRegistro from './components/ModalEdicionRegistro';
import ModalAgregarRegistro from './components/ModalAgregarRegistro';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DataTable } from './components/DataTable';
import Image from "next/image";
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import GraficoPanel from './components/GraficoPanel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"

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
  'scraping-dashboard': <ScrapingDashboard />,
} as Record<string, React.ReactNode>);

// Campos completos por tabla, extraídos de schema.prisma
const camposPorTabla: Record<string, { key: string, label: string }[]> = {
  User: [
    { key: 'id', label: 'ID' },
    { key: 'avatar', label: 'Avatar' },
    { key: 'name', label: 'Nombre' },
    { key: 'lastName', label: 'Apellido' },
    { key: 'nickName', label: 'Nick' },
    { key: 'email', label: 'Email' },
    { key: 'emailVerified', label: 'Email Verificado' },
    { key: 'password', label: 'Contraseña' },
    { key: 'createdAt', label: 'Creado' },
    { key: 'updatedAt', label: 'Actualizado' },
  ],
  Account: [
    { key: 'userId', label: 'UserId' },
    { key: 'type', label: 'Tipo' },
    { key: 'provider', label: 'Proveedor' },
    { key: 'providerAccountId', label: 'ProviderAccountId' },
    { key: 'refresh_token', label: 'Refresh Token' },
    { key: 'access_token', label: 'Access Token' },
    { key: 'expires_at', label: 'Expires At' },
    { key: 'token_type', label: 'Token Type' },
    { key: 'scope', label: 'Scope' },
    { key: 'id_token', label: 'Id Token' },
    { key: 'session_state', label: 'Session State' },
    { key: 'createdAt', label: 'Creado' },
    { key: 'updatedAt', label: 'Actualizado' },
  ],
  Session: [
    { key: 'sessionToken', label: 'SessionToken' },
    { key: 'userId', label: 'UserId' },
    { key: 'expires', label: 'Expires' },
    { key: 'createdAt', label: 'Creado' },
    { key: 'updatedAt', label: 'Actualizado' },
  ],
  VerificationToken: [
    { key: 'identifier', label: 'Identifier' },
    { key: 'token', label: 'Token' },
    { key: 'expires', label: 'Expires' },
  ],
  Authenticator: [
    { key: 'id', label: 'ID' },
    { key: 'credentialID', label: 'CredentialID' },
    { key: 'userId', label: 'UserId' },
    { key: 'providerAccountId', label: 'ProviderAccountId' },
    { key: 'credentialPublicKey', label: 'CredentialPublicKey' },
    { key: 'counter', label: 'Counter' },
    { key: 'credentialDeviceType', label: 'CredentialDeviceType' },
    { key: 'credentialBackedUp', label: 'CredentialBackedUp' },
    { key: 'transports', label: 'Transports' },
  ],
  Manga: [
    { key: 'id', label: 'ID' },
    { key: 'path', label: 'Path' },
    { key: 'cap', label: 'Capítulo' },
    { key: 'title', label: 'Título' },
    { key: 'description', label: 'Descripción' },
    { key: 'statusId', label: 'StatusId' },
    { key: 'typeId', label: 'TypeId' },
    { key: 'authorId', label: 'AuthorId' },
    { key: 'scan', label: 'Scan' },
    { key: 'banner', label: 'Banner' },
    { key: 'views', label: 'Vistas' },
    { key: 'dayViews', label: 'Vistas Día' },
    { key: 'weekViews', label: 'Vistas Semana' },
    { key: 'monthViews', label: 'Vistas Mes' },
    { key: 'likesCount', label: 'Likes' },
    { key: 'favoritesCount', label: 'Favoritos' },
    { key: 'seeLaterCount', label: 'Ver Después' },
    { key: 'releaseDate', label: 'Fecha Lanzamiento' },
    { key: 'updateLast', label: 'Actualizado' },
    { key: 'updateNext', label: 'Próxima Actualización' },
  ],
  StatusManga: [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
  ],
  TypeManga: [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
  ],
  AuthorManga: [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
  ],
  ScanManga: [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
  ],
  Genre: [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
  ],
  GenreManga: [
    { key: 'mangaId', label: 'MangaId' },
    { key: 'genreId', label: 'GenreId' },
  ],
  RatingManga: [
    { key: 'id', label: 'ID' },
    { key: 'userId', label: 'UserId' },
    { key: 'mangaId', label: 'MangaId' },
    { key: 'score', label: 'Puntaje' },
  ],
  MangaLike: [
    { key: 'id', label: 'ID' },
    { key: 'userId', label: 'UserId' },
    { key: 'mangaId', label: 'MangaId' },
  ],
  MangaSeeLater: [
    { key: 'id', label: 'ID' },
    { key: 'userId', label: 'UserId' },
    { key: 'mangaId', label: 'MangaId' },
  ],
  MangaFavorite: [
    { key: 'id', label: 'ID' },
    { key: 'userId', label: 'UserId' },
    { key: 'mangaId', label: 'MangaId' },
  ],
  MangaScraping: [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'domain', label: 'Dominio' },
    { key: 'SelectorName', label: 'Selector Nombre' },
    { key: 'SelectorDescription', label: 'Selector Descripción' },
    { key: 'SelectorStatus', label: 'Selector Status' },
    { key: 'SelectorType', label: 'Selector Type' },
    { key: 'SelectorAuthor', label: 'Selector Author' },
    { key: 'SelectorScan', label: 'Selector Scan' },
    { key: 'SelectorGenres', label: 'Selector Géneros' },
    { key: 'SelectorBanner', label: 'Selector Banner' },
    { key: 'SelectorNumberChapters', label: 'Selector N° Capítulos' },
    { key: 'SelectorImageChapter', label: 'Selector Imagen Capítulo' },
  ],
};

const tablas = Object.keys(camposPorTabla);
const PAGE_SIZE = 10;

export default function AdminUniversalDB() {
  const [selected, setSelected] = React.useState('manga-busqueda');
  const [mangaSite, setMangaSite] = useState<MangaSite[]>([]);
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const [tabla, setTabla] = useState('User');
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('datatable-rows-per-page');
      return saved ? parseInt(saved, 10) : 10;
    }
    return 10;
  });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState<any>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false);
  const [eliminarId, setEliminarId] = useState<string | number | null>(null);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [scrapingStatus, setScrapingStatus] = useState<'activo' | 'inactivo'>('activo');
  const [scrapingLogs, setScrapingLogs] = useState([
    { time: '2024-05-20 12:34', msg: 'Scraping completado para MangaPlus.' },
    { time: '2024-05-20 11:10', msg: 'Scraping iniciado para TMO.' },
    { time: '2024-05-20 10:55', msg: 'Error de conexión con sitio X.' },
  ]);
  const [scrapingLast, setScrapingLast] = useState('2024-05-20 12:34');
  const [dbOpen, setDbOpen] = React.useState(true);

  const columns = camposPorTabla[tabla] || [{ key: 'id', label: 'ID' }];

  // Generar columnas para Tanstack Table
  const columnsTanstack = (camposPorTabla[tabla] || [{ key: 'id', label: 'ID' }]).map(col => ({
    id: col.key,
    accessorKey: col.key,
    header: col.label,
    cell: (info: any) => info.getValue(),
  }));

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

  // Protección de ruta: si no hay sesión, redirigir a /auth/
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/auth/';
    }
  }, [status]);

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      table: tabla,
      page: String(page + 1),
      limit: String(rowsPerPage),
      search: search,
    });
    const skip = page * rowsPerPage;
    const res = await fetch(`/api/db?${params.toString()}`);
    let result = {};
    try {
      result = await res.json();
    } catch (e) {
      result = { data: [], total: 0 };
    }
    console.log('DEBUG fetchData:', { result, page, rowsPerPage, skip });
    setData(Array.isArray(result.data) ? result.data : []);
    setTotal(result.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [tabla, page, search, rowsPerPage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('datatable-rows-per-page', String(rowsPerPage));
    }
  }, [rowsPerPage]);

  // Al cambiar rowsPerPage, regresa siempre a la primera página
  useEffect(() => {
    setPage(0);
  }, [rowsPerPage]);

  const handleEdit = (row: any) => {
    setEditando(row);
    setModalAbierto(true);
  };

  const handleSave = async (nuevo: any) => {
    await fetch(`/api/db?table=${tabla}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    });
    fetchData();
    setModalAbierto(false);
    setEditando(null);
  };

  const handleAgregar = async (nuevo: any) => {
    await fetch(`/api/db?table=${tabla}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    });
    fetchData();
    setModalAgregarAbierto(false);
  };

  const handleDelete = (row: any) => {
    setEliminarId(row.id);
    setConfirmarEliminar(true);
  };

  const confirmarBorrado = async () => {
    if (eliminarId == null) return;
    await fetch(`/api/db?table=${tabla}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: eliminarId }),
    });
    fetchData();
    setEliminarId(null);
    setConfirmarEliminar(false);
  };

  const totalPages = Math.ceil(total / rowsPerPage) || 1;

  // KPIs de ejemplo
  const kpis = [
    {
      title: 'Total Revenue',
      value: '$1,250.00',
      trend: '+12.5%',
      trendType: 'up',
      subtitle: 'Trending up this month',
      subdesc: 'Visitors for the last 6 months',
    },
    {
      title: 'New Customers',
      value: '1,234',
      trend: '-20%',
      trendType: 'down',
      subtitle: 'Down 20% this period',
      subdesc: 'Acquisition needs attention',
    },
    {
      title: 'Active Accounts',
      value: '45,678',
      trend: '+12.5%',
      trendType: 'up',
      subtitle: 'Strong user retention',
      subdesc: 'Engagement exceed targets',
    },
    {
      title: 'Growth Rate',
      value: '4.5%',
      trend: '+4.5%',
      trendType: 'up',
      subtitle: 'Steady performance increase',
      subdesc: 'Meets growth projections',
    },
  ];

  // Tabs de categorías sobre la tabla
  const categorias = [
    { key: 'outline', label: 'Outline', count: 8 },
    { key: 'performance', label: 'Past Performance', count: 3 },
    { key: 'personnel', label: 'Key Personnel', count: 2 },
    { key: 'documents', label: 'Focus Documents', count: 4 },
  ];
  const [categoria, setCategoria] = useState('outline');

  React.useEffect(() => {
    if (page > 0 && page >= totalPages) {
      setPage(totalPages - 1);
    }
  }, [totalPages, page]);

  if (status === "loading" || isLoading) {
    return <div className="flex items-center justify-center h-screen"><span className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></span></div>;
  }

  if (!session) return null;

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-[#101012]">
        {/* Panel izquierdo fijo */}
        <aside className="w-72 h-screen sticky top-0 left-0 flex-shrink-0 z-20 flex flex-col justify-between bg-[#101012] border-r border-[#23232b] shadow-lg overflow-x-hidden"
          style={{ overflowY: 'auto', scrollbarWidth: 'none' }}
        >
          <style>{`
            aside::-webkit-scrollbar { display: none; }
          `}</style>
          <div>
            {/* Logo grande y nombre */}
            <div className="flex items-center gap-3 px-6 py-8 border-b border-[#23232b]">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-[#060608] flex items-center justify-center">
                <Image src="/media/logo_cabeza.png" alt="Logo" width={48} height={48} priority />
              </div>
              <span className="text-2xl font-extrabold tracking-wide text-white">Kumanima</span>
            </div>
            {/* Menú principal dinámico con todas las tablas agrupadas en un Collapsible simple */}
            <div>
              <Button variant="ghost" className="w-full justify-between text-base font-semibold group" onClick={() => setDbOpen((v) => !v)}>
                <span className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Bases de datos
                </span>
                <span
                  className={`ml-2 inline-block transition-transform duration-300 ${dbOpen ? 'rotate-90' : 'rotate-0'}`}
                  style={{ transition: 'transform 0.3s' }}
                >
                  ▶
                </span>
              </Button>
              <div
                className="overflow-hidden relative"
                style={{
                  maxHeight: dbOpen ? 1000 : 0,
                  opacity: dbOpen ? 1 : 0,
                  transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s',
                }}
              >
                {/* Línea vertical solo en el contenedor, alineada con el icono */}
                <div className="absolute left-7 top-0 bottom-0 w-px bg-[#39393f]" />
                <nav
                  className="flex flex-col gap-2 mt-2 px-2 w-full"
                  style={{
                    maxHeight: 400,
                    overflowY: 'auto',
                    scrollbarWidth: 'none', // Firefox
                  }}
                >
                  <style>{`
                    nav::-webkit-scrollbar { display: none; }
                  `}</style>
                  {tablas.map((nombre) => (
                    <Button
                      key={nombre}
                      variant={tabla === nombre ? 'secondary' : 'ghost'}
                      className="w-full justify-start gap-3 text-base transition-all duration-200 hover:scale-[1.03] hover:bg-primary/10"
                      onClick={() => setTabla(nombre)}
                      style={{ marginLeft: 28, maxWidth: '100%' }}
                    >
                      {nombre}
                    </Button>
                  ))}
                </nav>
              </div>
            </div>
              {/* Sección visual extra para Scraping */}
              <div className="relative group mb-2">
                <Button
                  variant={tabla === 'MangaScraping' ? 'secondary' : 'ghost'}
                  className={
                    `w-full justify-start gap-3 text-base transition-all duration-200
                    hover:scale-[1.05] hover:bg-green-900/20 focus:scale-105
                    active:scale-95 shadow-md shadow-green-900/10
                    pr-12 relative overflow-hidden group`
                  }
                  onClick={() => setTabla('MangaScraping')}
                >
                  <Library className="w-5 h-5 animate-pulse text-green-400 group-hover:scale-125 transition-transform duration-200" />
                  Scraping
                  <span className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Badge variant={scrapingStatus === 'activo' ? 'success' : 'destructive'} className="animate-pulse text-xs px-2">
                      {scrapingStatus === 'activo' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </span>
                </Button>
                {/* Panel visual de estado y logs */}
                {tabla === 'MangaScraping' && (
                  <div className="mt-2 bg-[#23232b] border border-green-900/30 rounded-xl p-4 shadow-lg animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-400 font-bold">●</span>
                      <span className="text-sm text-white font-semibold">Estado: {scrapingStatus === 'activo' ? 'Scraping activo' : 'Scraping inactivo'}</span>
                      <Badge variant="secondary" className="ml-2">Último: {scrapingLast}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">Logs recientes:</div>
                    <ul className="text-xs text-white space-y-1 max-h-24 overflow-y-auto pr-2 custom-scrollbar">
                      {scrapingLogs.map((log, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-green-300">{log.time}</span>
                          <span className="truncate">{log.msg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Button variant={tabla === 'Reports' ? 'secondary' : 'ghost'} className="w-full justify-start gap-3 text-base transition-all duration-200 hover:scale-[1.03] hover:bg-primary/10" onClick={() => setTabla('Reports')}><FileText className="w-5 h-5" /> Reports</Button>
              <Button variant={tabla === 'Analytics' ? 'secondary' : 'ghost'} className="w-full justify-start gap-3 text-base transition-all duration-200 hover:scale-[1.03] hover:bg-primary/10" onClick={() => setTabla('Analytics')}><BarChart2 className="w-5 h-5" /> Analytics</Button>
              <Button variant={tabla === 'Team' ? 'secondary' : 'ghost'} className="w-full justify-start gap-3 text-base transition-all duration-200 hover:scale-[1.03] hover:bg-primary/10" onClick={() => setTabla('Team')}><Users className="w-5 h-5" /> Team</Button>
              <Button variant={tabla === 'WordAssistant' ? 'secondary' : 'ghost'} className="w-full justify-start gap-3 text-base transition-all duration-200 hover:scale-[1.03] hover:bg-primary/10" onClick={() => setTabla('WordAssistant')}><MessageCircle className="w-5 h-5" /> Word Assistant</Button>
              <Button variant={tabla === 'DataLibrary' ? 'secondary' : 'ghost'} className="w-full justify-start gap-3 text-base transition-all duration-200 hover:scale-[1.03] hover:bg-primary/10" onClick={() => setTabla('DataLibrary')}><Database className="w-5 h-5" /> Data Library</Button>
              <div className="my-4 border-t border-[#23232b]" />
              <Button variant={tabla === 'Settings' ? 'secondary' : 'ghost'} className="w-full justify-start gap-3 text-base transition-all duration-200 hover:scale-[1.03] hover:bg-primary/10" onClick={() => setTabla('Settings')}><Settings className="w-5 h-5" /> Settings</Button>
              <Button variant={tabla === 'Help' ? 'secondary' : 'ghost'} className="w-full justify-start gap-3 text-base transition-all duration-200 hover:scale-[1.03] hover:bg-primary/10" onClick={() => setTabla('Help')}><LifeBuoy className="w-5 h-5" /> Get Help</Button>
              <Button variant={tabla === 'Search' ? 'secondary' : 'ghost'} className="w-full justify-start gap-3 text-base transition-all duration-200 hover:scale-[1.03] hover:bg-primary/10" onClick={() => setTabla('Search')}><Search className="w-5 h-5" /> Search</Button>
          </div>
          {/* Usuario y versión abajo */}
          <div className="px-6 pb-8 border-t border-[#23232b] mt-6 bg-[#101012]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 rounded-xl px-4 py-3 bg-[#23232b] border border-[#23232b] shadow-none mt-2 transition-colors focus:outline-none">
                  {session?.user?.image ? (
                    <Image src={session.user.image} alt={session.user.name || 'Avatar'} width={40} height={40} className="h-10 w-10 rounded-full object-cover border border-[#39393f]" />
                  ) : (
                    <Avatar className="h-10 w-10 border border-[#39393f]">{session?.user?.name?.[0] || 'U'}</Avatar>
                  )}
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <span className="text-base font-semibold text-white truncate max-w-[120px]">{session?.user?.name || 'Usuario'}</span>
                    <span className="text-xs text-[#a1a1aa] truncate max-w-[120px]">{session?.user?.email || ''}</span>
                  </div>
                  <svg className="w-5 h-5 text-[#a1a1aa]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="6" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="18" r="1.5"/></svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" side="right" className="w-72 p-0 mt-0 bg-[#18181b] border border-[#23232b] rounded-xl shadow-none">
                {/* Bloque usuario compacto */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-[#23232b] bg-[#18181b]">
            {session?.user?.image ? (
                    <Image src={session.user.image} alt={session.user.name || 'Avatar'} width={36} height={36} className="h-9 w-9 rounded-full object-cover border border-[#39393f]" />
                  ) : (
                    <Avatar className="h-9 w-9 border border-[#39393f]">{session?.user?.name?.[0] || 'U'}</Avatar>
                  )}
                  <div className="flex flex-col items-start min-w-0">
                    <div className="font-semibold text-white text-base leading-tight truncate max-w-[150px]">{session?.user?.name || 'Usuario'}</div>
                    <div className="text-xs text-[#a1a1aa] leading-tight truncate max-w-[150px]">{session?.user?.email || ''}</div>
                  </div>
            </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex gap-3 px-6 py-3 text-base text-white hover:bg-[#23232b] focus:bg-[#23232b] transition-colors">
                    <Settings className="w-5 h-5 text-[#a1a1aa]" />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-3 px-6 py-3 text-base text-white hover:bg-[#23232b] focus:bg-[#23232b] transition-colors">
                    <FileText className="w-5 h-5 text-[#a1a1aa]" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-3 px-6 py-3 text-base text-white hover:bg-[#23232b] focus:bg-[#23232b] transition-colors">
                    <MessageCircle className="w-5 h-5 text-[#a1a1aa]" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-3 px-6 py-3 text-base text-red-500 hover:bg-[#23232b] focus:bg-[#23232b] transition-colors" onClick={() => signOut()}>
                  <LogOut className="w-5 h-5" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="mt-2 text-xs text-muted-foreground text-center">v0.0.1</div>
          </div>
        </aside>
        {/* Pantalla derecha con scroll y estilo profesional */}
        <main className="flex-1 flex flex-col items-center bg-[#18181b] min-h-screen overflow-y-auto p-2">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-full mb-6">
            {kpis.map((kpi, i) => (
              <Card key={i} className="rounded-xl bg-[#18181b] border border-[#23232b] p-0">
                <div className="relative p-6 pb-4 h-full flex flex-col justify-between min-h-[170px]">
                  {/* Badge arriba derecha */}
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md border border-[#39393f] bg-[#18181b] text-xs font-semibold text-white">
                      {kpi.trendType === 'up' ? <ArrowUpRight className="w-3 h-3 text-green-400" /> : <ArrowDownRight className="w-3 h-3 text-red-400" />}
                      {kpi.trend}
                    </span>
                  </div>
                  {/* Título */}
                  <div className="text-sm text-[#a1a1aa] font-medium mb-1">{kpi.title}</div>
                  {/* Valor principal */}
                  <div className="text-3xl font-bold text-white mb-2">{kpi.value}</div>
                  {/* Subtítulo en negrita con flecha */}
                  <div className="flex items-center gap-1 font-semibold text-sm mb-0.5 text-white">
                    <span>{kpi.subtitle}</span>
                    <ArrowUpRight className="w-4 h-4 ml-1 text-white" />
                  </div>
                  {/* Texto secundario */}
                  <div className="text-xs text-[#a1a1aa]">{kpi.subdesc}</div>
                </div>
              </Card>
            ))}
          </div>
          <GraficoPanel />
          {/* Tabs para diferentes vistas si quieres */}
          <Tabs defaultValue="tabla" className="w-full max-w-full mb-2">
            <TabsList className="mb-2">
              <TabsTrigger value="tabla">Registros</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="config">Configuración</TabsTrigger>
            </TabsList>
            <TabsContent value="tabla">
              <Card className="w-full rounded-2xl shadow-lg border border-[#282838]">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-primary mb-2">{tabla}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline">Columnas</Button>
                    <Button onClick={() => setModalAgregarAbierto(true)} variant="default">Agregar registro</Button>
                  </div>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  {/* Tabs de categorías sobre la tabla */}
                  <div className="flex items-center gap-2 mb-4 w-full max-w-6xl">
                    {categorias.map(cat => (
                      <Button key={cat.key} variant={categoria === cat.key ? 'secondary' : 'ghost'} onClick={() => setCategoria(cat.key)} className="flex items-center gap-2 text-sm px-4 py-2">
                        {cat.label}
                        <Badge variant="outline" className="ml-1 text-xs px-2 py-0.5">{cat.count}</Badge>
                      </Button>
                    ))}
                  </div>
                  <DataTable
                    data={data}
                    columns={columnsTanstack}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={setRowsPerPage}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics">
              <Card className="w-full rounded-2xl shadow-lg bg-[#23232b] border border-[#282838] p-8 text-white">Analytics de ejemplo aquí...</Card>
            </TabsContent>
            <TabsContent value="config">
              <Card className="w-full rounded-2xl shadow-lg bg-[#23232b] border border-[#282838] p-8 text-white">Configuración de ejemplo aquí...</Card>
            </TabsContent>
          </Tabs>
          <ModalAgregarRegistro
            open={modalAgregarAbierto}
            onClose={() => setModalAgregarAbierto(false)}
            onSave={handleAgregar}
            columns={columns}
          />
          <ModalEdicionRegistro
            open={modalAbierto}
            onClose={() => { setModalAbierto(false); setEditando(null); }}
            onSave={handleSave}
            data={editando}
            columns={columns}
          />
          <AlertDialog open={confirmarEliminar} onOpenChange={setConfirmarEliminar}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar registro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este registro?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="outline" onClick={() => setConfirmarEliminar(false)}>Cancelar</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button variant="destructive" onClick={confirmarBorrado}>Eliminar</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {loading && <div className="text-center mt-4 text-muted-foreground">Cargando...</div>}
        </main>
      </div>
    </TooltipProvider>
  );
}
