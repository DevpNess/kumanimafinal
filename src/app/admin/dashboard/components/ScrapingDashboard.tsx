import React, { useState, useEffect } from 'react';
import TablaRegistros from './TablaRegistros';
import ModalEdicionRegistro from './ModalEdicionRegistro';
import ModalAgregarRegistro from './ModalAgregarRegistro';
import { Button } from '@/components/ui/button';
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
import { toast } from '@/components/ui/use-toast';

const columnasScraping = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'domain', label: 'Dominio' },
  { key: 'SelectorName', label: 'Selector Nombre' },
  // ...otros campos relevantes
];

const PAGE_SIZE = 10;

export default function ScrapingDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState<any>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false);
  const [eliminarId, setEliminarId] = useState<string | number | null>(null);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [scrapingStatus, setScrapingStatus] = useState<string>('');
  const [scrapingLogs, setScrapingLogs] = useState<string>('');

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
      search: search,
    });
    const res = await fetch(`/api/scraping/mangascraping?${params.toString()}`);
    const result = await res.json();
    setData(result.data);
    setTotal(result.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleEdit = (row: any) => {
    setEditando(row);
    setModalAbierto(true);
  };

  const handleSave = async (nuevo: any) => {
    await fetch(`/api/scraping/mangascraping`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    });
    fetchData();
    setModalAbierto(false);
    setEditando(null);
  };

  const handleAgregar = async (nuevo: any) => {
    await fetch(`/api/scraping/mangascraping`, {
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
    await fetch(`/api/scraping/mangascraping`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: eliminarId }),
    });
    fetchData();
    setEliminarId(null);
    setConfirmarEliminar(false);
  };

  // Lanzar scraping manualmente
  const lanzarScraping = async (id?: number) => {
    setScrapingStatus('Ejecutando...');
    setScrapingLogs('');
    try {
      // Aquí deberías tener un endpoint que lance el scraping y devuelva logs/estado
      const res = await fetch(`/api/scraping/mangascraping${id ? '?id=' + id : ''}`, {
        method: 'PUT', // o el método que definas para lanzar scraping
      });
      const result = await res.json();
      setScrapingStatus('Completado');
      setScrapingLogs(result.logs || 'Scraping finalizado.');
      toast({ title: 'Scraping completado', description: 'El scraping se ejecutó correctamente.' });
    } catch (e) {
      setScrapingStatus('Error');
      setScrapingLogs('Ocurrió un error al ejecutar el scraping.');
      toast({ title: 'Error en scraping', description: 'Ocurrió un error al ejecutar el scraping.', variant: 'destructive' });
    }
  };

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestión de Scraping</h2>
      <div className="flex gap-4 mb-4 items-center">
        <Button onClick={() => setModalAgregarAbierto(true)} variant="default">Agregar sitio de scraping</Button>
        <Input
          placeholder="Buscar..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="w-64"
        />
        <Button onClick={() => lanzarScraping()} variant="secondary">Lanzar scraping de todos</Button>
      </div>
      <TablaRegistros
        data={data}
        columns={columnasScraping}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
        >Anterior</Button>
        <span className="text-sm">Página {page} de {totalPages}</span>
        <Button
          variant="outline"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || loading}
        >Siguiente</Button>
      </div>
      <ModalAgregarRegistro
        open={modalAgregarAbierto}
        onClose={() => setModalAgregarAbierto(false)}
        onSave={handleAgregar}
        columns={columnasScraping}
      />
      <ModalEdicionRegistro
        open={modalAbierto}
        onClose={() => { setModalAbierto(false); setEditando(null); }}
        onSave={handleSave}
        data={editando}
        columns={columnasScraping}
      />
      <AlertDialog open={confirmarEliminar} onOpenChange={setConfirmarEliminar}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar sitio de scraping?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este sitio?
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
      {scrapingStatus && (
        <div className="mt-6 p-4 rounded bg-muted text-muted-foreground">
          <div className="font-semibold">Estado scraping: {scrapingStatus}</div>
          <pre className="mt-2 whitespace-pre-wrap text-xs max-h-60 overflow-auto">{scrapingLogs}</pre>
        </div>
      )}
      {loading && <div className="text-center mt-4 text-muted-foreground">Cargando...</div>}
    </div>
  );
} 