import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 400px;
  margin: 2em auto;
  padding: 2em;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
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

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
      });
      alert("User registered successfully");
      navigate("/login");
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
