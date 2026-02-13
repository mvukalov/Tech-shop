import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import techDB from "../fireConfig";
import { techProducts } from "../techshop-products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const [products, setProducts] = useState([]);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const products = await getDocs(collection(techDB, "products"));
      const productsArray = [];

      products.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        productsArray.push(obj);
      });

      setProducts(productsArray);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-md-4" key={product.id}>
                <div className="m-2 p-1 product position-relative">
                  <div className="product-content">
                    <div className="text-center">
                      <div className="product-title">
                        <p>{product.name}</p>
                      </div>
                      <img src={product.imageURL} alt={product.name} className="product-img" />
                    </div>
                  </div>

                  <div className="product-actions">
                    <h2>{product.price}€</h2>
                    <div className="d-flex">
                      <button className="mx-2" onClick={() => addToCart(product)}>
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
