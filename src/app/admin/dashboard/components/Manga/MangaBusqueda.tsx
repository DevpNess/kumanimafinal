import React, { useState, useEffect } from 'react';
import TablaRegistros from '../TablaRegistros';
import ModalEdicionRegistro from '../ModalEdicionRegistro';
import { Input } from '@/components/ui/input';
import SelectorSitio from '../SelectorSitio';
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
import { Button } from '@/components/ui/button';
import ModalAgregarRegistro from '../ModalAgregarRegistro';

const columnasManga = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'domain', label: 'Dominio' },
  { key: 'SelectorName', label: 'Selector Nombre' },
  { key: 'SelectorDescription', label: 'Selector Descripción' },
  // Puedes agregar más columnas según tu modelo
];

const PAGE_SIZE = 10;

export default function MangaBusqueda() {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState<any>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [eliminarId, setEliminarId] = useState<string | number | null>(null);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [sitios, setSitios] = useState<any[]>([]);
  const [sitioSeleccionado, setSitioSeleccionado] = useState('');
  const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false);

  // Cargar datos paginados
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
    // Para el filtro de sitios
    setSitios(result.data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page, search]);

  // Filtrar por sitio si se selecciona uno
  const dataFiltrada = sitioSeleccionado
    ? data.filter(s => s.name === sitioSeleccionado)
    : data;

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

  const handleAgregar = async (nuevo: any) => {
    await fetch(`/api/scraping/mangascraping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    });
    fetchData();
    setModalAgregarAbierto(false);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Búsqueda de Mangas</h2>
      <div className="flex gap-4 mb-4 items-center">
        <Button onClick={() => setModalAgregarAbierto(true)} variant="default">Agregar nuevo manga</Button>
        <Input
          placeholder="Buscar..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="w-64"
        />
        <SelectorSitio sitios={sitios} value={sitioSeleccionado} setValue={setSitioSeleccionado} />
      </div>
      <TablaRegistros
        data={dataFiltrada}
        columns={columnasManga}
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
      <ModalEdicionRegistro
        open={modalAbierto}
        onClose={() => { setModalAbierto(false); setEditando(null); }}
        onSave={handleSave}
        data={editando}
        columns={columnasManga}
      />
      <ModalAgregarRegistro
        open={modalAgregarAbierto}
        onClose={() => setModalAgregarAbierto(false)}
        onSave={handleAgregar}
        columns={columnasManga}
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
    </div>
  );
} 