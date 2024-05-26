import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UsersContext } from "../contexts/UsersContext";
import { Link, useNavigate } from "react-router-dom";

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

const Users = () => {
  const { users, updateUser, deleteUser } = useContext(UsersContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(currentUser.id, { name, email });
    setCurrentUser(null);

    setName("");
    setEmail("");
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  const handleDelete = (id) => {
    deleteUser(id);
  };

  return (
    <Container>
      <h2>Gerenciador de usuários</h2>
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
        <Button type="submit">Editar Usuário</Button>
      </form>
      <Button onClick={() => navigate("/register")}>Adicionar Usuário</Button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <Button onClick={() => handleEdit(user)}>Editar</Button>
            <Button onClick={() => handleDelete(user.id)}>Deletar</Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Users;
