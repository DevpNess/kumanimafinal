import React, { useEffect, useState, useMemo } from "react";
import { DataTable } from "../DataTable";
import { ColumnDef } from "@tanstack/react-table";

const TABLE_NAME = "MangaCompartido";

const fetchData = async (page = 1, limit = 20, search = "") => {
  const params = new URLSearchParams({ table: TABLE_NAME, page: String(page), limit: String(limit), search });
  const res = await fetch(`/api/db?${params.toString()}`);
  if (!res.ok) throw new Error("Error al obtener datos");
  return res.json();
};

const MangaCompartidoRegistros = () => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData(page + 1, rowsPerPage, search)
      .then(({ data, total }) => {
        setData(data);
        setTotal(total);
      })
      .finally(() => setLoading(false));
  }, [page, rowsPerPage, search]);

  const columns = useMemo<ColumnDef<any>[]>(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
      accessorKey: key,
      header: key,
    }));
  }, [data]);

  const handleEdit = async (row: any) => {
    alert(`Editar registro: ${JSON.stringify(row, null, 2)}`);
  };
  const handleDelete = async (row: any) => {
    if (window.confirm(`¿Eliminar registro con id ${row.id}?`)) {
      await fetch(`/api/db?table=${TABLE_NAME}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: row.id }),
      });
      setData((prev) => prev.filter((r) => r.id !== row.id));
      setTotal((prev) => prev - 1);
    }
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={loading}
      page={page}
      totalPages={Math.ceil(total / rowsPerPage)}
      onPageChange={setPage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={setRowsPerPage}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default MangaCompartidoRegistros;
