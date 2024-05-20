import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UsersContext } from "../contexts/UsersContext";

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
  const { users, addUser, updateUser, deleteUser } = useContext(UsersContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateUser(currentUser.id, { name, email });
      setEditing(false);
      setCurrentUser(null);
    } else {
      addUser({ name, email });
    }
    setName("");
    setEmail("");
  };

  const handleEdit = (user) => {
    setEditing(true);
    setCurrentUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  const handleDelete = (id) => {
    deleteUser(id);
  };

  return (
    <Container>
      <h2>Manage Users</h2>
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit">{editing ? "Update User" : "Add User"}</Button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <Button onClick={() => handleEdit(user)}>Edit</Button>
            <Button onClick={() => handleDelete(user.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Users;
