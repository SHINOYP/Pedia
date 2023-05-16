import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/searchContext";
import { useAuth } from "../context/AuthContext";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>
            {values?.results.length < 1
              ? ` No of Products found`
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">${p.price}</p>
                  <button className="btn btn-primary ms-1">more Details</button>
                  <button className="btn btn-primary ms-1">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
