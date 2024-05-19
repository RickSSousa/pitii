import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        product
      );
      setProducts([...products, response.data]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        updatedProduct
      );
      setProducts(
        products.map((product) => (product.id === id ? response.data : product))
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
