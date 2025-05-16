import React from 'react';

const menuOptions = [
  {
    label: 'Mangas',
    options: [
      { key: 'manga-busqueda', label: 'Búsqueda' },
      { key: 'manga-edicion', label: 'Edición' },
      { key: 'manga-agregar', label: 'Agregar Nuevo Manga' },
      { key: 'manga-agregar-capitulo', label: 'Agregar nuevo capítulo de Manga' },
      { key: 'manga-actualizar', label: 'Actualizar' },
      { key: 'manga-validar', label: 'Validar Series Nuevas' },
    ],
  },
  {
    label: 'Anime',
    options: [
      { key: 'anime-busqueda', label: 'Búsqueda' },
      { key: 'anime-edicion', label: 'Edición' },
      { key: 'anime-agregar', label: 'Agregar Nuevo Anime' },
      { key: 'anime-agregar-capitulo', label: 'Agregar nuevo capítulo de Anime' },
      { key: 'anime-actualizar', label: 'Actualizar' },
      { key: 'anime-validar', label: 'Validar Series Nuevas' },
    ],
  },
];

export default function Menu({ selected, onSelect }: { selected: string, onSelect: (key: string) => void }) {
  return (
    <nav className="w-64 h-full flex flex-col p-4 group peer hidden text-sidebar-foreground md:block">
      {menuOptions.map((section) => (
        <div key={section.label} className="mb-6">
          <div className="font-bold mb-2">{section.label}</div>
          <ul>
            {section.options.map((opt) => (
              <li key={opt.key}>
                <button
                  className={`w-full text-left px-2 py-1 rounded hover:bg-muted ${selected === opt.key ? 'bg-muted font-semibold' : ''}`}
                  onClick={() => onSelect(opt.key)}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
} 