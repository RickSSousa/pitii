import React, { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";

const Products = () => {
  const { products, addProduct, updateProduct, deleteProduct } =
    useContext(ProductsContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateProduct(currentProduct.id, { name, price });
      setEditing(false);
      setCurrentProduct(null);
    } else {
      addProduct({ name, price });
    }
    setName("");
    setPrice("");
  };

  const handleEdit = (product) => {
    setEditing(true);
    setCurrentProduct(product);
    setName(product.name);
    setPrice(product.price);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  return (
    <div>
      <h2>Manage Products</h2>
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
        <button type="submit">
          {editing ? "Update Product" : "Add Product"}
        </button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} (${product.price})
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
