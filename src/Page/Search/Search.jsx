import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Search = () => {
  const [formNo, setFormNo] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const axiosInstance = useAxiosSecure();

  const handleSearch = async () => {
    // Handle the search logic here
    try {
      const response = await axiosInstance.post("/api/search-purchase-data", {
        form_no: formNo,
        phone_no: phoneNo,
      });
      setResults(response.data); // Assuming response.data contains the search results
      setError("");
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Error fetching data. Please try again.");
      setResults([]);
    }

    // console.log("Searching for:", searchTerm);
  };

  return (
    <div className="min-h-screen flex flex-col text-text_40px font-bold items-center justify-center">
      <h1 className="w-[600px] mx-auto">Search here</h1>
      <div className="h-[52px] flex relative col-span-4 w-[600px] mx-auto">
        <input
          type="text"
          value={formNo}
          onChange={(e) => setFormNo(e.target.value)}
          placeholder="Form No"
          className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
        />
        <input
          type="text"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          placeholder="Phone No"
          className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
        />
        <button
          onClick={handleSearch}
          className="text-2xl text-black absolute right-2 top-2"
        >
          <IoMdSearch />
        </button>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}

      {results.length > 0 && (
        <div className="mt-5">
          <h2 className="text-lg font-semibold">Search Results:</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index} className="border-b py-2">
                {JSON.stringify(result)}{" "}
                {/* Replace with your desired result format */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
