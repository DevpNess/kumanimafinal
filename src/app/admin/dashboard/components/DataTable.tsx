import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip } from "@/components/ui/tooltip";
import { Pencil, Trash2 } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  onEdit,
  onDelete,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: !!pageCount,
    pageCount,
  });

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Buscar..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <ScrollArea className="w-full overflow-x-auto rounded-xl border border-[#23232b] bg-[#18181b]">
          <table className="min-w-full divide-y divide-[#23232b]">
            <thead className="bg-[#23232b]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider select-none cursor-pointer bg-[#23232b] border-b border-[#23232b]"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() ? (
                        <span className="ml-1 text-white/60">
                          {header.column.getIsSorted() === "asc" ? "▲" : "▼"}
                        </span>
                      ) : null}
                    </th>
                  ))}
                  {(onEdit || onDelete) && <th className="px-4 py-3 bg-[#23232b] border-b border-[#23232b] text-white">Acciones</th>}
                </tr>
              ))}
            </thead>
            <tbody className="bg-[#18181b] divide-y divide-[#23232b]">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-8 text-white/70">
                    Cargando...
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-8 text-white/70">
                    Sin resultados
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-[#23232b]/80 transition-colors">
                    {row.getVisibleCells().map((cell) => {
                      const value = cell.getValue();
                      // Booleanos y arrays en texto plano
                      if (typeof value === 'boolean') {
                        return (
                          <td key={cell.id} className="px-4 py-2 whitespace-nowrap text-white/90">
                            {value ? 'Sí' : 'No'}
                          </td>
                        );
                      }
                      if (Array.isArray(value)) {
                        return (
                          <td key={cell.id} className="px-4 py-2 whitespace-nowrap text-white/90">
                            {value.length === 0 ? 'Vacío' : value.join(', ')}
                          </td>
                        );
                      }
                      const strValue = value !== null && value !== undefined ? String(value) : '';
                      const isLong = strValue.length > 30;
                      return (
                        <td key={cell.id} className="px-4 py-2 whitespace-nowrap max-w-xs text-white/90">
                          {isLong ? (
                            <Tooltip content={strValue}>
                              <span className="truncate block max-w-[180px] cursor-help">{strValue.slice(0, 30)}...</span>
                            </Tooltip>
                          ) : (
                            <span className="truncate block max-w-[180px]">{strValue}</span>
                          )}
                        </td>
                      );
                    })}
                    {(onEdit || onDelete) && (
                      <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                        {onEdit && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full border border-[#23232b] hover:bg-[#23232b]/60 text-white/80"
                            onClick={() => onEdit(row.original)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full border border-[#23232b] hover:bg-[#23232b]/60 text-white/80"
                            onClick={() => onDelete(row.original)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </ScrollArea>
        <div className="flex items-center justify-between mt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 