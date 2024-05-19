import React, { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";

function ProductList() {
  const { products } = useContext(ProductsContext);

  return (
    <div>
      <h3>Product List</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} (${product.price})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
