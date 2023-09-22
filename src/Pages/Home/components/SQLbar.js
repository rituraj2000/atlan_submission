import productData from "../../../utils/datasets/products.csv";
import employeeData from "../../../utils/datasets/employees.csv";

// SearchBar.js
export const SQLBar = ({
  searchTerm,
  setSearchTerm,
  setTable,
  handleQuery,
}) => {
  return (
    <div className="mb-1 ml-4 w-full flex items-center">
      {/* Input field */}
      <input
        type="text"
        className="py-2 px-8 w-full border rounded-xl italic text-slate-400"
        placeholder="Query"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Button */}
      <button
        onClick={() => {
          const tableNameMatch = searchTerm.match(/FROM (\w+)/);
          // if (tableNameMatch[1] === "productData") {
          //   setTable(productData);
          // } else {
          //   setTable(employeeData);
          // }

          handleQuery();
        }}
        className="bg-[#468AF9] text-white font-extralight mr-7 py-2 px-4 m-2 inline-block whitespace-nowrap hover:shadow-lg hover:bg-gradient-to-r hover:from-[#468AF9] hover:to-[#357abD]"
        style={{ height: "100%" }} // Set height to match input field
      >
        Run Query
      </button>
    </div>
  );
};
