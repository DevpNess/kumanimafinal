import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export default function SelectorSitio({ sitios = [], value, setValue }: {
  sitios: MangaSite[];
  value: string;
  setValue: (v: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const sitiosArray = Array.isArray(sitios) ? sitios : [];
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? sitiosArray.find((site) => site.name === value)?.name
            : "Seleccionar sitio..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar sitio..." />
          <CommandList>
            <CommandEmpty>No se encontró ningún sitio.</CommandEmpty>
            <CommandGroup>
              {sitiosArray.length === 0 ? (
                <div className="p-2 text-sm text-muted-foreground">No hay sitios disponibles.</div>
              ) : (
                sitiosArray.map((site) => (
                  <CommandItem
                    key={site.id}
                    value={site.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === site.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {site.name}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
} 