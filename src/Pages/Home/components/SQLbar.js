import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

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
      <div className="py-2 px-8 w-full border rounded-xl italic text-slate-400 flex items-center">
        <input
          type="text"
          className="flex-grow outline-none px-2"
          placeholder="Query"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className=" h-8 w-8 ml-2 bg-white rounded-full hover:bg-gray-100 text-sm"
          title="View History" // This will show a tooltip on hover
        >
          <FontAwesomeIcon icon={faHistory} />
        </button>
      </div>

      {/* Button */}
      <button
        onClick={() => {
          handleQuery();
        }}
        className="bg-[#468AF9] text-white font-extralight mr-7 rounded-md py-2 px-4 m-2 inline-block whitespace-nowrap hover:shadow-lg hover:bg-gradient-to-r hover:from-[#468AF9] hover:to-[#357abD]"
        style={{ height: "100%" }} // Set height to match input field
      >
        Run Query
      </button>
    </div>
  );
};
