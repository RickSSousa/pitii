import React from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

function Products() {
  return (
    <div>
      <h2>Manage Products</h2>
      <ProductForm />
      <ProductList />
    </div>
  );
}

export default Products;
