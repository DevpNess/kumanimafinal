import React from 'react';
import { Input } from '@/components/ui/input';
import SelectorSitio from './SelectorSitio';

export default function MangaBusqueda({ sitios }: { sitios: any[] }) {
  const [sitioSeleccionado, setSitioSeleccionado] = React.useState('');
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Búsqueda de Mangas</h2>
      <div className="mb-4">
        <SelectorSitio sitios={sitios} value={sitioSeleccionado} setValue={setSitioSeleccionado} />
      </div>
      <Input placeholder="Buscar manga..." className="mb-4" />
      {/* Resultados de búsqueda aquí */}
      <div>[Resultados de búsqueda]</div>
    </div>
  );
} 