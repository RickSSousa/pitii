import React, { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";

function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { addProduct } = useContext(ProductsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      addProduct({ name, price });
      setName("");
      setPrice("");
      console.log("Product added successfully: ", name, price);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
