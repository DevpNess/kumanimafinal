import React, { useState } from 'react';
import ModalAgregarRegistro from './ModalAgregarRegistro';
import { Button } from '@/components/ui/button';

const columnasAnime = [
  { key: 'name', label: 'Nombre' },
  { key: 'domain', label: 'Dominio' },
  // Agrega más columnas según tu modelo de anime
];

export default function AnimeAgregar({ onAgregado }: { onAgregado?: () => void }) {
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleAgregar = async (nuevo: any) => {
    await fetch(`/api/series/anime`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    });
    setModalAbierto(false);
    if (onAgregado) onAgregado();
  };

  return (
    <>
      <Button onClick={() => setModalAbierto(true)} variant="default">Agregar nuevo anime</Button>
      <ModalAgregarRegistro
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSave={handleAgregar}
        columns={columnasAnime}
      />
    </>
  );
} 