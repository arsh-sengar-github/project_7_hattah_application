"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { darkMode, lightMode } from "@/lib/materialMode";
import Table from "./table";

const TableWrapper = ({
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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <ThemeProvider theme={resolvedTheme === "dark" ? darkMode : lightMode}>
      <Table
        queryKey={queryKey}
        fetchURL={fetchURL}
        exportEndpoint={exportEndpoint}
        deleteType={deleteType}
        deleteEndpoint={deleteEndpoint}
        trashView={trashView}
        columnsConfig={columnsConfig}
        actions={actions}
        initialPageSize={initialPageSize}
      />
    </ThemeProvider>
  );
};

export default TableWrapper;
