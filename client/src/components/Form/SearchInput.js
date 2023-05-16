import React from "react";
import { useSearch } from "../../context/searchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [value, setValue] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/search/${value.keyword}`
      );
      setValue({ ...value, results: data });
      navigate("/search");
    } catch (error) {}
  };
  return (
    <div>
      <form
        className="d-flex"
        role="search"
        style={{ minWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={value.keyword}
          onChange={(e) => setValue({ ...value, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
