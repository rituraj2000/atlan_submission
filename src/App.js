import React, { useState, useEffect, useMemo } from "react";
import { Pagination, SearchBar } from "./Pages/Home/homepage";
import { Table } from "./Pages/Home/components/table";
import { FilterBar } from "./Pages/Home/components/filterBar";
import Papa from "papaparse";
import productData from "./utils/datasets/products.csv";
import alasql from "alasql";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [sqlQuery, setSQLQuery] = useState("");
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [table, setTable] = useState(productData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const handleQuery = () => {
    try {
      const newFilteredData = alasql(sqlQuery, [tableData]);
      setFilteredData(newFilteredData);
    } catch (error) {
      console.error("Error in SQL Query:", error);
      toast.error(`Error in SQL Query : ${error}`);
    }
  };

  //Paginate data
  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;

  const currentTableData = useMemo(() => {
    return (filteredData.length > 0 ? filteredData : tableData).slice(
      firstRowIndex,
      lastRowIndex
    );
  }, [filteredData, tableData, firstRowIndex, lastRowIndex]);

  useEffect(() => {
    Papa.parse(table, {
      download: true,
      header: true,
      complete: (result) => {
        setTableData(result.data);
        setColumns(result.meta.fields);
      },
    });

    //setCurrentPage(1);
  }, [table]);

  return (
    <div className="container mx-auto flex flex-col items-center px-16 py-12">
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar
        searchTerm={sqlQuery}
        setSearchTerm={setSQLQuery}
        handleQuery={handleQuery}
      />
      <FilterBar
        setTable={setTable}
        setSearchTerm={setSQLQuery}
        columns={columns}
      />

      <Pagination
        totalRows={(filteredData.length > 0 ? filteredData : tableData).length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Table
        columns={columns}
        // data={filteredData.length > 0 ? filteredData : tableData}
        data={currentTableData}
      />
    </div>
  );
}

export default App;
