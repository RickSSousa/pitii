const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

let users = [];
let products = [];

// CRUD endpoints for users
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  users = users.map((user) =>
    user.id === parseInt(id) ? { id: parseInt(id), ...updatedUser } : user
  );
  res.json({ id: parseInt(id), ...updatedUser });
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== parseInt(id));
  res.status(204).end();
});

// CRUD endpoints for products
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const product = { id: products.length + 1, ...req.body };
  products.push(product);
  res.status(201).json(product);
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  products = products.map((product) =>
    product.id === parseInt(id)
      ? { id: parseInt(id), ...updatedProduct }
      : product
  );
  res.json({ id: parseInt(id), ...updatedProduct });
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  products = products.filter((product) => product.id !== parseInt(id));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
