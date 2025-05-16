import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AnimeActualizar({ sitios }: { sitios: any[] }) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string>('');
  const [form, setForm] = React.useState<any>({});

  React.useEffect(() => {
    if (selected) {
      const sitio = sitios.find((s) => s.name === selected);
      if (sitio) setForm(sitio);
    } else {
      setForm({});
    }
  }, [selected, sitios]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto bg-background rounded-lg border p-8 mt-8 shadow">
      <h2 className="text-2xl font-bold mb-6">Actualizar Anime</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Seleccionar sitio</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
              {selected ? sitios.find((s) => s.name === selected)?.name : 'Seleccionar sitio...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Buscar sitio..." />
              <CommandList>
                <CommandEmpty>No se encontró ningún sitio.</CommandEmpty>
                <CommandGroup>
                  {sitios.map((site) => (
                    <CommandItem
                      key={site.id}
                      value={site.name}
                      onSelect={() => {
                        setSelected(site.name);
                        setOpen(false);
                      }}
                    >
                      <Check className={cn('mr-2 h-4 w-4', selected === site.name ? 'opacity-100' : 'opacity-0')} />
                      {site.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-4">
        <Input label="Nombre" name="name" value={form.name || ''} onChange={handleChange} placeholder="Nombre" />
        <Input label="Dominio" name="domain" value={form.domain || ''} onChange={handleChange} placeholder="Dominio" />
        <Input label="Selector de Nombre" name="SelectorName" value={form.SelectorName || ''} onChange={handleChange} placeholder="Selector de Nombre" />
        <Input label="Selector de Descripción" name="SelectorDescription" value={form.SelectorDescription || ''} onChange={handleChange} placeholder="Selector de Descripción" />
        <Input label="Selector de Estado" name="SelectorStatus" value={form.SelectorStatus || ''} onChange={handleChange} placeholder="Selector de Estado" />
        <Input label="Selector de Tipo" name="SelectorType" value={form.SelectorType || ''} onChange={handleChange} placeholder="Selector de Tipo" />
        <Input label="Selector de Autor" name="SelectorAuthor" value={form.SelectorAuthor || ''} onChange={handleChange} placeholder="Selector de Autor" />
        <Input label="Selector de Scan" name="SelectorScan" value={form.SelectorScan || ''} onChange={handleChange} placeholder="Selector de Scan" />
        <Input label="Selector de Géneros" name="SelectorGenres" value={form.SelectorGenres || ''} onChange={handleChange} placeholder="Selector de Géneros" />
        <Input label="Selector de Banner" name="SelectorBanner" value={form.SelectorBanner || ''} onChange={handleChange} placeholder="Selector de Banner" />
        <Input label="Selector de Número de Capítulos" name="SelectorNumberChapters" value={form.SelectorNumberChapters || ''} onChange={handleChange} placeholder="Selector de Número de Capítulos" />
        <Input label="Selector de Imagen de Capítulo" name="SelectorImageChapter" value={form.SelectorImageChapter || ''} onChange={handleChange} placeholder="Selector de Imagen de Capítulo" />
      </div>
    </div>
  );
} 