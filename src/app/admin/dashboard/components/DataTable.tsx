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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  isLoading?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: (rows: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  onEdit,
  onDelete,
  isLoading,
  page,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [internalRowsPerPage, setInternalRowsPerPage] = React.useState(10);
  const effectiveRowsPerPage = rowsPerPage ?? internalRowsPerPage;
  const setRowsPerPage = onRowsPerPageChange ?? setInternalRowsPerPage;

  const [internalPage, setInternalPage] = React.useState(0);
  const effectivePage = page ?? internalPage;
  const setPage = onPageChange ?? setInternalPage;

  const isManualPagination = page !== undefined && totalPages !== undefined && onPageChange && rowsPerPage !== undefined && onRowsPerPageChange;
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination: { pageIndex: effectivePage, pageSize: effectiveRowsPerPage },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: isManualPagination,
    pageCount: isManualPagination ? totalPages : pageCount,
  });

  React.useEffect(() => {
    table.setPageSize(effectiveRowsPerPage);
  }, [effectiveRowsPerPage]);
  React.useEffect(() => {
    table.setPageIndex(effectivePage);
  }, [effectivePage]);

  const handleRowsPerPageChange = (size: number) => {
    setRowsPerPage(size);
    setPage(0);
  };
  const handlePageChange = (pageIndex: number) => {
    setPage(pageIndex);
  };

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2 flex gap-2 items-center">
                <SlidersHorizontal className="w-4 h-4" /> Columnas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
              {table.getAllLeafColumns().map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={() => column.toggleVisibility()}
                  className="capitalize"
                >
                  {column.columnDef.header as string}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ScrollArea className="w-full overflow-x-auto rounded-xl border border-[#23232b] bg-[#18181b]">
          <table className="min-w-max divide-y divide-[#23232b]">
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
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Rows per page</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="px-2 py-1 text-sm min-w-[48px] justify-between">
                    {effectiveRowsPerPage}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {[10, 20, 30, 40, 50].map((size) => (
                    <DropdownMenuCheckboxItem
                      key={size}
                      checked={effectiveRowsPerPage === size}
                      onCheckedChange={() => handleRowsPerPageChange(size)}
                    >
                      {size}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <span className="text-sm">
              Page {effectivePage + 1} of {totalPages ?? table.getPageCount()}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(0)}
                disabled={effectivePage === 0}
                className="px-2"
              >
                {'<<'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(effectivePage - 1)}
                disabled={effectivePage === 0}
                className="px-2"
              >
                {'<'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(effectivePage + 1)}
                disabled={totalPages ? effectivePage + 1 >= totalPages : !table.getCanNextPage()}
                className="px-2"
              >
                {'>'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange((totalPages ?? table.getPageCount()) - 1)}
                disabled={totalPages ? effectivePage + 1 >= totalPages : !table.getCanNextPage()}
                className="px-2"
              >
                {'>>'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 