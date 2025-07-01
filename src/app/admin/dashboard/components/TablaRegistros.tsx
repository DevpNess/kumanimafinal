import React, { useState, useMemo } from 'react';

interface TablaRegistrosProps {
  data: any[];
  columns: { key: string; label: string }[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

const PAGE_SIZE = 10;

const TablaRegistros: React.FC<TablaRegistrosProps> = ({ data, columns, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    const arr = Array.isArray(data) ? data : [];
    if (!search) return arr;
    return arr.filter(row =>
      columns.some(col =>
        String(row[col.key] || '').toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data, columns]);

  const paginatedData = useMemo(() => {
    const arr = Array.isArray(filteredData) ? filteredData : [];
    const start = (page - 1) * PAGE_SIZE;
    return arr.slice(start, start + PAGE_SIZE);
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE) || 1;

  return (
    <div className="w-full">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border rounded px-2 py-1 mr-4 w-64"
        />
        <span className="text-sm text-gray-400">{filteredData.length} registros</span>
      </div>
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-background border">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className="px-3 py-2 border-b text-left bg-muted font-semibold">{col.label}</th>
              ))}
              {(onEdit || onDelete) && <th className="px-3 py-2 border-b bg-muted">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4 text-gray-400">No hay registros</td>
              </tr>
            )}
            {paginatedData.map((row, idx) => (
              <tr key={row.id || idx} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                {columns.map(col => (
                  <td key={col.key} className="px-3 py-2 border-b">{String(row[col.key] ?? '')}</td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-3 py-2 border-b flex gap-2">
                    {onEdit && <button className="text-blue-600 hover:underline" onClick={() => onEdit(row)}>Editar</button>}
                    {onDelete && <button className="text-red-600 hover:underline" onClick={() => onDelete(row)}>Eliminar</button>}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-1 rounded bg-muted text-sm"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >Anterior</button>
        <span className="text-sm">Página {page} de {totalPages}</span>
        <button
          className="px-3 py-1 rounded bg-muted text-sm"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >Siguiente</button>
      </div>
    </div>
  );
};

export default TablaRegistros; 