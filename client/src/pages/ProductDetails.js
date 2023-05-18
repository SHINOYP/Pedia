import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "../config/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) {
      getProducts();
    }
  }, [params?.slug]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product.slug, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get related pr
  const getSimilarProduct = async (slug, cid) => {
    try {
      const { data } = await axios.get(
        `/product/related-product/${slug}/${cid}`
      );
      setRelated(data?.products);
      console.log(data);
      console.log(data);
    } catch (error) {}
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="cold-md-6 ">
          {" "}
          <img
            src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>{" "}
        <div className="cold-md-5 text-center">
          <h1>Product Details</h1>
          <h4>{product.name}</h4>
        </div>
      </div>
      <div className="row">
        <div className="row container">
          <h6>Similar Products</h6>
          {related.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="d-flex flex-wrap">
            {related?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p?._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
