import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const tiposCampo: Record<string, string> = {
  id: 'number',
  cap: 'number',
  statusId: 'relation',
  typeId: 'relation',
  authorId: 'relation',
  scan: 'relation',
  views: 'number',
  dayViews: 'number',
  weekViews: 'number',
  monthViews: 'number',
  likesCount: 'number',
  favoritesCount: 'number',
  seeLaterCount: 'number',
  releaseDate: 'date',
  updateLast: 'date',
  updateNext: 'date',
  emailVerified: 'date',
  createdAt: 'date',
  updatedAt: 'date',
  score: 'number',
  credentialBackedUp: 'boolean',
};

const relaciones: Record<string, string> = {
  statusId: 'StatusManga',
  typeId: 'TypeManga',
  authorId: 'AuthorManga',
  scan: 'ScanManga',
};

const relacionesMuchos: Record<string, string> = {
  genres: 'Genre',
  likesManga: 'MangaLike',
  favoritesManga: 'MangaFavorite',
  seeLaterManga: 'MangaSeeLater',
};

async function fetchRelaciones(tabla: string) {
  const res = await fetch(`/api/db?table=${tabla}&limit=100`);
  const result = await res.json();
  return Array.isArray(result.data) ? result.data : [];
}

const ModalAgregarRegistro = ({ open, onClose, onSave, columns }: any) => {
  const [form, setForm] = useState<any>({});
  const [opciones, setOpciones] = useState<Record<string, any[]>>({});
  const [opcionesMuchos, setOpcionesMuchos] = useState<Record<string, any[]>>({});

  useEffect(() => {
    setForm({});
  }, [open]);

  useEffect(() => {
    (async () => {
      const rels: Record<string, any[]> = {};
      const relsMuchos: Record<string, any[]> = {};
      for (const col of columns) {
        if (relaciones[col.key]) {
          rels[col.key] = await fetchRelaciones(relaciones[col.key]);
        }
        if (relacionesMuchos[col.key]) {
          relsMuchos[col.key] = await fetchRelaciones(relacionesMuchos[col.key]);
        }
      }
      setOpciones(rels);
      setOpcionesMuchos(relsMuchos);
    })();
  }, [columns]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.multiple) {
      // Muchos a muchos: array de valores
      const selected = Array.from((e.target as HTMLSelectElement).selectedOptions).map(opt => opt.value);
      setForm({ ...form, [e.target.name]: selected });
    } else if (e.target.type === 'checkbox') {
      setForm({ ...form, [e.target.name]: (e.target as HTMLInputElement).checked });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Registro</DialogTitle>
          <DialogDescription>Completa los campos para crear un nuevo registro.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave(form);
          }}
          className="space-y-4"
        >
          {columns.filter(col => col.key !== 'id').map(col => {
            const tipo = tiposCampo[col.key] || 'text';
            if (tipo === 'relation' && opciones[col.key]) {
              return (
                <div key={col.key}>
                  <label className="block text-sm font-medium mb-1">{col.label}</label>
                  <select
                    name={col.key}
                    value={form[col.key] ?? ''}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1 bg-background text-foreground"
                    required
                  >
                    <option value="">Seleccione...</option>
                    {opciones[col.key].map((opt: any) => (
                      <option key={opt.id} value={opt.id}>{opt.name || opt.title || opt.id}</option>
                    ))}
                  </select>
                </div>
              );
            }
            if (relacionesMuchos[col.key] && opcionesMuchos[col.key]) {
              return (
                <div key={col.key}>
                  <label className="block text-sm font-medium mb-1">{col.label} (puede seleccionar varios)</label>
                  <select
                    name={col.key}
                    multiple
                    value={form[col.key] ?? []}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1 bg-background text-foreground"
                    required
                  >
                    {opcionesMuchos[col.key].map((opt: any) => (
                      <option key={opt.id} value={opt.id}>{opt.name || opt.title || opt.id}</option>
                    ))}
                  </select>
                </div>
              );
            }
            if (tipo === 'boolean') {
              return (
                <div key={col.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={col.key}
                    checked={!!form[col.key]}
                    onChange={handleChange}
                  />
                  <label className="text-sm font-medium">{col.label}</label>
                </div>
              );
            }
            return (
              <div key={col.key}>
                <label className="block text-sm font-medium mb-1">{col.label}</label>
                <Input
                  type={tipo}
                  name={col.key}
                  value={form[col.key] ?? ''}
                  onChange={handleChange}
                  placeholder={col.label}
                  required
                />
              </div>
            );
          })}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Agregar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAgregarRegistro; 