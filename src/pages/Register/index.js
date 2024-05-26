import React, { useContext, useState } from "react";
import axios from "axios";
import { UsersContext } from "../../contexts/UsersContext";
import { Button, Container } from "./styles";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUsers } = useContext(UsersContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/api/register", {
          name,
          email,
          password,
        })
        .then((id) => {
          alert("User registered successfully");
          setUsers((users) => [...users, { id, name, email, password }]);
        });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <Container>
      <h2>Registrar</h2>
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Registrar</Button>
      </form>
    </Container>
  );
};

export default Register;
