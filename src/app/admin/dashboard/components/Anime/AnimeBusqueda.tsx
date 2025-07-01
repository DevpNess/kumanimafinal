import React, { useState } from 'react';
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

const columnasAnime = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'domain', label: 'Dominio' },
  // Agrega más columnas según tu modelo de anime
];

export default function AnimeBusqueda({ sitios }: { sitios: any[] }) {
  const [sitioSeleccionado, setSitioSeleccionado] = useState('');
  const [editando, setEditando] = useState<any>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [data, setData] = useState<any[]>(sitios || []);
  const [eliminarId, setEliminarId] = useState<string | number | null>(null);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);

  React.useEffect(() => {
    setData(sitios || []);
  }, [sitios]);

  const dataFiltrada = sitioSeleccionado
    ? data.filter(s => s.name === sitioSeleccionado)
    : data;

  const handleEdit = (row: any) => {
    setEditando(row);
    setModalAbierto(true);
  };

  const handleSave = async (nuevo: any) => {
    await fetch(`/api/series/anime`, {
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
    await fetch(`/api/series/anime`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: eliminarId }),
    });
    fetchData();
    setEliminarId(null);
    setConfirmarEliminar(false);
  };

  const fetchData = () => {
    // Implementa la lógica para actualizar la lista de datos
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Búsqueda de Animes</h2>
      <div className="mb-4">
        <SelectorSitio sitios={sitios} value={sitioSeleccionado} setValue={setSitioSeleccionado} />
      </div>
      <TablaRegistros
        data={dataFiltrada}
        columns={columnasAnime}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ModalEdicionRegistro
        open={modalAbierto}
        onClose={() => { setModalAbierto(false); setEditando(null); }}
        onSave={handleSave}
        data={editando}
        columns={columnasAnime}
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
    </div>
  );
} 