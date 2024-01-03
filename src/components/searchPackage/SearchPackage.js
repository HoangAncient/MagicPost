import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/searchPackage.min.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const SearchPackage = (props) => {
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate(); // A hook to navigate programmatically

  const handleSearch = async (e) => {
    if (searchId.trim()) {
      navigate("/packageDetail/" + searchId);
    }
    if (searchId.trim() === "") {
      navigate("/packageDetail/0");
    }
  };

  return (
    <div className="searchContainer">
      <form onSubmit={handleSearch} className="packageSearch">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter package ID"
        />
        {props.data === "Customer" && (
          <button className="searchBtn" type="submit">
            <SearchOutlinedIcon />
          </button>
        )}
        {props.data === "Search" && (
          <button className="searchBtnView" type="submit">
              <SearchOutlinedIcon/> <span style={{paddingRight: "12px"}}>Find</span>
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchPackage;
