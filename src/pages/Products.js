import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ProductsContext } from "../contexts/ProductsContext";
import { UsersContext } from "../contexts/UsersContext";

const Container = styled.div`
  margin: 2em auto;
  padding: 1em;
  width: 80%;
  max-width: 1000px;

  .product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    list-style: none;
    padding: 0;
    justify-content: center;

    .product-item {
      flex: 1 1 calc(25% - 1em);
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 1em 0;
      padding: 1em;
      background-color: #f8f8f8;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      img {
        border-radius: 10%;
        width: 100%;
        height: 150px;
        object-fit: cover;
      }

      .product-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-top: 0.5em;

        strong {
          margin-bottom: 0.5em;
        }
      }

      .options {
        display: flex;
        gap: 1em;
        margin-top: 0.5em;
      }
    }
  }
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
  const { isAuthenticated } = useContext(UsersContext);
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
      {isAuthenticated && (
        <>
          <h2>Gerenciar Produtos</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Preço:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label>Imagem:</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <Button type="submit">
              {editing ? "Atualizar Produto" : "Adicionar Produto"}
            </Button>
          </form>
        </>
      )}
      <h2>Cardápio</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img
              src={`http://localhost:5000${product.image_url}`}
              alt={product.name}
            />
            <div className="product-info">
              <strong>{product.name}</strong>
              <span>R${product.price}</span>
            </div>
            {isAuthenticated && (
              <div className="options">
                <Button onClick={() => handleEdit(product)}>Editar</Button>
                <Button onClick={() => handleDelete(product.id)}>
                  Deletar
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Products;
