import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import moment from "moment"; // If you don't already have this, you can install it with npm install moment
import {
  faCaretUp,
  faCaretDown,
  faUserTie,
  faCalendarAlt,
  faClock,
  faPhoneAlt,
  faUserShield,
  faShoppingCart,
  faBox,
  faWineBottle,
  faJar,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

// SearchBar.js
export const SearchBar = ({ searchTerm, setSearchTerm, handleQuery }) => {
  return (
    <div className="mb-1 mt-5 ml-4 w-full flex items-center">
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

// Table Header .js
export const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr className="bg-white text-xs font-semibold tracking-wide text-left text-slate-500">
        {columns.map((column, i) => (
          <th className="sticky top-0 px-4 py-3 z-10 bg-white" key={i}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

// TableRow.js
export const TableRow = ({ columns, data }) => {
  const renderCell = (columnName, value) => {
    switch (columnName) {
      case "title":
        let titleIcon;
        if (value === "Vice President Sales") {
          titleIcon = faUserShield;
        } else if (value === "Sales Manager") {
          titleIcon = faShoppingCart;
        } else if (value === "Sales Representative") {
          titleIcon = faUserTie;
        }
        return (
          <div className="flex items-center">
            <div className="w-6 h-6 text-xs m-1 bg-blue-100 rounded-full shadow flex items-center justify-center">
              <FontAwesomeIcon icon={titleIcon} />
            </div>
            {value}
          </div>
        );

      case "titleOfCourtesy":
        return (
          <span>
            <div className="w-6 h-6 text-xs m-1 bg-green-100 rounded-full shadow flex items-center justify-center">
              <FontAwesomeIcon icon={faUserTie} />
            </div>
            {value || "N/A"}
          </span>
        );

      case "birthDate":
        const formattedDate = moment(value).format("MMM Do, YYYY");
        return (
          <span>
            <div className="w-6 h-6 text-xs m-1 bg-yellow-100 rounded-full shadow flex items-center justify-center">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            {formattedDate}
          </span>
        );

      case "hireDate":
        const timeSince = moment(value).fromNow(true);
        return (
          <span>
            <div className="w-6 h-6 text-xs m-1 bg-red-100 rounded-full shadow flex items-center justify-center">
              <FontAwesomeIcon icon={faClock} />
            </div>
            Hired {timeSince} ago
          </span>
        );

      case "country":
        let countryFlag = "";
        if (value === "US") {
          countryFlag = "<your_US_image_link_here>";
        } else if (value === "UK") {
          countryFlag = "<your_UK_image_link_here>";
        }
        return (
          <span>
            <img src={countryFlag} alt={value} className="w-6 inline-block" />
            {value}
          </span>
        );

      case "homePhone":
        return (
          <span>
            <div className="w-6 h-6 text-xs m-1 bg-purple-100 rounded-full shadow flex items-center justify-center">
              <FontAwesomeIcon icon={faPhoneAlt} />
            </div>
            {value}
          </span>
        );

      case "quantityPerUnit":
        let icon;
        if (value.includes("boxes")) {
          icon = faBox;
        } else if (value.includes("bottles")) {
          icon = faWineBottle;
        } else if (value.includes("jars")) {
          icon = faJar;
        } else {
          icon = faBox;
        }
        return (
          <div className="flex items-center">
            <div className="w-6 h-6 text-xs m-1 bg-gray-100 rounded-full shadow flex items-center justify-center">
              <FontAwesomeIcon icon={icon} />
            </div>
            {value}
          </div>
        );

      case "unitsInStock":
        let bgColor;
        let intValue = parseInt(value, 10); // Converting string to integer
        if (intValue < 10) {
          bgColor = "bg-red-600";
        } else if (intValue >= 15 && intValue <= 20) {
          bgColor = "bg-yellow-400";
        } else {
          bgColor = "bg-green-500";
        }
        return (
          <div
            className={`${bgColor} text-white rounded px-2 py-1 inline-block`}
          >
            {value}
          </div>
        );

      case "discontinued":
        const discontinuedIcon = value === "0" ? faThumbsUp : faThumbsDown;
        return (
          <div className="flex items-center">
            <div className="w-6 h-6 text-xs m-1 bg-purple-100 rounded-full shadow flex items-center justify-center">
              <FontAwesomeIcon icon={discontinuedIcon} />
            </div>
          </div>
        );

      case "reorderLevel":
        // Generate a random boolean to decide between green and red
        const isGreen = Math.random() >= 0.5;
        return (
          <div className="rounded px-2 py-1 inline-block">
            <span className={`${isGreen ? "text-green-500" : "text-red-500"}`}>
              {value}
              <FontAwesomeIcon
                icon={isGreen ? faCaretUp : faCaretDown}
                className={`${isGreen ? "text-green-500" : "text-red-500"}`}
              />
            </span>
          </div>
        );
      default:
        if (value === null || value === "NULL") {
          return (
            <div className="bg-red-500 text-white rounded px-2 py-1 inline-block">
              NULL
            </div>
          );
        }
        return value;
    }
  };
  return (
    <tr className="text-gray-700">
      {columns.map((column, j) => (
        <td className="px-4 py-3 text-sm truncate h-[50px]" key={j}>
          {renderCell(column, data[column])}
        </td>
      ))}
    </tr>
  );
};

// Table.js
export const Table = ({ columns, data }) => {
  const filteredColumns = columns.filter((col) =>
    data.some((row) => row[col] !== null && row[col] !== undefined)
  );

  return (
    <div className="relative overflow-x-auto h-[500px] w-full scrollbar-thin">
      <table className="w-full whitespace-no-wrap">
        <TableHeader columns={filteredColumns} />
        <tbody className="bg-white divide-y overflow-y-auto h-[450px] relative">
          {data.map((row, i) => (
            <TableRow key={i} data={row} columns={filteredColumns} />
          ))}
        </tbody>
      </table>
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
