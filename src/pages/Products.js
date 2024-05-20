import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ProductsContext } from "../contexts/ProductsContext";

const Container = styled.div`
  margin: 2em auto;
  padding: 1em;
  width: 80%;
  max-width: 600px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  margin: 0.5em;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

const Products = () => {
  const { products, addProduct, updateProduct, deleteProduct } =
    useContext(ProductsContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { name, price, image };
    if (editing) {
      updateProduct(currentProduct.id, {
        ...product,
        imageUrl: currentProduct.imageUrl,
      });
      setEditing(false);
      setCurrentProduct(null);
    } else {
      addProduct(product);
    }
    setName("");
    setPrice("");
    setImage(null);
  };

  const handleEdit = (product) => {
    setEditing(true);
    setCurrentProduct(product);
    setName(product.name);
    setPrice(product.price);
    setImage(product.imageUrl);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  return (
    <Container>
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
        <div>
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <Button type="submit">
          {editing ? "Update Product" : "Add Product"}
        </Button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>
              <strong>{product.name}</strong> (${product.price})
              {product.imageUrl && (
                <img
                  src={`http://localhost:5000${product.imageUrl}`}
                  alt={product.name}
                  width="100"
                />
              )}
            </div>
            <Button onClick={() => handleEdit(product)}>Edit</Button>
            <Button onClick={() => handleDelete(product.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Products;
