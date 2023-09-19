import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// SearchBar.js
export const SearchBar = ({ searchTerm, setSearchTerm, handleQuery }) => {
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
        onClick={handleQuery}
        className="bg-[#468AF9] text-white font-extralight mr-7 py-2 px-4 m-2 inline-block whitespace-nowrap hover:shadow-lg hover:bg-gradient-to-r hover:from-[#468AF9] hover:to-[#357abD]"
        style={{ height: "100%" }} // Set height to match input field
      >
        Run Query
      </button>
    </div>
  );
};

// Pagination component
export const Pagination = ({
  totalRows,
  rowsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div className="flex items-center justify-end space-x-4 mt-1 mb-8">
      <button
        className="text-white bg-blue-500 hover:bg-blue-700 border-0 py-1 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-300"
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        className="text-white bg-blue-500 hover:bg-blue-700 border-0 py-1 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-300"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="px-4 py-1 bg-blue-200 text-blue-600 rounded-full">
        {`${currentPage} of ${totalPages}`}
      </div>
      <button
        className="text-white bg-blue-500 hover:bg-blue-700 border-0 py-1 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-300"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <button
        className="text-white bg-blue-500 hover:bg-blue-700 border-0 py-1 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-300"
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};
