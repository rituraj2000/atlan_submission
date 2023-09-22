import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import productData from "../../../utils/datasets/products.csv";
import employeeData from "../../../utils/datasets/employees.csv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export const FilterBar = ({ setSearchTerm, setTable, columns }) => {
  const [selectBlobs, setSelectBlobs] = useState([0]);
  const [whereBlobs, setWhereBlobs] = useState([0]);

  const [selectTerms, setSelectTerm] = useState([]);
  const [fromTerm, setFromTerm] = useState("productData");
  const [wherTerms, setWhereTerm] = useState([]);

  const generateSQL = () => {
    // If no select terms are present, use '*' by default
    const selectString = selectTerms.length > 0 ? selectTerms.join(", ") : "*";

    // If where terms are present, join them with 'AND'
    const whereString =
      wherTerms.length > 0 ? `WHERE ${wherTerms.join(" AND ")}` : "";

    // Add a space before WHERE clause if it exists, otherwise add an empty string
    const whereWithSpace = whereString ? ` ${whereString}` : "";

    //1.
    // Generating SQL string
    // const SQL = fromTerm
    //   ? `SELECT ${selectString} FROM ?${whereWithSpace}`
    //   : "";

    const SQL = fromTerm
      ? `SELECT ${selectString} FROM ${fromTerm}${whereWithSpace}`
      : "";

    setSearchTerm(SQL.trim());

    // Debugging - to check if the SQL string is formed correctly
    console.log(fromTerm);
    console.log("Generated SQL:", SQL.trim());
  };

  const handleSELECTChange = (idx, e) => {
    if (fromTerm === "?") {
      toast.error("Select a Table First");
      return;
    }

    // Copying the current selectTerms array
    const newSelectTerms = [...selectTerms];

    // Updating the i-th element with the new value
    newSelectTerms[idx] = e.target.value;

    // Updating the selectTerms state
    setSelectTerm(newSelectTerms);

    generateSQL();
  };

  const handleSELECTDelete = (idx) => {
    // Remove the blob based on the index
    const newSelectBlobs = selectBlobs.filter((_, index) => index !== idx);
    setSelectBlobs(newSelectBlobs);

    // Remove the term based on the index
    const newSelectTerms = selectTerms.filter((_, index) => index !== idx);
    setSelectTerm(newSelectTerms);

    generateSQL();
  };

  const handleFROMChange = (e) => {
    if (e.target.value === "productData") {
      setTable(productData);
    } else {
      setTable(employeeData);
    }

    setFromTerm(e.target.value);
    generateSQL();
  };

  useEffect(() => {
    generateSQL();
  }, [selectTerms, fromTerm, wherTerms]);

  return (
    <div className="w-full p-6 mb-5 mt-5 flex items-center overflow-x-auto scrollbar-thin bg-blue-100">
      {/* Container div */}
      <div className="flex flex-nowrap items-center min-w-full">
        {/* SELECT section */}
        <div className="font-sans font-medium italic flex-shrink-0">SELECT</div>
        {selectBlobs.map((_, index) => (
          <SELECTColumnBlob
            columns={columns}
            key={index}
            onChangeHandler={(e) => {
              handleSELECTChange(index, e);
            }}
            onDeleteHandler={() => handleSELECTDelete(index)}
          />
        ))}
        <AddColumnButton
          onClick={() => setSelectBlobs([...selectBlobs, selectBlobs.length])}
        />

        {/* FROM section */}
        <div className="font-sans italic ml-2 flex-shrink-0 font-medium">
          FROM
        </div>
        <FROMColumnBlob onChangeHandler={handleFROMChange} />

        {/* WHERE section */}
        <div className="font-sans italic ml-2 flex-shrink-0 font-medium">
          WHERE
        </div>
        {whereBlobs.map((_, index) => (
          <WHEREColumnBlob key={index} />
        ))}
        <AddColumnButton
          onClick={() => setWhereBlobs([...whereBlobs, whereBlobs.length])}
        />
      </div>
    </div>
  );
};

// Components -->

const AddColumnButton = ({ onClick }) => (
  <div
    onClick={onClick}
    className=" w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-700 flex items-center justify-center ml-2 shadow-md hover:shadow-xl border hover:border-gray-400 transition-all duration-200 ease-in-out flex-shrink-0"
  >
    +
  </div>
);

const SELECTColumnBlob = ({ onChangeHandler, onDeleteHandler, columns }) => (
  <div className="px-2 py-1 ml-3 rounded-lg border bg-white border-[#468AF9] flex items-center text-sm text-[#468AF9] flex-shrink-0">
    <select
      onChange={onChangeHandler}
      className="text-sm bg-transparent border-0 outline-none"
    >
      {columns.map((item, index) => (
        <option key={index}>{item}</option>
      ))}
    </select>
    {/* Delete Button */}
    <button
      onClick={onDeleteHandler}
      className="ml-2 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition ease-in-out duration-200"
    >
      <FontAwesomeIcon icon={faTrashAlt} className="text-white text-[8px]" />
    </button>
  </div>
);

const FROMColumnBlob = ({ onChangeHandler }) => (
  <div className="px-2 py-1 ml-3 rounded-lg border bg-white border-[#468AF9] flex items-center text-sm text-[#468AF9] flex-shrink-0">
    <select
      onChange={onChangeHandler}
      className="text-sm bg-transparent border-0 outline-none"
    >
      <option>productData</option>
      <option>employeeData</option>
    </select>
  </div>
);

const WHEREColumnBlob = ({ onChangeHandler }) => (
  <div className="shadow-lg shadow-slate-200 ml-3 bg-white rounded-lg border border-[#468AF9] flex items-center text-xs text-[#468AF9] flex-shrink-0">
    <div className="px-4 py-1 border-r">
      <select
        onChange={onChangeHandler}
        className="text-sm bg-transparent border-0 outline-none"
      >
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
    </div>
    <div className="px-4 py-1 border-r">
      <select className="text-sm bg-transparent border-0 outline-none">
        {/* Table Selection */}
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
    </div>
    <div className="px-4 py-1">
      <select className="text-sm bg-transparent border-0 outline-none">
        {/* Property 1 */}
        <option>Option 1</option>

        {/* = | <= | >= . . . . */}
        <option>Option 2</option>

        {/* Property 2 */}
        <option>Option 3</option>
      </select>
    </div>
  </div>
);
