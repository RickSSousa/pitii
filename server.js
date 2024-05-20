const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Pool } = require("pg");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 5000;

// Configurações do banco de dados
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pitii",
  password: "123",
  port: 5432,
});

// JWT Secret
const JWT_SECRET =
  "JwtjPn2oHPe2EYImTkx8BYFAtBmiIdIDaiMEdIuLGSoUpCVLkq+JuMJqOBhqvnElXLHo5MAHlRQVs+V++lw1YTvhBZIHtCleUwWwO3WA+T6nmmhjeZvfNfLWsn1jhvK7eQS57GAG9OkpUdJbCHEqJuhNa5kNOZpjGQbHHdtLN76eVBvriHpk8AL5CT+zrKGI50fe9EwdsqrTiK1/rkJsaKH5WKSS8/05di88wdBGvYGHxivB7Vbp0c0fcsYZ+cfpBOEbC8quw/JPA3YBTJ4WGmNozAetDbQJXyxMYhYeQQIm7vPjgt2jbvZbnOwMCGrVr23lXYZn4ZCjtc7jglvx0A==";

// Verifica se o diretório 'uploads' existe, caso contrário, cria-o
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
});

// CRUD endpoints for users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add user" });
  }
});

app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// CRUD endpoints for products
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post("/api/products", upload.single("image"), async (req, res) => {
  const { name, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const result = await pool.query(
      "INSERT INTO products (name, price, image_url) VALUES ($1, $2, $3) RETURNING *",
      [name, price, imageUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

app.put("/api/products/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const imageUrl = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.imageUrl;
  try {
    const result = await pool.query(
      "UPDATE products SET name = $1, price = $2, image_url = $3 WHERE id = $4 RETURNING *",
      [name, price, imageUrl, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
