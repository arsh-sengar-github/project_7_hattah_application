import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { toastify } from "@/lib/toastify";
import useMutationDelete from "@/hooks/use-mutation-delete";
import {
  useMaterialReactTable,
  MRT_ToggleGlobalFilterButton,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
} from "material-react-table";
import { Tooltip, IconButton } from "@mui/material";
import ButtonLoading from "../buttonLoading";
import DownloadIcon from "@mui/icons-material/Download";
import Link from "next/link";
import RecyclingIcon from "@mui/icons-material/Recycling";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Table = ({
  queryKey,
  fetchURL,
  exportEndpoint,
  deleteType,
  deleteEndpoint,
  trashView,
  columnsConfig,
  actions,
  initialPageSize = 20,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });
  const {
    data: { data = [], meta } = {},
    isError,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey: [queryKey, { globalFilter, columnFilters, sorting, pagination }],
    queryFn: async () => {
      const url = new URL(fetchURL, process.env.NEXT_PUBLIC_BASE_URL);
      url.searchParams.set(
        "start",
        `${pagination.pageIndex * pagination.pageSize}`
      );
      url.searchParams.set("size", `${pagination.pageSize}`);
      url.searchParams.set("globalFilter", globalFilter ?? "");
      url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      url.searchParams.set("sorting", JSON.stringify(sorting ?? []));
      url.searchParams.set("deleteType", deleteType);
      const { data: response } = await axios.get(url.href);
      return response;
    },
    placeholderData: keepPreviousData,
  });
  const [exportLoading, setExportLoading] = useState(false);
  const onExport = async (selectedRows) => {
    setExportLoading(true);
    try {
      const csvConfig = mkConfig({
        useKeysAsHeaders: true,
        filename: "csv-data",
        decimalSeparator: ".",
        fieldSeparator: ",",
      });
      let csv;
      if (Object.keys(rowSelection).lenght > 0) {
        const rowData = selectedRows.map((row) => row.original);
        csv = generateCsv(csvConfig)(rowData);
      } else {
        const { data: response } = await axios.get(exportEndpoint);
        if (!response.success) {
          throw new Error(response.message);
        }
        const rowData = response.data;
        csv = generateCsv(csvConfig)(rowData);
      }
      download(csvConfig)(csv);
    } catch (error) {
      toastify("error", error.message);
    } finally {
      setExportLoading(false);
    }
  };
  const mutationDelete = useMutationDelete(queryKey, deleteEndpoint);
  const onDelete = (ids, deleteType) => {
    let isConfirm;
    if (deleteType === "PD") {
      isConfirm = confirm("Do you want to delete the data, permanently?");
    } else if (deleteType === "SD") {
      isConfirm = confirm("Do you want to move the data, into trash?");
    } else {
      isConfirm = confirm("Do you want to move the data, out of trash?");
    }
    if (isConfirm) {
      mutationDelete.mutate({ ids, deleteType });
      setRowSelection({});
    }
  };
  const table = useMaterialReactTable({
    columns: columnsConfig,
    data,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    renderTopToolbarCustomActions: ({ table }) => (
      <Tooltip>
        <ButtonLoading
          className="cursor-pointer"
          text={
            <div>
              <DownloadIcon fontSize="32" /> Export
            </div>
          }
          loading={exportLoading}
          type="button"
          onClick={() => onExport(table.getSelectedRowModel().rows)}
        />
      </Tooltip>
    ),
    enableStickyHeader: true,
    onGlobalFilterChange: setGlobalFilter,
    columnFilterDisplayMode: "popover",
    onColumnFiltersChange: setColumnFilters,
    manualFiltering: true,
    enableColumnOrdering: true,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ row }) => actions(row, deleteType, onDelete),
    renderToolbarInternalActions: ({ table }) => (
      <div>
        <MRT_ToggleGlobalFilterButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
        {deleteType !== "PD" && (
          <Tooltip title="Recycle">
            <Link href={trashView}>
              <IconButton>
                <RecyclingIcon />
              </IconButton>
            </Link>
          </Tooltip>
        )}
        {deleteType === "SD" && (
          <Tooltip title="Trash">
            <IconButton
              disabled={
                !(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected)
              }
              onClick={() => onDelete(Object.keys(rowSelection), deleteType)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {deleteType === "PD" && (
          <div>
            <Tooltip title="Restore">
              <IconButton
                disabled={
                  !(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected)
                }
                onClick={() => onDelete(Object.keys(rowSelection), "RSD")}
              >
                <RestoreFromTrashIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                disabled={
                  !(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected)
                }
                onClick={() => onDelete(Object.keys(rowSelection), deleteType)}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    ),
    enableRowActions: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getRowId: (originalRow) => originalRow._id,
    rowCount: meta?.currRowCount ?? 0,
    onSortingChange: setSorting,
    manualSorting: true,
    enableStickyFooter: true,
    paginationDisplayMode: "pages",
    onPaginationChange: setPagination,
    manualPagination: true,
    initialState: { showColumnFilters: true },
    state: {
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      globalFilter,
      columnFilters,
      rowSelection,
      sorting,
      pagination,
    },
  });
  return <MaterialReactTable table={table} />;
};

export default Table;
